import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse,
    HttpEventType
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { CustomMessageService } from '../services/custom-message.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private messageService: CustomMessageService, private router: Router) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                  Swal.fire({
                    title: 'Sesión vencida',
                    text: 'Su sesión ha expirado. Por favor, inicie sesión nuevamente.',
                    icon: 'warning',
                    confirmButtonText: 'Aceptar',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false
                  }).then(() => {
                    // Redirigir al login
                    this.router.navigate(['auth', 'login']);
                  });
                  
                }else{
                    this.messageService.showError(error);
                }
                return throwError(() => error);

              }),
            tap({
                next: (event) => {
                    // Filtra eventos para actuar solo cuando el evento es una respuesta completa
                    if (event.type === HttpEventType.Response) {

                        // Verificar si es una respuesta HttpResponse y "Success" es false
                        const response = event as HttpResponse<any>;
                        if (response.body?.success === false && response.body?.code != 200) {
                            this.messageService.showMessage(response.body);
                            // Lanzar un error para detener el flujo
                            throw throwError(() => new Error(response.body?.message || 'Error en la respuesta'));
                        }
                    }
                },
            })
        );
    }
}
