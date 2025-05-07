import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { style } from '@angular/animations';
import { ClinicService } from '../../../services/clinic/clinic.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-clinic-list',
  templateUrl: './clinic-list.component.html',
  styleUrl: './clinic-list.component.css'
})
export class ClinicListComponent implements OnInit, OnDestroy {
  clinics: any = [];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  searchTerm: string = '';

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private clinicService: ClinicService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    /* this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 20,
      lengthMenu: [[5, 10, 25, 50, -1], ['5 linhas', '10', '25', '50', 'Mostrar tudo']],
      responsive: true,
      dom: 'Bfrtip',
      buttons: [
        {
          extend: 'excel',
          text: '<i class="far fa-file-excel mr-2"></i>Excel',
          className: 'btn-sm btn-secondary'
        },
        {
          text: '<i class="fas fa-print mr-2"></i>',
          className: 'btn-sm btn-secondary',

        }
      ],
      language: {
        search: '',
        searchPlaceholder: 'qwe',
      }
    }; */

    this.dtOptions = {
      pagingType: 'simple_numbers',
      responsive: true,
      scrollX: true,
      lengthMenu: [[20, 50, 100, -1], ['20 linhas', '50 linhas', '100 linhas', 'Mostrar Todas']],
      dom: `

          <'row'<'col-sm-12'tr>>
          <'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>
        `,
      buttons: [
        {
          extend: 'excel',
          text: '<i class="far fa-file-excel mr-2"></i>Excel',
          className: 'btn-sm btn-secondary',
        },
        {
          text: '<i class="fas fa-print mr-2"></i>Imprimir',
          className: 'btn-sm btn-secondary',
          action: () => {}
        }
      ],
      language: {
        url: "https://cdn.datatables.net/plug-ins/1.10.22/i18n/Portuguese-Brasil.json",
        language: ""
      },
    };



      this.clinics = [

        { id: 2, name: 'Clínica B', city: 'RJ', status: 1 },
        { id: 2, name: 'Clínica B', city: 'RJ', status: 1 },
        { id: 2, name: 'Clínica B', city: 'RJ', status: 1 },
        { id: 2, name: 'Clínica B', city: 'RJ', status: 1 },
        { id: 2, name: 'Clínica B', city: 'RJ', status: 1 },
        { id: 2, name: 'Clínica B', city: 'RJ', status: 1 },
        { id: 2, name: 'Clínica B', city: 'RJ', status: 1 },
        { id: 2, name: 'Clínica B', city: 'RJ', status: 1 },
        { id: 2, name: 'Clínica B', city: 'RJ', status: 1 },
        { id: 2, name: 'Clínica B', city: 'RJ', status: 1 },
        { id: 2, name: 'Clínica B', city: 'RJ', status: 1 },
        { id: 2, name: 'Clínica B', city: 'RJ', status: 1 },
        { id: 2, name: 'Clínica B', city: 'RJ', status: 0 },
        { id: 2, name: 'Clínica B', city: 'RJ', status: 0 },
        { id: 2, name: 'Clínica B', city: 'RJ', status: 0 },
        { id: 2, name: 'Clínica B', city: 'RJ', status: 0 },
        { id: 2, name: 'Clínica B', city: 'RJ', status: 0 },
        { id: 2, name: 'Clínica B', city: 'RJ', status: 0 },
        { id: 2, name: 'Clínica B', city: 'RJ', status: 1 },
        { id: 2, name: 'Clínica B', city: 'RJ', status: 1 },
        { id: 2, name: 'Clínica B', city: 'RJ', status: 1 },
        { id: 2, name: 'Clínica B', city: 'RJ', status: 1 },
        { id: 2, name: 'Clínica B', city: 'RJ', status: 1 },
        { id: 2, name: 'Clínica B', city: 'RJ', status: 1 },
      ];
    /* setTimeout(() => {
      this.dtTrigger.next(null);
    }, 1000); */
    this.clinicService.list().subscribe(data=>{ console.log('data', this.clinics = data)});
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  searchItem() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search(this.searchTerm).draw();
    });
  }

}
