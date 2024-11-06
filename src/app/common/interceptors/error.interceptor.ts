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
import { Observable, tap, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private messageService: MessageService) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap({
                next: (event) => {
                    // Filtra eventos para actuar solo cuando el evento es una respuesta completa
                    if (event.type === HttpEventType.Response) {

                        // Verificar si es una respuesta HttpResponse y "Success" es false
                        const response = event as HttpResponse<any>;
                        if (response.body?.success === false && response.body?.code != 200) {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error ('+ response.body?.code +')',
                                detail: response.body?.message,
                            });
                            // Lanzar un error para detener el flujo
                            throw throwError(() => new Error(response.body?.message || 'Error en la respuesta'));
                        }
                    }
                },
                error: (error: HttpErrorResponse) => {
                    console.log(error);
                    // Manejamos los errores HTTP
                    // this.messageService.add({
                    //     severity: 'error',
                    //     summary: 'Ups!',
                    //     detail: 'Error en la solicitud',
                    // });
                    return throwError(() => error);
                },
            })
        );
    }
}
