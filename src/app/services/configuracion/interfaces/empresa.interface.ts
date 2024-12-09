export interface IEmpresaLista{
    id: number;
    codigo: string;
    ruc: string;
    nombre: string;
    representante_legal: string;
    activo: boolean
}

export interface IEmpresaResponse extends IEmpresaRequest{
    usuario_modifica: string;
    fecha_modifica: Date;
}

export interface IEmpresaRequest{
    id: number;
    codigo: string;
    nombre: string;
    razon_social: string;
    direccion: string;
    representante_legal: string;
    celular: string;
    telefono: string;
    email: string;
    ruc: string;
    tipo_empresa: string;
    ciiu: string;
    codigo_departamento: string; 
    codigo_distrito: string; 
    codigo_provincia: string; 
    es_principal: boolean;
    activo: boolean;
}