export interface IPaginacionLista<T> 
{
    items: T[];  // Arreglo de elementos de tipo T
    totalItems: number;  // Número total de elementos
}