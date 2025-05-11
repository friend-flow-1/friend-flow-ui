import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChatChannel } from '@shared/data-access/chat/chat-channel.service';

@Component({
  selector: 'app-channel-item',
  imports: [CommonModule, RouterLink],
  templateUrl: './channel-item.component.html',
  styleUrl: './channel-item.component.scss',
})
export class ChannelItemComponent {
  channel = input.required<ChatChannel>();
  isActive = input.required<boolean>();
  href = input.required<string>();
}
