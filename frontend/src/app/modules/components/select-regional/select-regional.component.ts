import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RegionalsService } from '../../../services/regionals/regionals.service';

@Component({
  selector: 'app-select-regional',
  templateUrl: './select-regional.component.html',
  styleUrls: ['./select-regional.component.css']
})
export class SelectRegionalComponent implements OnInit {
  @Input() label: string = 'Regional';
  @Input() placeholder: string = 'Selecione uma regional';
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();
  @Input() disabled: boolean = false;
  @Input() multiple: boolean = false;

  regionals: any[] = [];
  loading: boolean = false;

  constructor(private regionalService: RegionalsService) {}

  ngOnInit(): void {
    this.loading = true;
    this.regionalService.getRegionals().subscribe((data: any) => {
      this.regionals = data;
      this.loading = false;
    });
  }

  onChange(event: any): void {
    this.valueChange.emit(event);
  }
}
