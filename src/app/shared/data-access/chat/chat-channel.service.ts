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

export interface ChatChannel {
  id?: string;
  name: string;
  avatarUrl: string;
  type?: 'dm' | 'channel';
  hasActivity?: boolean;
}

export interface ChatChannelState {
  channels: ChatChannel[];
  loaded: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ChatChannelService {
  private http = inject(HttpClient);

  // state
  private state = signal<ChatChannelState>({
    channels: [],
    loaded: false,
    error: null,
  });

  // selectors
  readonly channels = computed(() => this.state().channels);
  readonly loaded = computed(() => this.state().loaded);
  readonly error = computed(() => this.state().error);

  // resources
  readonly add$ = new Subject<ChatChannel>();
  readonly edit$ = new Subject<{ id: string; data: Partial<ChatChannel> }>();
  readonly remove$ = new Subject<string>();

  readonly channelAdded$ = this.add$.pipe(
    concatMap((channel) =>
      this.http
        .post<ChatChannel>(`${environment.apiUrl}/channels`, channel)
        .pipe(catchError((err) => this.handleError(err)))
    )
  );

  readonly channelEdited$ = this.edit$.pipe(
    mergeMap(({ id, data }) =>
      this.http
        .patch<ChatChannel>(`${environment.apiUrl}/channels/${id}`, data)
        .pipe(catchError((err) => this.handleError(err)))
    )
  );

  readonly channelRemoved$ = this.remove$.pipe(
    mergeMap((id) =>
      this.http
        .delete<void>(`${environment.apiUrl}/channels/${id}`)
        .pipe(catchError((err) => this.handleError(err)))
    )
  );

  constructor() {
    // Simulate API response with mock data
    merge(this.channelAdded$, this.channelEdited$, this.channelRemoved$)
      .pipe(
        startWith(null),
        switchMap(() => {
          // Here we simulate getting channels from an API but using mock data
          return new Observable<ChatChannel[]>((observer) => {
            observer.next(mockChannels); // Return mock data
            observer.complete();
          });
        }),
        takeUntilDestroyed()
      )
      .subscribe((channels) =>
        this.state.update((state) => ({
          ...state,
          channels,
          loaded: true,
        }))
      );
  }

  private handleError(err: any) {
    this.state.update((state) => ({ ...state, error: err }));
    return EMPTY;
  }
}

const mockChannels: ChatChannel[] = Array.from({ length: 11 }, (_, i) => ({
  id: (i + 1).toString(),
  name: ['General', 'Random'][i] || 'Hello World',
  avatarUrl: `https://picsum.photos/150/150?random=${i}`,
  type: 'channel',
  hasActivity: Math.random() < 0.5,
}));
