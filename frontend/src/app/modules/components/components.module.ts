import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { SelectRegionalComponent } from './select-regional/select-regional.component';
import { SelectClinicSpecialtyComponent } from './select-clinic-specialty/select-clinic-specialty.component';

@NgModule({
  declarations: [SelectRegionalComponent, SelectClinicSpecialtyComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule
  ],
  exports: [
    SelectRegionalComponent,
    SelectClinicSpecialtyComponent
  ]
})
export class ComponentsModule { }
