export interface RegisterRequest{
    ruc: string;
    razon_social: string;
    tipo_persona: string;
    usuario: string;
    password: string;
    usuario_sol: string;
    password_sol: string;
    id_plan: number;
}

export interface RegisterModel{
    cuenta: DatosCuenta;
    empresa: DatosEmpresa;
    pago: DatosPago;
    plan: DatosPlan
}
export interface DatosCuenta{    
    usuario: string;
    password: string;
}
export interface DatosEmpresa{    
    ruc: string;
    razon_social: string;
    tipo_persona: string;
    usuario_sol: string;
    password_sol: string;
}
export interface DatosPago{    
    nombre_titular: string;
    correo_titular: string;
    numero_tarjeta: string;
    fecha_vencimiento: string;
    cvv: number;
}
export interface DatosPlan{    
    id_plan: number;
}
