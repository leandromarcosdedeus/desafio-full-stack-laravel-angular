import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
      'specialties': new FormControl(null),
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

  validateCNPJ() {
    return (control: AbstractControl): ValidationErrors | null => {
      const cnpj = (control.value || '').replace(/\D/g, '');

      if (!cnpj || cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
        return { cnpjInvalido: true };
      }

      let tamanho = cnpj.length - 2;
      let numeros = cnpj.substring(0, tamanho);
      const digitos = cnpj.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;

      for (let i = tamanho; i >= 1; i--) {
        soma += Number(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
      }

      let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado !== Number(digitos.charAt(0))) return { cnpjInvalido: true };

      tamanho += 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;

      for (let i = tamanho; i >= 1; i--) {
        soma += Number(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
      }

      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado !== Number(digitos.charAt(1))) return { cnpjInvalido: true };

      return null;
    };
  }
}
