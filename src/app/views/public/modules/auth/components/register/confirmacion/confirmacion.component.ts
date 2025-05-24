import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterAppService } from 'src/app/common/services/register-app.service';
import { RegisterModel } from 'src/app/interfaces/auth/register.interface';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrl: './confirmacion.component.scss'
})
export class ConfirmacionComponent {
  informacionRegistro: RegisterModel
  constructor(private router: Router,
              private registerAppService: RegisterAppService
  ) {}

  ngOnInit() {
      this.informacionRegistro = this.registerAppService.informacionRegistro;
      if(!this.informacionRegistro?.cuenta){
        this.router.navigate(['auth', 'registro', 'cuenta']);
        return;
      }
      if(!this.informacionRegistro?.empresa){
        this.router.navigate(['auth', 'registro', 'empresa']);
        return;
      }
      if(!this.informacionRegistro?.plan){
        this.router.navigate(['auth', 'registro', 'planes']);
        return;
      }
      if(!this.informacionRegistro?.pago){
        this.router.navigate(['auth', 'registro', 'pago']);
        return;
      }
  }

  complete() {
      this.registerAppService.complete();
  }

  prevPage() {
      this.router.navigate(['auth', 'registro', 'pago']);
  }
}
