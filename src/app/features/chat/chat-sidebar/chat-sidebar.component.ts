import { Component, computed, inject } from '@angular/core';
import { ChatServerService } from '@shared/data-access/chat/chat-server.service';
import { ChatSidebarService } from './data-access/chat-sidebar.service';
import { ServerItemComponent } from './ui/server-item/server-item.component';

@Component({
  selector: 'app-chat-sidebar',
  providers: [ChatSidebarService],
  imports: [ServerItemComponent],
  templateUrl: './chat-sidebar.component.html',
  styleUrl: './chat-sidebar.component.scss',
})
export class ChatSidebarComponent {
  chatServerService = inject(ChatServerService);
  chatSidebarService = inject(ChatSidebarService);
}
