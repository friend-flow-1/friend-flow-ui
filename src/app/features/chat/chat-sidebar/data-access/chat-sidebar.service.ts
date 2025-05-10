import { computed, inject, Injectable, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class ChatSidebarService {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Using signal to hold the current channel ID state
  private _currentChannelId = signal<string>('');

  currentChannelId = computed(() => this._currentChannelId());

  constructor() {
    // Reactively update the current channel based on route changes
    this.router.events.subscribe(() => {
      const currentRoute = this.route.snapshot.url.join('/');
      if (currentRoute === 'chat/dm') {
        // Set to '@me' for Direct Message page
        this._currentChannelId.set('@me');
      } else if (currentRoute.startsWith('chat/channels/')) {
        // Extract and set the channel ID from the URL
        const channelId = currentRoute.split('/')[2];
        this._currentChannelId.set(channelId);
      }
    });
  }
}
