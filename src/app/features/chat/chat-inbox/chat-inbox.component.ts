import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmButtonDirective } from '@shared/ui/ui-button-helm/src';
import { HlmPopoverContentDirective } from '@shared/ui/ui-popover-helm/src';
import {
  BrnPopoverCloseDirective,
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/brain/popover';
import { matInboxOutline } from '@ng-icons/material-icons/outline';
import { HlmIconDirective } from '@shared/ui/ui-icon-helm/src';
import { HlmTooltipTriggerDirective } from '@shared/ui/ui-tooltip-helm/src';

@Component({
  selector: 'app-chat-inbox',
  imports: [
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    BrnPopoverContentDirective,
    HlmPopoverContentDirective,
    HlmButtonDirective,
    HlmIconDirective,
    HlmTooltipTriggerDirective,
    NgIcon,
  ],
  providers: [provideIcons({ matInboxOutline })],
  templateUrl: './chat-inbox.component.html',
  styleUrl: './chat-inbox.component.scss',
})
export class ChatInboxComponent {}
