
export interface buscarMedidorClienteI {
  _id: string
  numeroMedidor: string,
  direccion: string,
  estado: string
  lecturas: LecturasPagoI[]
}


interface LecturasPagoI {
  _id: string;
  codigo: string;
  numeroLectura: number;
  mes: string;
  lecturaActual: number;
  lecturaAnterior: number;
  consumoTotal: number;
  costoApagar: number;
  gestion: string;
  estado: string;
  medidor: string;
  usuario: string;
  flag: string;
  fechaVencimiento: Date;
  fecha: Date;
}



// Detalle de cada lectura pagada
export interface DetallePagoLectura {
  _id: string;
  lectura: string;
  costoPagado: number;
  pago: string;
  gestion: number;
  lecturaActual: number;
  lecturaAnterior: number;
  consumoTotal: number;
  costoApagar: number;
  mes: string;
  flag: string;
  fecha: string;
}


export interface DetallePagoCliente {
  _id: string;
  apellidoMaterno: string;
  apellidoPaterno: string;
  codigoCliente: string;
  direccion: string;
  detallePago: DetallePagoLectura[];
  fecha: string;
  nombre: string;
  numeroPago: number;
  total: number;
  numeroMedidor: string
}


export interface HistorialLectura {
  _id: string;
  codigo: string;
  numeroLectura: number;
  mes: string;
  lecturaActual: number;
  lecturaAnterior: number;
  consumoTotal: number;
  costoApagar: number;
  gestion: number;
  estado: string
  medidor: string;
  usuario: string;
  flag: string;
  fechaVencimiento: string;
  fecha: string;
  fechaPago: string;
}


export interface PagoDetalleResponse {
  detallePago: DetallePagoCliente;
  gestion: number;
  historial: HistorialLectura[];
}



export interface ListarPagos {
  _id: string;
  apellidoMaterno: string;
  apellidoPaterno: string;
  codigoCliente: string;
  detallePago: DetallePagoLectura[];
  fecha: string;
  nombre: string;
  numeroPago: number;
  total: number;
  numeroMedidor: string
   ci: string
}
