export interface Venta{
    ruc: string;
    serieCP: string;
    numCP: string;
    periodo: string;
    fechaEmision: string;
    cliente: string;
    razonSocial: string;
    BI_Gravada: string;
    monto_inafecto: string;
    IGV_IPM: string;
    total: string;
    estadoCP: string;
    idEstadoCP: number | boolean;
    tipoCP: string;
}
