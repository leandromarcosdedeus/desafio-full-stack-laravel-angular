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
    'regional': new FormControl(null, [Validators.required]),
  });

  constructor(
    private clinicService: ClinicService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}


  createClinic() {
    if (this.form.status === 'VALID') {
      this.spinner.show();
      console.log('dados: ', this.form.value);
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
