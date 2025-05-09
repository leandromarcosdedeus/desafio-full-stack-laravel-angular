import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClinicService } from '../../../services/clinic/clinic.service';

@Component({
  selector: 'app-clinic-create',
  templateUrl: './clinic-create.component.html',
  styleUrls: ['./clinic-create.component.css']
})
export class ClinicCreateComponent implements OnInit {
  msg: string | null = null;
  type: 'success' | 'error' | null = null;

  form!: FormGroup;
  clinicId: number | null = null;
  clinic: any;
  showModal: boolean = false;

  constructor(
    private clinicService: ClinicService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.clinicId = Number(this.route.snapshot.paramMap.get('id'));

    this.form = new FormGroup({
      'regional_id': new FormControl(null, [Validators.required]),
      'corporate_name': new FormControl(null, [Validators.required, Validators.minLength(10)]),
      'fantasy_name': new FormControl(null, [Validators.required]),
      'cnpj': new FormControl(null, [Validators.required, this.validateCNPJ()]),
      'opening_date': new FormControl(null, [Validators.required]),
      'is_active': new FormControl(true),
      'specialties': new FormControl(null, [this.minSpecialtiesValidator(5)])
    });

    if (this.clinicId) {
      this.clinicService.edit(this.clinicId).subscribe(data => {
        this.clinic = data;

        this.form.patchValue({
          corporate_name: this.clinic.corporate_name,
          regional_id: this.clinic.regional_id,
          fantasy_name: this.clinic.fantasy_name,
          cnpj: this.clinic.cnpj,
          opening_date: this.clinic.opening_date,
          is_active: this.clinic.is_active,
          specialties: this.clinic.specialties.map((s: any) => s.id),
        });
      });
    }
  }

  createClinic() {

    const rawCnpj = String(this.form.get('cnpj')?.value || '');
      const cleanCnpj = rawCnpj.replace(/\D/g, '');
      this.form.get('cnpj')?.setValue(cleanCnpj);

      console.log(this.form.value)

    if (this.form.valid) {
      this.spinner.show();

      const request = this.clinicId
        ? this.clinicService.update(this.clinicId, this.form.value)
        : this.clinicService.create(this.form.value);


      request.subscribe(
        (res: any) => {
          this.spinner.hide();
          this.msg = this.clinicId
            ? 'Entidade atualizada com sucesso!'
            : 'Entidade criada com sucesso!';
          this.type = 'success';

          setTimeout(() => {
            this.router.navigate(['/clinic/view/' + res.id]);
          }, 3000);
        },
        (error) => {
          this.spinner.hide();
          this.msg = 'Ocorreu um erro inesperado. Favor entrar em contato com a TI.';
          this.type = 'error';
        }
      );
    } else {
      this.form.markAllAsTouched();
      this.msg = 'Corrija os erros destacados no formulário.';
      this.type = 'error';
    }
  }

  closeMSG() {
    this.msg = null;
    this.type = null;
  }

  delete() {
    if (this.clinicId) {
      this.spinner.show();

      this.clinicService.delete(this.clinicId).subscribe(
        () => {
          this.spinner.hide();
          this.msg = 'Entidade excluída com sucesso!';
          this.type = 'success';
          this.closeModal();

          setTimeout(() => {
            this.router.navigate(['/clinic']);
          }, 3000);
        },
        (error) => {
          this.spinner.hide();
          this.msg = 'Erro ao excluir a entidade. Tente novamente.';
          this.type = 'error';
          this.closeModal();
        }
      );
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  validateCNPJ(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const raw = String(control.value || '');
      const cnpj = raw.replace(/\D/g, '');

      if (!cnpj || cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
        return { cnpjInvalido: true };
      }

      const validateDigit = (base: string, weights: number[]): number => {
        const sum = base.split('').reduce((acc, num, idx) => acc + Number(num) * weights[idx], 0);
        const rest = sum % 11;
        return rest < 2 ? 0 : 11 - rest;
      };

      const base = cnpj.slice(0, 12);
      const digit1 = validateDigit(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
      const digit2 = validateDigit(base + digit1, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

      if (digit1 !== Number(cnpj[12]) || digit2 !== Number(cnpj[13])) {
        return { cnpjInvalido: true };
      }

      return null;
    };
  }


  minArrayLength(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (Array.isArray(value) && value.length >= min) {
        return null;
      }
      return { minArrayLength: { requiredLength: min, actualLength: value?.length || 0 } };
    };
  }
  minSpecialtiesValidator(min: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (Array.isArray(value) && value.length >= min) {
        return null;
      }
      return { minSpecialties: true };
    };
  }

}