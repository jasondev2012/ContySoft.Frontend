import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomResponse, ICustomDataResponse } from 'src/app/common/interfaces/custom-response.interface';
import { environment } from 'src/environments/environment';
import { Venta } from 'src/app/interfaces/ventas/venta.interface';
@Injectable({
    providedIn: 'root',
})
export class VentasService {
    api: string = '';

    constructor(private http: HttpClient) {
        this.api = environment.api;
    }

    obtenerArchivo(tipo: string, serie: string, numero: string): Observable<any>{
        return this.http.get<any>(`${this.api}ventas/obtener-comprobante/${tipo}/${serie}/${numero}`);
    }
    obtenerPeriodo(): Observable<ICustomDataResponse<any>>{
        return this.http.get<ICustomDataResponse<any>>(`${this.api}ventas/periodos`);
    }

    obtenerVentas(periodo: string): Observable<ICustomDataResponse<Venta[]>>{
        return this.http.post<ICustomDataResponse<Venta[]>>(`${this.api}ventas/obtener`, {periodo: periodo});
    }


    importarVentas(periodo: string): Observable<ICustomResponse> {
        return this.http.post<ICustomResponse>(
            `${this.api}ventas/importar`,{
                periodo: periodo
            }
        );
    }

    obtenerProductos(numRuc: string, numSerie: string, numDocumento: string): Observable<ICustomDataResponse<any>>{
        return this.http.get<ICustomDataResponse<any>>(`${this.api}ventas/productos/${numRuc}-${numSerie}-${numDocumento}`);
    }
}
