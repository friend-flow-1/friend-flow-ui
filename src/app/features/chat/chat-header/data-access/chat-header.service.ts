import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

interface ChatHeaderState {
  title: string;
  avatarUrl: string | null;
}

// mock data
const users: Record<string, string> = {
  '1220938078886170646': 'AhriMain',
  '897230984750934875': 'ZedPlayer99',
};

const channels: Record<string, string> = {
  abc123: 'general',
  xyz789: 'memes',
};

@Injectable()
export class ChatHeaderService {
  private router = inject(Router);

  // state
  private state = signal<ChatHeaderState>({
    title: 'Loading...',
    avatarUrl: '',
  });

  // selectors
  readonly title = computed(() => this.state().title);
  readonly avatarUrl = computed(() => this.state().avatarUrl);

  constructor() {
    effect(() => {
      const urlTree = this.router.parseUrl(this.router.url);
      const segments =
        urlTree.root.children['primary']?.segments.map((s) => s.path) || [];

      if (segments.join('/') === 'chat/channels/@me') {
        this.setState({
          title: 'Friends',
          avatarUrl: '/assets/icons/logo-ff-icon.png',
        });
        return;
      }

      if (segments.length === 4 && segments[2] === '@me') {
        const userId = segments[3];
        const username = users[userId];
        this.setState({
          title: username ? `DM with ${username}` : 'Direct Message',
        });
        return;
      }

      if (segments.length === 4 && segments[2] !== '@me') {
        const channelId = segments[3];
        const channelName = channels[channelId];
        this.setState({ title: channelName ? `#${channelName}` : 'Channel' });
        return;
      }

      this.setState({ title: '' });
    });
  }

  // reducer
  private setState(newState: Partial<ChatHeaderState>) {
    this.state.update((current) => ({ ...current, ...newState }));
  }
}
