import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-empresa-steps',
  templateUrl: './empresa-steps.component.html',
  styleUrl: './empresa-steps.component.scss'
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
