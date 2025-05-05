import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./components/auth/auth.module').then((m) => m.AuthModule)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'clinic', loadChildren: () => import('./components/clinic/clinic.module').then((m) => m.ClinicModule)}
];
