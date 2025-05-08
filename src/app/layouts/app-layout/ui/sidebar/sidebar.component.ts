import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMessageSquareText } from '@ng-icons/lucide';
import { matAttachMoneyOutline } from '@ng-icons/material-icons/outline';
import { HlmIconDirective } from '@shared/ui/ui-icon-helm/src';

@Component({
  selector: 'app-sidebar',
  imports: [HlmIconDirective, NgIcon, RouterLink, RouterLinkActive],
  viewProviders: [
    provideIcons({ lucideMessageSquareText, matAttachMoneyOutline }),
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  collapsed = input.required<boolean>();
  toggle = output();
}
