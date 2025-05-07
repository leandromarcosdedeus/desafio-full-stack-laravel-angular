import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'clinic',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/clinic/clinic.module').then((m) => m.ClinicModule)
  },

];
