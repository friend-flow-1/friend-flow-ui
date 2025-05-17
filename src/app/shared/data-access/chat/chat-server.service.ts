import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '@env/environment';
import {
  catchError,
  concatMap,
  EMPTY,
  merge,
  mergeMap,
  Observable,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';

export interface ChatServer {
  id?: string;
  name: string;
  avatarUrl: string;
  type?: 'dm' | 'server';
  hasActivity?: boolean;
}

export interface ChatServerState {
  servers: ChatServer[];
  loaded: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ChatServerService {
  private http = inject(HttpClient);

  // state
  private state = signal<ChatServerState>({
    servers: [],
    loaded: false,
    error: null,
  });

  // selectors
  readonly servers = computed(() => this.state().servers);
  readonly loaded = computed(() => this.state().loaded);
  readonly error = computed(() => this.state().error);

  // resources
  readonly add$ = new Subject<ChatServer>();
  readonly edit$ = new Subject<{ id: string; data: Partial<ChatServer> }>();
  readonly remove$ = new Subject<string>();

  readonly serverAdded$ = this.add$.pipe(
    concatMap((server) =>
      this.http
        .post<ChatServer>(`${environment.apiUrl}/servers`, server)
        .pipe(catchError((err) => this.handleError(err)))
    )
  );

  readonly serverEdited$ = this.edit$.pipe(
    mergeMap(({ id, data }) =>
      this.http
        .patch<ChatServer>(`${environment.apiUrl}/servers/${id}`, data)
        .pipe(catchError((err) => this.handleError(err)))
    )
  );

  readonly serverRemoved$ = this.remove$.pipe(
    mergeMap((id) =>
      this.http
        .delete<void>(`${environment.apiUrl}/servers/${id}`)
        .pipe(catchError((err) => this.handleError(err)))
    )
  );

  constructor() {
    // Simulate API response with mock data
    merge(this.serverAdded$, this.serverEdited$, this.serverRemoved$)
      .pipe(
        startWith(null),
        switchMap(() => {
          // Here we simulate getting servers from an API but using mock data
          return new Observable<ChatServer[]>((observer) => {
            observer.next(mockservers); // Return mock data
            observer.complete();
          });
        }),
        takeUntilDestroyed()
      )
      .subscribe((servers) =>
        this.state.update((state) => ({
          ...state,
          servers,
          loaded: true,
        }))
      );
  }

  private handleError(err: any) {
    this.state.update((state) => ({ ...state, error: err }));
    return EMPTY;
  }
}

const mockservers: ChatServer[] = Array.from({ length: 11 }, (_, i) => ({
  id: (i + 1).toString(),
  name: ['General', 'Random'][i] || 'Hello World',
  avatarUrl: `https://picsum.photos/150/150?random=${i}`,
  type: 'server',
  hasActivity: Math.random() < 0.5,
}));
