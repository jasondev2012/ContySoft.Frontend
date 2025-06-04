import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomDataResponse } from 'src/app/common/interfaces/custom-response.interface';
import { ICatalogoGenerico } from 'src/app/interfaces/catalogo/catalogo.interface';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root',
})
export class CatalogoService {
    api: string = '';

    constructor(private http: HttpClient) {
        this.api = environment.api;
    }

    obtener(tipo_catalogo: string, id_padre: string = "default"): Observable<ICustomDataResponse<ICatalogoGenerico[]>>{
        return this.http.get<ICustomDataResponse<ICatalogoGenerico[]>>(`${this.api}catalogo/listar/${tipo_catalogo}/${id_padre}`);
    }
}
