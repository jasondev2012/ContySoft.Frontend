import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterAppService } from 'src/app/common/services/register-app.service';
import { DatosPlan } from 'src/app/interfaces/auth/register.interface';

@Component({
    selector: 'app-planes',
    templateUrl: './planes.component.html',
    styleUrl: './planes.component.scss',
    standalone: false
})
export class PlanesComponent {
  constructor(private router: Router,
              private registerAppService: RegisterAppService) {}
  planSeleccionado: number = 0
  ngOnInit() {
    if(this.registerAppService.informacionRegistro?.plan?.id_plan){
      this.planSeleccionado = this.registerAppService.informacionRegistro.plan.id_plan
    }
    if(!this.registerAppService.informacionRegistro?.cuenta){
      this.router.navigate(['auth', 'registro', 'cuenta']);
      return;
    }
    if(!this.registerAppService.informacionRegistro?.empresa){
      this.router.navigate(['auth', 'registro', 'empresa']);
      return;
    }
  }

  nextPage() {
    if(this.planSeleccionado > 0){
      const plan: DatosPlan = {
        id_plan: this.planSeleccionado
      }
      this.registerAppService.informacionRegistro.plan = plan;
      this.router.navigate(['auth', 'registro', 'pago']);
    }
      //this.submitted = true;
  }

  prevPage() {
    this.router.navigate(['auth', 'registro', 'empresa']);
  }
}
