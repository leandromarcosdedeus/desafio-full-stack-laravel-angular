import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { style } from '@angular/animations';
import { ClinicService } from '../../../services/clinic/clinic.service';
import { AuthService } from '../../../services/auth/auth.service';
import { ChangeDetectorRef } from '@angular/core';

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
    private authService: AuthService,
    private cd: ChangeDetectorRef

  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      responsive: true,
      pageLength: 10,
      dom: "<'row mb-3'<'col-12'f>>" +
     "<'row'<'col-12 text-end'B>>" +
     "<'row'<'col-sm-12'tr>>" +
     "<'row mt-2'<'col-sm-5 text-end'i><'col-sm-7 text-end'p>>",
      /* buttons: [
        {
          extend: 'excel',
          text: 'Exportar Excel',
          className: 'btn btn-sm btn-secondary',
        },
        {
          extend: 'print',
          text: 'Imprimir',
          className: 'btn btn-sm btn-secondary',
        }
      ], */
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.10.22/i18n/Portuguese-Brasil.json'
      },
      initComplete: function () {
        setTimeout(() => {
          const input = document.querySelector('.dt-search input.dt-input') as HTMLInputElement;
          const label = document.querySelector('label[for="dt-search-0"]');
          if (label) {
            label.textContent = ''; // remove o texto "Pesquisar"
          }
          if (input) {
            input.classList.add('form-control', 'form-control-sm', 'mb-3');
            input.placeholder = 'Buscar entidade...';
            input.style.width = '250px';
            input.style.marginLeft = '10px';
            input.setAttribute('style',
              `
                width: 100%;
                padding: 0.5rem 0.75rem 0.5rem 2.2rem;
                border: 1px solid #ced4da;
                border-radius: 0.375rem;
                font-size: 1rem;
              `
            );
          }

        }, 50);
      }

    };


  }


  ngAfterViewInit(): void {
    this.loadClinics();
    initComplete: () => {
      const searchInput = document.querySelector('.dt-search input.dt-input');
      if (searchInput) {
        searchInput.classList.add('form-control', 'form-control-sm');
        searchInput.setAttribute('placeholder', 'Buscar entidade...');
        (searchInput as HTMLElement).setAttribute('style', 'width: 250px; margin-left: 10px; display: inline-block;');
      }
    }
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  searchItem() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.search(this.searchTerm).draw();
    });
  }

  loadClinics(): void {
    this.clinicService.list().subscribe(data => {
      this.clinics = data;
      this.rerender();
    });
  }

  rerender(): void {
    if(this.dtElement.dtInstance != undefined) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next(null);
      });
    } else {
      this.dtTrigger.next(null);
    }
  }

  routeEdit(id: number){
    this.router.navigate(['/clinic/edit', id]);
  }
  routeView(id: number){
    this.router.navigate(['/clinic/view', id]);
  }
}
