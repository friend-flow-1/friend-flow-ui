import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { ChatChannel } from '@shared/data-access/chat/chat-channel.service';

@Component({
  selector: 'app-channel-item',
  imports: [CommonModule],
  templateUrl: './channel-item.component.html',
  styleUrl: './channel-item.component.scss',
})
export class ChannelItemComponent {
  channel = input.required<ChatChannel>();
  currentChannelId = input.required<string>();

  isCurrentChannel = computed(
    () => this.currentChannelId() === this.channel().id
  );
}
