export interface IAlmacenLista{
    id: number;
    codigo: string;
    nombre: string;
    direccion: string;
    descripcion: string;
    centro_costo: string;
    activo: boolean;
}
export interface IAlmacenResponse extends IAlmacenRequest{
    usuario_modifica: string;
    fecha_modifica: Date;
}
export interface IAlmacenRequest{
    id: number;
    id_empresa: number;
    codigo: string;
    nombre: string;
    direccion: string;
    descripcion: string;
    id_centro_costo?: number;
    activo: boolean;
}