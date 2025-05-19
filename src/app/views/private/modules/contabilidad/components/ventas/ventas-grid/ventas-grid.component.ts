import { Component, ElementRef, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
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
import { TableModule } from 'primeng/table';
@Component({
    selector: 'app-ventas-grid',
    templateUrl: './ventas-grid.component.html',
    standalone: true,
    imports: [FormsModule, ButtonModule, CheckboxModule, DialogModule, CardModule, TableModule]
})
export class VentasGridComponent implements OnInit{

    displayBoletaModal: boolean = false;
    selectedBoleta: any = null;
    ventas!: Venta[]
    token: string
    products: Producto[] = []
    anio: any[]
    mes: any[]
    periods: Object
    mesSeleccionado: any | null = null;
    form: FormGroup;

    get formValid(): boolean {
        return this.form.valid;
    }

    @ViewChild('fileInput') fileInput!: ElementRef;
    constructor(private ventasService: VentasService,
                private loadinService: LoadingService,
                private messageService: MessageService,
                private sessionService: SessionService,
                @Inject(Router) public router: Router,
                @Inject(FormBuilder) public fb: FormBuilder,
                
    ) {
        this.token = this.sessionService.getSession().token
    }

    ngOnInit(): void {
        this.ventasService.obtenerPeriodo(this.token)
        .subscribe({
            next: res => {
                this.anio = res?.data[0];
                this.periods = res?.data[1];
            }
        });


        // this.ventasService.obtenerVentas(this.token)
        // .subscribe({
        //     next: res => {
        //         this.ventas = res.data.filter((venta) => {
        //             venta.idEstadoCP == 1 || venta.idEstadoCP == 3? venta.idEstadoCP=true: venta.idEstadoCP=false
        //             return true;
        //         });
        //     }
        // });

        this.form = this.fb.group({
            anio: [null, Validators.required],
            mes: [null, Validators.required],
          });
    }

    onSelectionChange(event: any): void {
        this.mes = this.periods[event.value?.value] || null;
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
            next: res => {

                this.products = res?.data.length == 0? [{
                    identificador:0,
                    descripcion:'No encontrado',
                    cantidad:'No encontrado',
                    precioUnitario:'No encontrado',
                    codigoItem:'No encontrado',
                    codigoUnidadMedida:'No encontrado',
                    unidadMedidaDesc:'No encontrado',
                    valorVtaUnitario: 'No encontrado'
                    }]: res.data;
                this.selectedBoleta.productos = this.products;
            },
            error: err => {
                this.selectedBoleta.productos = this.products;
            }
        });


        this.displayBoletaModal = true;
    }

    closeBoletaModal() {
        this.displayBoletaModal = false;
        this.selectedBoleta = null;
    }

    cargarDatos(){

        this.loadinService.show()
        this.ventasService.importarVentas(this.token, this.mesSeleccionado.value)
                .pipe(finalize(() => this.loadinService.hide()))
                .subscribe({
                    next: (response) => {
                      this.messageService.add({
                          severity: 'success',
                          summary: 'Ok!',
                          detail: response.message,
                      });
                      this.ventasService.obtenerVentas(this.token, this.mesSeleccionado.value)
                        .subscribe({
                                    next: res => {
                                            this.ventas = res.data.filter((venta) => {
                                                venta.idEstadoCP == 1 || venta.idEstadoCP == 3? venta.idEstadoCP=true: venta.idEstadoCP=false
                                                return true;
                                            });
                                            this.router.navigate([this.router.url]);
                                        }
                                    });
                        this.limpiarCampoArchivo();
                    },
                    error: (err) => {
                        this.limpiarCampoArchivo();
                    },
                });
    }

    limpiarCampoArchivo(): void {
      this.fileInput.nativeElement.value = '';  // Limpiamos el valor del input
    }
}
