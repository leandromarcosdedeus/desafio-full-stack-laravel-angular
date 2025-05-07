import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClinicService } from '../../../services/clinic/clinic.service';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clinic-create',
  templateUrl: './clinic-create.component.html',
  styleUrl: './clinic-create.component.css'
})
export class ClinicCreateComponent {


  public form: FormGroup = new FormGroup({
    'regional_id': new FormControl(null, [Validators.required]),
    'corporate_name': new FormControl(null, [Validators.required]),
    'fantasy_name': new FormControl(null, [Validators.required]),
    'cnpj': new FormControl(null, [Validators.required]),
    'opening_date': new FormControl(null, [Validators.required]),
    'is_active': new FormControl(null, [Validators.required]),
    'specialties': new FormControl(null),

  });

  constructor(
    private clinicService: ClinicService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}


  createClinic() {
   // this.spinner.show();
    console.log('dados: ', this.form.value);

    if (this.form.status === 'VALID') {
      this.clinicService.create(this.form.value).subscribe(
        (data: any) => {
          this.spinner.hide();
          this.router.navigate(['/clinic'], {
            queryParams: { msg: data.message, type: data.type },
          });
        },
        (error) => {
          this.spinner.hide();
          this.router.navigate(['/clinic'], {
            queryParams: {
              msg: 'Ocorreu um erro inesperado. Favor entrar em contato com a TI.',
              type: 'error',
            },
          });
        }
      );
    }
  }

}
