import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatHeaderComponent } from '@features/chat/chat-header/chat-header.component';
import { ChatProfileComponent } from '@features/chat/chat-profile/chat-profile.component';
import { ChatSidebarComponent } from '@features/chat/chat-sidebar/chat-sidebar.component';

@Component({
  selector: 'app-chat-layout',
  imports: [
    ChatSidebarComponent,
    ChatProfileComponent,
    ChatHeaderComponent,
    RouterOutlet,
  ],
  templateUrl: './chat-layout.component.html',
  styleUrl: './chat-layout.component.scss',
})
export class ChatLayoutComponent {}
