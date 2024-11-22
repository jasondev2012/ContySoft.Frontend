import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomResponse, ICustomDataResponse } from 'src/app/common/interfaces/custom-response.interface';
import { environment } from 'src/environments/environment';
import { Venta } from 'src/app/interfaces/ventas/venta.interface';
import {Producto} from 'src/app/interfaces/ventas/producto.interface';
@Injectable({
    providedIn: 'root',
})
export class VentasService {
    api: string = '';

    constructor(private http: HttpClient) {
        this.api = environment.api;
    }

    obtenerVentas(token: string): Observable<ICustomDataResponse<Venta[]>>{
        return this.http.post<ICustomDataResponse<Venta[]>>(`${this.api}ventas/obtener`, {"token": token});
    }

    importarVentas(file: File, token: string ): Observable<ICustomResponse> {
        const formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('token', token); // Agregamos el archivo al FormData


        return this.http.post<ICustomResponse>(
            `${this.api}ventas/importar`,
            formData
        );
    }

    obtenerProductos(numRuc: string, numSerie: string, numDocumento: string): Observable<ICustomDataResponse<any>>{
        return this.http.get<ICustomDataResponse<any>>(`${this.api}ventas/productos/${numRuc}-${numSerie}-${numDocumento}`);
    }
}
