import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { LoadingService } from 'src/app/common/loading.service';
import { SessionService } from 'src/app/common/sesion.service';
import { LoginRequest } from 'src/app/interfaces/auth/login.interface';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    recordarEmail: boolean = false;

    password: string = '';
    usuario: string = '';

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private loginService: LoginService,
        private loadingService: LoadingService,
        private messageService: MessageService,
        private sessionService: SessionService
    ) {
        this.sessionService.clearSession(); // Limpia la sesión
    }
    ngOnInit(): void {
        let recEmail = localStorage.getItem('REC_EMAIL');
        if (recEmail && recEmail.toUpperCase() == 'TRUE') {
            let email = localStorage.getItem('EMAIL');
            this.usuario = email;
            this.recordarEmail = true;
        }
    }
    onKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evitar el comportamiento predeterminado
            this.onIniciarSesionClick(); // Llama a la función de iniciar sesión
        }
    }
    onIniciarSesionClick() {
        let request: LoginRequest = {
            usuario: this.usuario,
            password: this.password,
        };
        if (!request.usuario || request.usuario.replaceAll(' ', '') == '') {
            this.messageService.add({
                severity: 'warn',
                summary: 'Validación!',
                detail: 'Debe ingresar un email',
            });
            return;
        } else if (
            !request.password ||
            request.password.replaceAll(' ', '') == ''
        ) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Validación!',
                detail: 'Debe ingresar una contraseña',
            });
            return;
        }

        this.loadingService.show();
        this.loginService.getLogin(request)
        .pipe(finalize(() => this.loadingService.hide()))
        .subscribe({
            next: (res) => {
                if (this.recordarEmail) {
                    localStorage.setItem('EMAIL', this.usuario);
                    localStorage.setItem(
                        'REC_EMAIL',
                        this.recordarEmail.toString()
                    );
                } else {
                    localStorage.removeItem('EMAIL');
                    localStorage.removeItem('REC_EMAIL');
                }
                this.sessionService.setSession(res);
                this.router.navigate(['/dashboard']); // Redirige al home
            },
            error: (err) => {
                console.error('Error:', err);
            }
        });
    }
    onCrearCuentaClick() {
        this.router.navigate(['/auth/registro']);
    }
}
