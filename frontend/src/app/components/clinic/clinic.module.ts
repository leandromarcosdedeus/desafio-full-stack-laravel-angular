import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClinicRoutingModule } from './clinic-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { ClinicListComponent } from './clinic-list/clinic-list.component';



@NgModule({
  declarations: [ClinicListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClinicRoutingModule,
    HttpClientModule,
    DataTablesModule,
    FormsModule
  ]
})
export class ClinicModule { }
