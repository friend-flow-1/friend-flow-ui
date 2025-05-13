import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@shared/ui/ui-avatar-helm/src';
import { HlmIconDirective } from '@shared/ui/ui-icon-helm/src';
import { matSettingsOutline } from '@ng-icons/material-icons/outline';
import { HlmButtonDirective } from '@shared/ui/ui-button-helm/src';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
} from '@shared/ui/ui-dialog-helm/src';
import {
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/brain/dialog';

@Component({
  selector: 'app-chat-profile',
  imports: [
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
    HlmIconDirective,
    HlmButtonDirective,
    NgIcon,

    HlmDialogComponent,
    HlmDialogContentComponent,
    BrnDialogTriggerDirective,
    BrnDialogContentDirective,
  ],
  providers: [provideIcons({ matSettingsOutline })],
  templateUrl: './chat-profile.component.html',
  styleUrl: './chat-profile.component.scss',
})
export class ChatProfileComponent {}
