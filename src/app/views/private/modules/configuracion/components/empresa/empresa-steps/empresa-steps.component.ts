import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-empresa-steps',
    templateUrl: './empresa-steps.component.html',
    styleUrl: './empresa-steps.component.scss',
    standalone: true,
    imports: [CardModule, TableModule, RouterModule, StepsModule]
})
export class EmpresaStepsComponent implements OnInit {

  steps: MenuItem[] | undefined;
  
  ngOnInit() {
    this.steps = [
        {
            label: 'Planes',
            routerLink: 'planes'
        },
        {
            label: 'Empresa',
            routerLink: 'registro'
        },
        {
            label: 'Pago',
            routerLink: 'pago'
        },
        {
            label: 'Confirmación',
            routerLink: 'confirmacion'
        }
    ];
  }
}
