import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpresaRequest } from 'src/app/common/interfaces/configuracion/empresa.interface';
import { ICustomDataResponse, ICustomResponse } from 'src/app/common/interfaces/custom-response.interface';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root',
})
export class EmpresaService {
    api: string = '';

    constructor(private http: HttpClient) {
        this.api = environment.api;
    }

    obtener(): Observable<ICustomDataResponse<EmpresaRequest>>{
        return this.http.get<ICustomDataResponse<EmpresaRequest>>(`${this.api}empresa/obtener`);
    }
    registrar(empresa: EmpresaRequest): Observable<ICustomResponse>{
        return this.http.post<ICustomResponse>(`${this.api}empresa/registrar`, empresa);
    }
}
