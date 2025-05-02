import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthService } from '@shared/data-access/auth.service';
import { Credentials } from '@shared/interfaces';
import { connect } from 'ngxtension/connect';
import { catchError, EMPTY, map, merge, Subject, switchMap } from 'rxjs';

export type LoginStatus = 'pending' | 'authenticating' | 'success' | 'error';

interface LoginState {
  status: LoginStatus;
}

@Injectable()
export class LoginService {
  private authService = inject(AuthService);

  // state
  private state = signal<LoginState>({
    status: 'pending',
  });

  // selectors
  status = computed(() => this.state().status);

  // sources
  error$ = new Subject<any>();
  login$ = new Subject<Credentials>();

  userAuthenticated$ = this.login$.pipe(
    switchMap((credentials) =>
      this.authService.login(credentials).pipe(
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
      this.userAuthenticated$.pipe(map(() => ({ status: 'success' as const }))),
      this.login$.pipe(map(() => ({ status: 'authenticating' as const }))),
      this.error$.pipe(map(() => ({ status: 'error' as const })))
    );

    connect(this.state).with(nextState$);
  }
}
