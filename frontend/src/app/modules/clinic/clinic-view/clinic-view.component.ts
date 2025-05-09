import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicService } from '../../../services/clinic/clinic.service';

@Component({
  selector: 'app-clinic-view',
  templateUrl: './clinic-view.component.html',
  styleUrls: ['./clinic-view.component.css']
})
export class ClinicViewComponent implements OnInit {
  clinic: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clinicService: ClinicService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.clinicService.edit(id).subscribe(data => {
      this.clinic = data;
    });
  }

  getEspecialidadesResumo(): string {
    if (!this.clinic?.specialties) return '';

    const nomes = this.clinic.specialties.map((s: any) => s.name);
    const primeiraParte = nomes.slice(0, 2).join(', ');
    const extras = nomes.length > 2 ? ` + ${nomes.length - 2}` : '';
    return primeiraParte + extras;
  }

  voltar() {
    this.router.navigate(['/clinic']);
  }

  editar() {
    this.router.navigate(['/clinic/edit', this.clinic.id]);
  }
  mask(cnpj: string): string {
    const digits = cnpj.replace(/\D/g, '');
    return digits.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  }

}

