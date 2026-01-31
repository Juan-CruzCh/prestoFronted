export interface BuscarMedidorClienteI {
    apellidos?: string;
    estado?: string;
    lecturaActual?: number;
    lecturaAnterior?: number;
    medidor?: string;
    nombre?: string;
    numeroMedidor?: string;

}


export interface FormularioLecturaI {
    lecturaActual: number;
    lecturaAnterior: number;
    medidor: string
    gestion: number
    mes: string,

}

export interface ListarLecturaMedidorI {
    _id: string
    numeroMedidor: string;
    gestion: number;
    mes: number;
    lecturaActual: number;
    lecturaAnterior: number;
    consumoTotal: number;
    costoApagar: number;
    estado: string;
    idMedidor:string
}


export interface Lectura {
  _id: string;
  codigo: string;
  numeroLectura: number;
  mes: string;
  lecturaActual: number;
  lecturaAnterior: number;
  consumoTotal: number;
  costoApagar: number;
  estado:string;
  fecha: string; 
  fechaPago: string; 
  fechaVencimiento: string;
  flag: string;
  gestion: number;
  medidor: string;
  usuario: string;
}

export interface MedidorCliente {
  _id: string;
  codigoCliente: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  numeroMedidor: string;
  tarifa: string;
  direccion:string
}

export interface DetalleLecturasResponse {
  lecturas: Lectura[];
  medidorCliente: MedidorCliente[];
  totalApagar:number
}
