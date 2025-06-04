export interface IEmpresaLocalModel {
    id: number;
    nombre: string;
    direccion: string;
    celular: string;
    serie_factura: string;
    serie_boleta: string;
}
export interface IEmpresaLocalRequest extends IEmpresaLocalList {
}
export interface IEmpresaLocalList{
    id: number;
    id_empresa: number;
    codigo: string;
    nombre: string;
    direccion: string;
    celular: string;
    serie_factura: string;
    numero_factura: number;
    serie_boleta: string;
    numero_boleta: number;
    activo: boolean;
}
