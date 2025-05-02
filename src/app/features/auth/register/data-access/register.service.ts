import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthService } from '@shared/data-access/auth.service';
import { Credentials, RegisterCredentials } from '@shared/interfaces';
import { connect } from 'ngxtension/connect';
import { catchError, EMPTY, map, merge, Subject, switchMap, tap } from 'rxjs';

export type RegisterStatus = 'pending' | 'creating' | 'success' | 'error';

interface RegisterState {
  status: RegisterStatus;
}

@Injectable()
export class RegisterService {
  private authService = inject(AuthService);

  // state
  private state = signal<RegisterState>({
    status: 'pending',
  });

  // selectors
  status = computed(() => this.state().status);

  // sources
  error$ = new Subject<any>();
  createUser$ = new Subject<RegisterCredentials>();
  success$ = new Subject<void>();

  userCreated$ = this.createUser$.pipe(
    switchMap((credentails) =>
      this.authService.register(credentails).pipe(
        catchError((err) => {
          this.error$.next(err);
          return EMPTY;
        })
      )
    )
  );

  constructor() {
    // reducers
    const nextState$ = merge(
      this.userCreated$.pipe(map(() => ({ status: 'success' as const }))),
      this.createUser$.pipe(map(() => ({ status: 'creating' as const }))),
      this.error$.pipe(map(() => ({ status: 'error' as const })))
    );

    connect(this.state).with(nextState$);
  }
}
