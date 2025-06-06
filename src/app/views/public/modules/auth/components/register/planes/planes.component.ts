import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { RegisterAppService } from '../../../../../../../common/services/register-app.service';
import { DatosPlan } from '../../../../../../../interfaces/auth/register.interface';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-planes',
    templateUrl: './planes.component.html',
    styleUrl: './planes.component.scss',
    standalone: true,
    imports: [CardModule, ButtonModule]
})
export class PlanesComponent {
  constructor(@Inject(Router) public router: Router,
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
