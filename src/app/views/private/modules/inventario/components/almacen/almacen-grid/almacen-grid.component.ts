import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { AlmacenFormComponent } from '../almacen-form/almacen-form.component';
import { CatalogoService } from 'src/app/services/catalogo/catalogo.service';
import { ICatalogoResponse } from 'src/app/services/catalogo/interfaces/catalogo.interface';
import { Catalogo } from 'src/app/common/constants/catalogo.constant';
import { AlmacenService } from 'src/app/services/inventario/almacen.service';

@Component({
    selector: 'app-almacen-grid',
    templateUrl: './almacen-grid.component.html',
    styleUrl: './almacen-grid.component.scss',
})
export class AlmacenGridComponent implements OnInit {
    loading: boolean = false;
    totalRegistros: number = 0;
    empresas: ICatalogoResponse[] = [];
    almacenes = [];
    request = {
        id_empresa: 0,
        search: '',
        pageIndex: 1,
        pageSize: 10,
        order: '',
        orderDirection: '',
    };
    ref: DynamicDialogRef | undefined;
    constructor(
        private almacenService: AlmacenService,
        public dialogService: DialogService,
        private catalogoService: CatalogoService
    ) {}
    ngOnInit(): void {
        this.catalogoService.get(Catalogo.Empresa).subscribe({
            next: (res) => {
                this.empresas = res;
            },
        });
    }
    openDialogAlmacen(id: number = 0) {
        this.ref = this.dialogService.open(AlmacenFormComponent, {
            header: id == 0 ? 'Nuevo Almacén' : 'Editar Almacén',
            styleClass: 'custom-dialog',
            data: {
                empresas: this.empresas,
                id: id,
            },
        });
        this.ref.onClose.subscribe(() => {
            this.getAlmacenes(null);
        });
    }
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
    onEmpresaChange(event: any) {
        this.request.id_empresa = event.value == null ? 0 : event.value;
        this.getAlmacenes(null);
    }
    getAlmacenes(event?: any) {
        this.loading = true;
        if (event) {
            this.request.pageIndex = event.first / this.request.pageSize + 1;
            this.request.pageSize = event.rows;
            this.request.search = event.globalFilter;
            this.request.order = event.sortField;
            this.request.orderDirection = event.sortOrder;
        }

        this.almacenes = [];
        this.request.search =
            this.request.search == null ? '' : this.request.search;
        this.almacenService.getList(this.request).subscribe({
            next: (response) => {
                this.almacenes = response.items;
                this.totalRegistros = response.totalItems;
                this.loading = false;
            },
            error: (e: any) => {
                this.loading = false;
            },
        });
    }
}
