import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IConsultaRucResponse } from '../consulta-ruc.interface';

@Injectable({
    providedIn: 'root'
  })
export class ConsultaRucService {
    api: string = ''
    constructor(private http: HttpClient,
    ) {
        this.api = environment.api
    }
    getDatos(ruc: string): Observable<IConsultaRucResponse> {
        return this.http.post<IConsultaRucResponse>(
            `${this.api}auth/info_sunat`, {ruc}
        );
    }
}
