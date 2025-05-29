import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Contabilidad',
                items: [
                    { label: 'Ventas', icon: 'pi pi-fw pi-credit-card', routerLink: ['/contabilidad/ventas'] },
                    { label: 'Compras', icon: 'pi pi-fw pi-cart-plus', routerLink: ['/contabilidad/compras'] },
                    { label: 'Percepciones', icon: 'pi pi-fw pi-chart-pie', routerLink: ['/contabilidad/percepciones'] },
                    { label: 'Retenciones', icon: 'pi pi-fw pi-bookmark-fill', routerLink: ['/contabilidad/retenciones'] },
                    { label: 'Liquidaciones', icon: 'pi pi-fw pi-box', routerLink: ['/contabilidad/liquidaciones'] },
                    { label: 'Cálculo de impuestos', icon: 'pi pi-calculator', routerLink: ['/contabilidad/calculo-impuestos'] },
                ]
            },
            {
                label: 'Configuraciones',
                items: [
                    { label: 'Datos Personales', icon: 'pi pi-fw pi-cog', routerLink: ['/configuracion/datos-personales'], badge: 'NEW' },
                    { label: 'Empresa', icon: 'pi pi-fw pi-building', routerLink: ['/configuracion/empresa'], badge: 'NEW' },
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
