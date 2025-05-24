import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresa-grid',
  templateUrl: './empresa-grid.component.html',
  styleUrl: './empresa-grid.component.scss'
})
export class EmpresaGridComponent {

  constructor(private router: Router) {}
  onNuevoClick(){
    this.router.navigate(['configuracion', 'empresa', 'steps']);
  }
}
