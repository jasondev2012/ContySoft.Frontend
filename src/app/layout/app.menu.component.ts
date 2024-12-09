import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Punto de Venta',
                items: [
                    { label: 'POS', icon: 'pi pi-fw pi-calculator', routerLink: ['/ventas/pos'] },
                    { label: 'Añadir Venta', icon: 'pi pi-fw pi-cart-plus', routerLink: ['/ventas/agregar'] },
                    { label: 'Lista de Ventas', icon: 'pi pi-fw pi-list', routerLink: ['/ventas/listar'] },
                ]
            },
            {
                label: 'Inventario',
                items: [
                    { label: 'Productos', icon: 'pi pi-fw pi-th-large', routerLink: ['/inventario/producto/listar'] },
                    { label: 'Categorias', icon: 'pi pi-fw pi-credit-card', routerLink: ['/inventario/categoria/listar'] },
                    { label: 'Almacenes', icon: 'pi pi-fw pi-sitemap', routerLink: ['/inventario/almacen/listar'] },
                    { label: 'Kardex', icon: 'pi pi-fw pi-list', routerLink: ['/inventario/kardex/listar'] }
                ]
            },
            {
                label: 'Reportes',
                items: [
                    { label: 'Ventas', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporte/ventas'] }
                ]
            },
            {
                label: 'Configuraciones',
                items: [
                    { label: 'Datos Personales', icon: 'pi pi-fw pi-cog', routerLink: ['/configuracion/datos-personales'], badge: 'NEW' },
                    { label: 'Empresas', icon: 'pi pi-fw pi-building', routerLink: ['/configuracion/empresa'], badge: 'NEW' },
                ]
            },
            {
                label: 'Sistema',
                items: [
                    {
                        label: 'Cerrar sesión',
                        icon: 'pi pi-fw pi-power-off',
                        routerLink: ['/auth/login']
                    },
                ]

            }
        ];
    }
}
