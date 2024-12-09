import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { ICategoria } from 'src/app/services/punto-de-venta/interfaces/categoria.interface';
import { IProducto } from 'src/app/services/punto-de-venta/interfaces/producto.interface';
import { PosService } from 'src/app/services/punto-de-venta/pos.service';
interface Categoria{
  id: number,
  nombre: string
}
const PRIME_NG = [ CardModule, DataViewModule, CommonModule, InputTextModule, MultiSelectModule, ChipModule, FormsModule, DropdownModule, TableModule,
  InputNumberModule, ButtonModule
 ]
@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [...PRIME_NG],
  templateUrl: './pos.component.html',
  styleUrl: './pos.component.scss'
})
export class PosComponent {
  productosIniciales: IProducto[]= []
  productos: IProducto[]= []
  categorias: ICategoria[] = []
  categoriasSeleccionadas: string[];
  constructor(private posService: PosService){
    this.posService.getProducts().subscribe({
      next: res => {
        this.productos = res;
        this.productosIniciales = res;
        const categoriasUnicas = Array.from(new Set(this.productos.map(p => p.category)));
        this.categorias = categoriasUnicas.map((nombre, index) => ({
          id: index,
          nombre,
        }));
      } 
    })
  }
  onCategoriaChange(event){
    this.productos = this.productosIniciales.filter(x => this.categoriasSeleccionadas.includes(x.category) || this.categoriasSeleccionadas.length == 0)
  }
  onFilter(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.productos = this.productosIniciales.filter(product => 
      (product.title.toLowerCase().includes(searchTerm) || 
      product.category.toLowerCase().includes(searchTerm))
      && (
        this.categoriasSeleccionadas.includes(product.category) || this.categoriasSeleccionadas.length == 0
      )
    );
  }
  onProductoClick(producto){
    console.log(producto)
  }
}
