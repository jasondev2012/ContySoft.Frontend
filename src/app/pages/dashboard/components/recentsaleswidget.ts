import { Component } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Product, ProductService } from '../../service/product.service';
import { SessionService } from 'src/app/common/services/sesion.service';
import { Venta } from 'src/app/interfaces/ventas/venta.interface';
import { VentasService } from 'src/app/services/ventas/ventas.service';

@Component({
    standalone: true,
    selector: 'app-recent-sales-widget',
    imports: [CommonModule, TableModule, ButtonModule, RippleModule],
    template: `<div class="card !mb-8">
        <div class="font-semibold text-xl mb-4">Recent Sales</div>
        <p-table [value]="products" [paginator]="true" [rows]="5" responsiveLayout="scroll">
            <ng-template #header>
                <tr>
                    <th pSortableColumn="name">Razón Social <p-sortIcon field="name"></p-sortIcon></th>
                    <th pSortableColumn="price">Total <p-sortIcon field="price"></p-sortIcon></th>
                    <th>Ver</th>
                </tr>
            </ng-template>
            <ng-template #body let-product>
                <tr>x
                    <td style="width: 35%; min-width: 7rem;">{{product.razon_social}}</td>
                    <td style="width: 35%; min-width: 8rem;">{{product.total | currency:'PEN'}}</td>
                    <td style="width: 15%;">
                        <button pButton pRipple type="button" icon="pi pi-search" class="p-button p-component p-button-text p-button-icon-only"></button>
                    </td>
                </tr>
            </ng-template>
        </p-table>
    </div>`,
    providers: [ProductService]
})
export class RecentSalesWidget {
    products!: Venta[];

    constructor(private productService: ProductService, private ventasService: VentasService, private sessionService: SessionService) {}

    ngOnInit() {
        this.ventasService.obtenerVentas('ALL')
        .subscribe(data => {
            this.products = data.data  as Venta[]
        })
        // this.productService.getProductsSmall().then((data) => (this.products = data));
    }
}
