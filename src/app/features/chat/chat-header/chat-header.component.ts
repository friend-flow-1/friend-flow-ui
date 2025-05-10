import { Component, inject } from '@angular/core';
import { ChatHeaderService } from './data-access/chat-header.service';
import { ChatInboxComponent } from '../chat-inbox/chat-inbox.component';

@Component({
  selector: 'app-chat-header',
  providers: [ChatHeaderService, ChatInboxComponent],
  imports: [ChatInboxComponent],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss',
})
export class ChatHeaderComponent {
  chatHeaderService = inject(ChatHeaderService);
}
