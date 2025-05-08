import { Component, signal } from '@angular/core';
import { SidebarComponent } from './ui/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { HlmSeparatorDirective } from '@shared/ui/ui-separator-helm/src';
import { BrnSeparatorComponent } from '@spartan-ng/brain/separator';

@Component({
  selector: 'app-app-layout',
  imports: [
    SidebarComponent,
    RouterOutlet,
    SidebarComponent,
    HlmSeparatorDirective,
    BrnSeparatorComponent,
  ],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
})
export class AppLayoutComponent {
  sidebarCollapsed = signal<boolean>(false);
}
