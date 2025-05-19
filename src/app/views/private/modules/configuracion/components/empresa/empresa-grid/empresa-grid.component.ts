import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-empresa-grid',
    templateUrl: './empresa-grid.component.html',
    styleUrl: './empresa-grid.component.scss',
    standalone: true,
    imports: [CardModule, TableModule]
})
export class EmpresaGridComponent {

  constructor(@Inject(Router) public router: Router) {}
  onNuevoClick(){
    this.router.navigate(['configuracion', 'empresa', 'steps']);
  }
}
