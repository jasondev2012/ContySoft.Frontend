// session.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

export interface SessionResponse {
    fullname: string;
    token: string;
    usuario: string;
}

@Injectable({
    providedIn: 'root',
})
export class SessionService {
    private sessionTimeout: number = 2 * 60 * 1000; // 10 minutos en milisegundos
    private warningTimeout: number = 1 * 60 * 1000; // 9 minutos en milisegundos para la alerta
    private sessionExpired$ = new Subject<void>();
    private warningTriggered$ = new Subject<void>();
    private timeoutId: any;
    private warningTimeoutId: any;

    private sessionKey = 'userInfo'; // Clave para almacenar la sesión

    constructor(private router: Router) {}

    setSession(sessionData: any) {

        localStorage.setItem(this.sessionKey, JSON.stringify(sessionData)); // Guarda en localStorage
        this.startSessionTimer()
    }

    getSession() {
        const session = localStorage.getItem(this.sessionKey); // Obtiene la sesión
        return session ? JSON.parse(session) : null; // Devuelve la sesión o null
    }

    clearSession() {
        localStorage.removeItem(this.sessionKey); // Limpia la sesión
    }
    startSessionTimer() {
        this.clearTimers();

        this.warningTimeoutId = setTimeout(() => {
            this.warningTriggered$.next();
        }, this.warningTimeout);

        this.timeoutId = setTimeout(() => {
            this.sessionExpired$.next();
        }, this.sessionTimeout);
    }
    onSessionExpired() {
        return this.sessionExpired$.asObservable();
    }
    onWarningTriggered() {
        return this.warningTriggered$.asObservable();
    }

    clearTimers() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        if (this.warningTimeoutId) {
            clearTimeout(this.warningTimeoutId);
        }
    }
    resetSession() {
        this.startSessionTimer();
    }

    endSession() {
        this.clearSession();
        this.clearTimers();
        this.router.navigate(['/auth/login']);
    }
}
