import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';

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
    path: '**',
    redirectTo: 'login',
  },
];
