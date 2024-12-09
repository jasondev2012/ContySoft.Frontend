import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICatalogoResponse } from './interfaces/catalogo.interface';

@Injectable({
    providedIn: 'root'
  })
export class CatalogoService {
    api: string = ''
    constructor(private http: HttpClient,
    ) {
        this.api = environment.api
    }

    get(codigo: string, parametro_string: string = "OK"): Observable<ICatalogoResponse[]>{
        return this.http.get<ICatalogoResponse[]>(`${this.api}catalogo/personalizado/${codigo}/${parametro_string}`)
    }
}
