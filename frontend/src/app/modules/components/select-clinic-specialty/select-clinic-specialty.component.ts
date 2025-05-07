import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RegionalsService } from '../../../services/regionals/regionals.service';
import { ClinicSpecialtyService } from '../../../services/clinic-specialty/clinic-specialty.service';

@Component({
  selector: 'app-select-clinic-specialty',
  templateUrl: './select-clinic-specialty.component.html',
  styleUrl: './select-clinic-specialty.component.css'
})
export class SelectClinicSpecialtyComponent {
  @Input() label: string = 'Regional';
  @Input() placeholder: string = 'Selecione uma regional';
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();
  @Input() disabled: boolean = false;
  @Input() multiple: boolean = false;

  specialty: any[] = [];
  loading: boolean = false;

  constructor(private specialtyService: ClinicSpecialtyService) {}

  ngOnInit(): void {
    this.loading = true;
    this.specialtyService.getSpecialty().subscribe((data: any) => {
      this.specialty = data;
      this.loading = false;
    });
  }

  onChange(event: any): void {
    this.valueChange.emit(event);
  }
}
