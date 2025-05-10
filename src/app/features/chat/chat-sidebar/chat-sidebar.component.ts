import { Component, computed, inject } from '@angular/core';
import {
  ChatChannel,
  ChatChannelService,
} from '@shared/data-access/chat/chat-channel.service';
import { ChatSidebarService } from './data-access/chat-sidebar.service';
import { ChannelItemComponent } from './ui/channel-item/channel-item.component';

@Component({
  selector: 'app-chat-sidebar',
  providers: [ChatSidebarService],
  imports: [ChannelItemComponent],
  templateUrl: './chat-sidebar.component.html',
  styleUrl: './chat-sidebar.component.scss',
})
export class ChatSidebarComponent {
  chatChannelService = inject(ChatChannelService);
  chatSidebarService = inject(ChatSidebarService);

  isCurrentChannel(channel: ChatChannel): boolean {
    return this.chatSidebarService.currentChannelId() === channel.id;
  }
}
