export interface FormularioMedidorI {
    descripcion: string
    cliente: string
    tarifa: string
    direccion: string
    fechaInstalacion: Date
    numeroMedidor: string
}


export interface ListarMedidorClientesI {
    _id: string;
    numeroMedidor: string;
    estado: string;
    direccion: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    codigo: string;
    tarifa: string;
    ci: string;
    lecturasPendientes: number
}

export interface MedidorClienteI {
  _id: string;               
  idCliente: string;         
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  codigoCliente: string;
  direccion: string;
  fechaInstalacion: string;  
  numeroMedidor: string;
  tarifa: string; 
  descripcion:string   
  ci:string       
}
