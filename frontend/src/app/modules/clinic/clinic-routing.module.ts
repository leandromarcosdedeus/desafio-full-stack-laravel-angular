import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicListComponent } from './clinic-list/clinic-list.component';
import { ClinicCreateComponent } from './clinic-create/clinic-create.component';
import { ClinicViewComponent } from './clinic-view/clinic-view.component';

const routes: Routes = [
  {
    path: '',
    component: ClinicListComponent
  },
  {
    path: 'create',
    component: ClinicCreateComponent
  },
  {
    path: 'edit/:id', component: ClinicCreateComponent
  },
{
  path: 'view/:id', component: ClinicViewComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicRoutingModule { }
