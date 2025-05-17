import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChatServer } from '@shared/data-access/chat/chat-server.service';
import { HlmTooltipTriggerDirective } from '@shared/ui/ui-tooltip-helm/src';

@Component({
  selector: 'app-server-item',
  imports: [CommonModule, RouterLink, HlmTooltipTriggerDirective],
  templateUrl: './server-item.component.html',
  styleUrl: './server-item.component.scss',
})
export class ServerItemComponent {
  server = input.required<ChatServer>();
  isActive = input.required<boolean>();
  href = input.required<string>();
}
