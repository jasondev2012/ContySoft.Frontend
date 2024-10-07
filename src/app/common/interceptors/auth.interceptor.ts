// auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from '../sesion.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private sessionService: SessionService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const session = this.sessionService.getSession();

        if (session && session.token) { // Verifica si hay un token en la sesión
            const cloned = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${session.token}` // Agrega el token a la cabecera
                }
            });

            return next.handle(cloned); // Envía la solicitud clonada
        }

        return next.handle(req); // Envía la solicitud original si no hay token
    }
}
