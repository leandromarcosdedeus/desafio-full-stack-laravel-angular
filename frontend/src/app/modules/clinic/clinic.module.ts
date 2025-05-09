import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClinicRoutingModule } from './clinic-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { ClinicListComponent } from './clinic-list/clinic-list.component';
import { SelectRegionalComponent } from '../components/select-regional/select-regional.component';
import { ComponentsModule } from '../components/components.module';
import { ClinicCreateComponent } from './clinic-create/clinic-create.component';
import { ClinicViewComponent } from './clinic-view/clinic-view.component';



@NgModule({
  declarations: [ClinicListComponent, ClinicCreateComponent, ClinicViewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClinicRoutingModule,
    HttpClientModule,
    DataTablesModule,
    FormsModule,
    ComponentsModule
  ]
})
export class ClinicModule { }
