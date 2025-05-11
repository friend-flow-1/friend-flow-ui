import { computed, inject, Injectable, signal } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable()
export class ChatSidebarService {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private _currentChannelId = signal<string>('');
  readonly currentChannelId = computed(() => this._currentChannelId());

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.updateChannelFromUrl());

    // 👇 manually run on initial load
    this.updateChannelFromUrl();
  }

  private updateChannelFromUrl() {
    const activeUrl = this.router.url;
    console.log({ activeUrl });

    if (activeUrl === '/chat/channels/@me') {
      this._currentChannelId.set('@me');
    } else if (activeUrl.startsWith('/chat/channels/')) {
      const parts = activeUrl.split('/');
      this._currentChannelId.set(parts[3] ?? '');
    } else {
      this._currentChannelId.set('');
    }
  }
}
