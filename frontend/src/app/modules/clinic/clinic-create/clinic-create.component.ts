import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  clinicId: number | null = null;
  clinic: any;
  showModal: boolean = false;

  public form: FormGroup = new FormGroup({
    'regional_id': new FormControl(null, [Validators.required]),
    'corporate_name': new FormControl(null, [Validators.required]),
    'fantasy_name': new FormControl(null, [Validators.required]),
    'cnpj': new FormControl(null, [Validators.required]),
    'opening_date': new FormControl(null, [Validators.required]),
    'is_active': new FormControl(true),
    'specialties': new FormControl(null),
  });

  constructor(
    private clinicService: ClinicService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.clinicId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.clinicId) {
      this.clinicService.edit(this.clinicId).subscribe(data => {
        this.clinic = data;

        this.form.get('corporate_name')?.setValue(this.clinic.corporate_name);
        this.form.get('regional_id')?.setValue(this.clinic.regional_id);
        this.form.get('fantasy_name')?.setValue(this.clinic.fantasy_name);
        this.form.get('cnpj')?.setValue(this.clinic.cnpj);
        this.form.get('opening_date')?.setValue(this.clinic.opening_date);
        this.form.get('is_active')?.setValue(this.clinic.is_active);

        const specialtiesIDS = this.clinic.specialties.map((s: any) => s.id);
        this.form.get('specialties')?.setValue(specialtiesIDS);
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
            this.router.navigate(['/clinic']);
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

  fecharMensagem() {
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
}
