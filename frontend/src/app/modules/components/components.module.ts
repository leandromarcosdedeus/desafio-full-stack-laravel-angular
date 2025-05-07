import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { SelectRegionalComponent } from './select-regional/select-regional.component';

@NgModule({
  declarations: [SelectRegionalComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule
  ],
  exports: [
    SelectRegionalComponent
  ]
})
export class ComponentsModule { }
