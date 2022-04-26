export interface Order {
    _id:          string;
    cliente:      Cliente;
    empresa:      Empresa;
    productos:    Producto[];
    direccion:    Direccion;
    precio_envio: number;
    estado:       string;
    id_motorista: string;
}

export interface Cliente {
    _id:     string;
    nombre:  string;
    celular: string;
}

export interface Direccion {
    referencia:   string;
    latitud:  number;
    longitud: number;
}

export interface Empresa {
    nombre:    string;
    ubicacion: string;
}

export interface Producto {
    _id:      string;
    nombre:   string;
    precio:   number;
    cantidad: number;
}
