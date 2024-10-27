import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionResponse } from 'src/app/common/sesion.service';
import { LoginRequest } from 'src/app/interfaces/auth/login.interface';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class LoginService {
    api: string = ''
    constructor(private http: HttpClient,
    ) { 
        this.api = environment.api
    }

    getLogin(request: LoginRequest): Observable<SessionResponse>{
        return this.http.post<SessionResponse>(`${this.api}auth`, request)
    }
}
