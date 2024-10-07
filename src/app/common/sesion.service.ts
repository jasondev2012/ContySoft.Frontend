// session.service.ts
import { Injectable } from '@angular/core';

export interface SessionResponse {
    fullname: string;
    token: string;
    usuario: string;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {
    private sessionKey = 'userInfo'; // Clave para almacenar la sesión

    setSession(sessionData: any) {
        localStorage.setItem(this.sessionKey, JSON.stringify(sessionData)); // Guarda en localStorage
    }

    getSession() {
        const session = localStorage.getItem(this.sessionKey); // Obtiene la sesión
        return session ? JSON.parse(session) : null; // Devuelve la sesión o null
    }

    clearSession() {
        localStorage.removeItem(this.sessionKey); // Limpia la sesión
    }
}
