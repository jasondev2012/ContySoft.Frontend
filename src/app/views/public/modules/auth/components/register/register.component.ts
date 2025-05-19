import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { finalize, Subscription } from 'rxjs';
import { LoadingService } from 'src/app/common/services/loading.service';
import { RegisterAppService } from 'src/app/common/services/register-app.service';
import { SessionService } from 'src/app/common/services/sesion.service';
import { RegisterModel, RegisterRequest } from 'src/app/interfaces/auth/register.interface';
import { RegisterService } from 'src/app/services/auth/register.service';
import { Inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepsModule } from 'primeng/steps';

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
                                next: (res) => {
                                    this.messageService.add({
                                        severity: 'success',
                                        summary: 'Datos registrados',
                                        detail: 'Su cuenta fue registrada correctamente.',
                                    });
                                    this.sessionService.setSession(res);
                                    this.router.navigate(['/']); // Redirige al home
                                },
                                error: (err) => {
                                    console.log(err);
                                },
                            });
                    }
                }
            );
    }

    onIrLoginClick() {
        this.router.navigate(['/auth/login']);
    }
}
