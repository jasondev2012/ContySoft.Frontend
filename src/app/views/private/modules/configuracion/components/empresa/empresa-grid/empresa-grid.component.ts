import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from 'src/app/services/configuracion/empresa.services';
import { IEmpresaLista } from 'src/app/services/configuracion/interfaces/empresa.interface';

@Component({
  selector: 'app-empresa-grid',
  templateUrl: './empresa-grid.component.html',
  styleUrl: './empresa-grid.component.scss'
})
export class EmpresaGridComponent {
  empresas: IEmpresaLista[] = []
  loading: boolean = false;
  totalRegistros: number = 0;
  request = {
    search: '',
    pageIndex: 1,
    pageSize: 10,
    order: 'id',
    orderDirection: '1',
  };
  constructor(private router: Router,
              private empresa: EmpresaService
  ) {}
  onNuevoClick(){
    this.router.navigate(['configuracion', 'empresa', 'registro']);
  }
  edit(id: number = 0){
    this.router.navigate([`/configuracion/empresa/actualizar`, id]); // Navega a la ruta con el ID
  }
  getEmpresas(event?: any) {
      this.loading = true;
      if (event) {
          this.request.pageIndex = event.first / this.request.pageSize + 1;
          this.request.pageSize = event.rows;
          this.request.search = event.globalFilter;
          this.request.order = event.sortField;
          this.request.orderDirection = event.sortOrder;
      }

      this.empresas = [];
      this.request.search =
          this.request.search == null ? '' : this.request.search;
      this.empresa.getList(this.request).subscribe({
          next: (response) => {
              this.empresas = response.items;
              this.totalRegistros = response.totalItems;
              this.loading = false;
          },
          error: (e: any) => {
              this.loading = false;
          },
      });
  }
}
