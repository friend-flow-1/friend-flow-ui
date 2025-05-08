import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { MeChannelComponent } from './me/me-channel/me-channel.component';
import { ChannelComponent } from './channel/channel.component';

export const chatRoutes: Routes = [
  {
    path: 'channels/@me',
    component: MeChannelComponent,
  },
  {
    path: 'channels/:id',
    component: ChannelComponent,
  },
  {
    path: '',
    redirectTo: 'channels/@me',
    pathMatch: 'full',
  },
];
