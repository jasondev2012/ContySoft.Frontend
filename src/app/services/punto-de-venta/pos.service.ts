import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProducto } from './interfaces/producto.interface';
@Injectable({
    providedIn: 'root',
})
export class PosService {
    api: string = '';

    constructor(private http: HttpClient) {
        this.api = environment.api;
    }

    getProducts(): Observable<IProducto[]>{
        return this.http.get<IProducto[]>(`https://fakestoreapi.com/products?limit=100`);
    }
}
