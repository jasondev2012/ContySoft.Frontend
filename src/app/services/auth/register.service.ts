import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionResponse } from 'src/app/common/sesion.service';
import { RegisterRequest } from 'src/app/interfaces/auth/register.interface';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class RegisterService {
    api: string = ''
    constructor(private http: HttpClient,
    ) { 
        this.api = environment.api
    }

    setRegistro(request: RegisterRequest): Observable<SessionResponse>{
        return this.http.post<SessionResponse>(`${this.api}auth/registro`, request)
    }
}
