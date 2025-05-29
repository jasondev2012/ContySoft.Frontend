import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomDataResponse } from 'src/app/common/interfaces/custom-response.interface';
import { SessionResponse } from 'src/app/common/services/sesion.service';
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

    getLogin(request: LoginRequest): Observable<ICustomDataResponse<SessionResponse>>{
        return this.http.post<ICustomDataResponse<SessionResponse>>(`${this.api}auth`, request)
    }
}
