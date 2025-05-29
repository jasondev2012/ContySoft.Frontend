import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { finalize, Subscription } from 'rxjs';
import { Inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepsModule } from 'primeng/steps';
import { LoadingService } from '../../../../../../common/services/loading.service';
import { RegisterAppService } from '../../../../../../common/services/register-app.service';
import { SessionService } from '../../../../../../common/services/sesion.service';
import { RegisterModel, RegisterRequest } from '../../../../../../interfaces/auth/register.interface';
import { RegisterService } from '../../../../../../services/auth/register.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    standalone: true,                                    // Componente standalone
    imports: [RouterModule, ButtonModule, StepsModule],  
})
export class RegisterComponent implements OnInit, OnDestroy {
    items: MenuItem[] | undefined;
    subscription: Subscription;

    constructor(
        @Inject(Router) public router: Router,
        public registerAppService: RegisterAppService,
        public messageService: MessageService,
        public loadingService: LoadingService,
        public registerService: RegisterService,
        private sessionService: SessionService
    ) {
        this.subscription =
            this.registerAppService.registroCompletado$.subscribe(
                (informacionRegistro: RegisterModel) => {
                    if (
                        informacionRegistro.cuenta != null &&
                        informacionRegistro.empresa != null &&
                        informacionRegistro.pago != null &&
                        informacionRegistro.plan != null
                    ) {
                        let registerRequest: RegisterRequest = {
                            ...informacionRegistro.cuenta,
                            ...informacionRegistro.empresa,
                            ...informacionRegistro.plan,
                        };
                        this.loadingService.show();

                        this.registerService
                            .setRegistro(registerRequest)
                            .pipe(finalize(() => this.loadingService.hide()))
                            .subscribe({
                                next: (res: any) => {
                                    
                                    if(res.success){
                                        this.messageService.add({
                                            severity: 'success',
                                            summary: 'Datos registrados',
                                            detail: 'Su cuenta fue registrada correctamente.',
                                        });
                                        this.sessionService.setSession(res.data);
                                        this.router.navigate(['/']); // Redirige al home
                                    }else{
                                        this.messageService.add({
                                            severity: 'error',
                                            summary: 'Ups.',
                                            detail: 'Sucedió un erro.',
                                        });
                                    }
                                    
                                },
                                error: (err: any) => {
                                    console.log(err);
                                },
                            });
                    }
                }
            );
        this.items = [
            {
                label: 'Cuenta',
                routerLink: 'cuenta',
            },
            {
                label: 'Empresa',
                routerLink: 'empresa',
            },
            {
                label: 'Plan',
                routerLink: 'planes',
            },
            {
                label: 'Pago',
                routerLink: 'pago',
            },
            {
                label: 'Confirmación',
                routerLink: 'confirmacion',
            },
        ];
    }
    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    ngOnInit(): void {
    }

    onIrLoginClick() {
        this.router.navigate(['/auth/login']);
    }
}
