import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IConsultaRucResponse } from '../consulta-ruc.interface';

@Injectable({
    providedIn: 'root'
  })
export class ConsultaRucService {
    api_consulta_ruc: string = ''
    token_consulta_ruc: string = ''
    constructor(private http: HttpClient,
    ) { 
        this.api_consulta_ruc = environment.api_consulta_ruc
        this.token_consulta_ruc = environment.token_consulta_ruc
    }
    getDatos(ruc: string): Observable<IConsultaRucResponse> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.token_consulta_ruc}`, // Cabecera para la autorización
        });
        return this.http.get<IConsultaRucResponse>(
            `${this.api_consulta_ruc}?numero=${ruc}`, { headers }
        );
    }
}
