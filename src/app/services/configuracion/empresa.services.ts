import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaginacionLista } from 'src/app/common/interfaces/paginacion-lista.interface';
import { environment } from 'src/environments/environment';
import { ICustomDataResponse, ICustomResponse } from 'src/app/common/interfaces/custom-response.interface';
import { IEmpresaLista, IEmpresaRequest, IEmpresaResponse } from './interfaces/empresa.interface';

@Injectable({
    providedIn: 'root'
  })
export class EmpresaService {
    api: string = ''
    constructor(private http: HttpClient,
    ) {
        this.api = environment.api
    }
    set(request: IEmpresaRequest): Observable<ICustomResponse>{
        return this.http.post<ICustomResponse>(`${this.api}empresa`, request)
    }
    get(id_empresa: number): Observable<IEmpresaResponse>{
        return this.http.get<IEmpresaResponse>(`${this.api}empresa/${id_empresa}`)
    }
    getNuevoCodigo(): Observable<ICustomDataResponse<string>>{
        return this.http.get<ICustomDataResponse<string>>(`${this.api}empresa/obtener-codigo`)
    }
    getList(filtro: any): Observable<IPaginacionLista<IEmpresaLista>>{
        let params = new HttpParams();
        
        for (let key in filtro) {
            if (filtro.hasOwnProperty(key) && filtro[key]) {
                params = params.append(key, filtro[key]);
            }
        }

        return this.http.get<IPaginacionLista<IEmpresaLista>>(`${this.api}empresa`, { params })
    }
}
