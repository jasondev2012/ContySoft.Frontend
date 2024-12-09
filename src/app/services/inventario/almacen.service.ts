import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaginacionLista } from 'src/app/common/interfaces/paginacion-lista.interface';
import { SessionResponse } from 'src/app/common/services/sesion.service';
import { environment } from 'src/environments/environment';
import { IAlmacenLista, IAlmacenRequest, IAlmacenResponse } from './interfaces/almacen.interface';
import { ICustomDataResponse, ICustomResponse } from 'src/app/common/interfaces/custom-response.interface';

@Injectable({
    providedIn: 'root'
  })
export class AlmacenService {
    api: string = ''
    constructor(private http: HttpClient,
    ) {
        this.api = environment.api
    }
    set(request: IAlmacenRequest): Observable<ICustomResponse>{
        return this.http.post<ICustomResponse>(`${this.api}almacen`, request)
    }
    get(id_almacen: number): Observable<IAlmacenResponse>{
        return this.http.get<IAlmacenResponse>(`${this.api}almacen/${id_almacen}`)
    }
    getNuevoCodigo(id_empresa: number): Observable<ICustomDataResponse<string>>{
        return this.http.get<ICustomDataResponse<string>>(`${this.api}almacen/obtener-codigo/${id_empresa}`)
    }
    getList(filtro: any): Observable<IPaginacionLista<IAlmacenLista>>{
        let params = new HttpParams();
        console.log(filtro)
        // Itera sobre las propiedades del filtro y agrega cada propiedad como un parámetro de consulta
        for (let key in filtro) {
            if (filtro.hasOwnProperty(key) && filtro[key]) {
                params = params.append(key, filtro[key]);
            }
        }

        return this.http.get<IPaginacionLista<IAlmacenLista>>(`${this.api}almacen`, { params })
    }
}
