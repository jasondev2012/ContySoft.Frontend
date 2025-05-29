import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomDataResponse } from 'src/app/common/interfaces/custom-response.interface';
import { SessionResponse } from 'src/app/common/services/sesion.service';
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

    setRegistro(request: RegisterRequest): Observable<ICustomDataResponse<SessionResponse>>{
        return this.http.post<ICustomDataResponse<SessionResponse>>(`${this.api}auth/registro`, request)
    }
    validarEmail(email: string): Observable<ICustomDataResponse<boolean>>{
        return this.http.get<ICustomDataResponse<boolean>>(`${this.api}auth/validar-email/${email}`)
    }
}
