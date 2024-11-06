import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { SessionService } from '../services/sesion.service';

export const authGuard: CanActivateFn = (route, state) => {
    const sessionService = inject(SessionService);
    const router = inject(Router); // Inyecta el Router
    const session = sessionService.getSession();

    if (session) {
        return true; // Permite el acceso si hay sesión
    }else{
        // Redirige a la página de inicio de sesión si no hay sesión
        router.navigate(['/auth/login']);
        return false; // Impide el acceso a la ruta protegida
    }

};
