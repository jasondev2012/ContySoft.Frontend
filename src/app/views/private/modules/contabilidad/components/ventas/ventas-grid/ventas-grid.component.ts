import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize, pipe } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/common/services/loading.service';
import { SessionService } from 'src/app/common/services/sesion.service';
import { Producto } from 'src/app/interfaces/ventas/producto.interface';
import { Venta } from 'src/app/interfaces/ventas/venta.interface';
import { VentasService } from 'src/app/services/ventas/ventas.service';
import { Inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { Table, TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
@Component({
    selector: 'app-ventas-grid',
    templateUrl: './ventas-grid.component.html',
    standalone: true,
    imports: [CommonModule, InputTextModule, IconFieldModule, InputIconModule, FormsModule, ReactiveFormsModule, ButtonModule, CheckboxModule, DialogModule, CardModule, TableModule, SelectModule]
})
export class VentasGridComponent implements OnInit {
    globalFilter: string = '';
    displayBoletaModal: boolean = false;
    selectedBoleta: any = null;
    ventas!: Venta[];
    products: Producto[] = [];
    anio?: any[];
    mes?: any[];
    periods?: any;
    mesSeleccionado: any | null = null;
    form: FormGroup;

    get formValid(): boolean {
        return this.form?.valid || false;
    }

    @ViewChild('tbl_ventas') tbl_ventas!: Table;
    constructor(
        private ventasService: VentasService,
        private loadinService: LoadingService,
        private messageService: MessageService,
        private sessionService: SessionService,
        @Inject(Router) public router: Router,
        @Inject(FormBuilder) public fb: FormBuilder
    ) {

        this.form = this.fb.group({
            anio: [null, Validators.required],
            mes: [null, Validators.required]
        });
    }

    ngOnInit(): void {
        this.loadinService.show();
        this.ventasService
            .obtenerPeriodo()
            .pipe(finalize(() => this.loadinService.hide()))
            .subscribe({
                next: (res) => {
                    this.anio = res?.data[0];
                    this.periods = res?.data[1];
                }
            });

        
    }
    onMesChange(event: any){
        this.ventasService.obtenerVentas(event.value)
        .subscribe({
            next: res => {
                this.ventas = res.data.filter((venta) => {
                    venta.idEstadoCP == 1 || venta.idEstadoCP == 3? venta.idEstadoCP=true: venta.idEstadoCP=false
                    return true;
                });
            }
        });
    }
    onSelectionChange(event: any): void {
        const key = event.value?.value;
        this.mes = this.periods && key ? this.periods[key] : null;
    }

    openBoletaModal(venta: Venta) {
        this.selectedBoleta = {
            tipoCP: venta.tipoCP,
            numero: venta.numCP,
            fecha: venta.fechaEmision,
            cliente: venta.cliente,
            total: venta.total
        };

        this.ventasService.obtenerProductos(venta.ruc, venta.serieCP, venta.numCP).subscribe({
            next: (res) => {
                this.products =
                    res?.data.length == 0
                        ? [
                              {
                                  identificador: 0,
                                  descripcion: 'No encontrado',
                                  cantidad: 'No encontrado',
                                  precioUnitario: 'No encontrado',
                                  codigoItem: 'No encontrado',
                                  codigoUnidadMedida: 'No encontrado',
                                  unidadMedidaDesc: 'No encontrado',
                                  valorVtaUnitario: 'No encontrado'
                              }
                          ]
                        : res.data;
                this.selectedBoleta.productos = this.products;
            },
            error: (err) => {
                this.selectedBoleta.productos = this.products;
            }
        });

        this.displayBoletaModal = true;
    }
    onFilterChange(){
        this.tbl_ventas.filterGlobal(this.globalFilter, 'contains')
    }
    closeBoletaModal() {
        this.displayBoletaModal = false;
        this.selectedBoleta = null;
    }

    cargarDatos() {
        this.loadinService.show();
        this.ventasService
            .importarVentas(this.form.get('mes')?.value)
            .pipe(finalize(() => this.loadinService.hide()))
            .subscribe({
                next: (res) => {
                    if (res.success) {
                        this.ventasService.obtenerVentas(this.form.get('mes')?.value).subscribe({
                            next: (res) => {
                                this.ventas = res.data.filter((venta) => {
                                    venta.idEstadoCP == 1 || venta.idEstadoCP == 3 ? (venta.idEstadoCP = true) : (venta.idEstadoCP = false);
                                    return true;
                                });
                                this.router.navigate([this.router.url]);
                            }
                        });
                        this.limpiarCampoArchivo();
                    }                    
                    this.messageService.add({
                        severity: res.success ? 'success' : 'error',
                        summary: res.success ? 'Ok!' : 'Ups!',
                        detail: res.message
                    });
                },
                error: (err) => {
                    this.limpiarCampoArchivo();
                }
            });
    }

    limpiarCampoArchivo(): void {
        this.globalFilter = ''; // Limpiamos el valor del input
    }
}
