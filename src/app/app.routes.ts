import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', // or 'dashboard' if token exists
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('@features/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'chat',
        loadChildren: () =>
          import('@features/chat/chat.routes').then((m) => m.chatRoutes),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
