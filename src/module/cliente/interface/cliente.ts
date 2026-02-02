export interface ListarClienteI {
    _id: string;
    apellidoMaterno: string;
    apellidoPaterno: string;
    celular: string;
    ci: string;
    codigo: string;
    nombre: string;
}

export interface CrearClienteI {
    apellidoMaterno: string;
    apellidoPaterno: string;
    celular: string;
    ci: string;
    nombre: string;
}

