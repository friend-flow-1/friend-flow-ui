import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '@env/environment';
import { User } from '@shared/interfaces';
import { MeInfoResponseDTO } from '@shared/interfaces/me';
import {
  catchError,
  EMPTY,
  merge,
  startWith,
  Subject,
  switchMap,
  map,
} from 'rxjs';

interface MeState {
  info: User | null | undefined;
  loaded: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class MeService {
  private http = inject(HttpClient);

  // state
  private state = signal<MeState>({
    info: null,
    loaded: false,
    error: null,
  });

  // selectors
  info = computed(() => this.state().info);
  loaded = computed(() => this.state().loaded);

  // resources
  edit$ = new Subject<any>();

  constructor() {
    merge(this.edit$)
      .pipe(
        switchMap(() =>
          this.http
            .get<MeInfoResponseDTO>(`${environment.apiUrl}/me/info`)
            .pipe(catchError((err) => this.handleError(err)))
        ),
        takeUntilDestroyed()
      )
      .subscribe({
        next: (res: MeInfoResponseDTO) =>
          this.state.update((state) => ({
            ...state,
            info: res.data,
            loaded: true,
          })),
        error: () =>
          this.state.update((state) => ({
            ...state,
            info: null,
            loaded: true,
          })),
      });
  }

  private handleError(err: any) {
    this.state.update((state) => ({ ...state, error: err }));
    return EMPTY;
  }
}
