import { instance } from '../../../core/config/instanceAxios';
import type { ResultadoHttp } from '../../../core/interface/ResultadoHttp';
import type { buscarMedidorClienteI, PagoDetalleResponse, ListarPagos } from '../interface/pago';


export async function buscarMedidorCliente(idCliente: string): Promise<buscarMedidorClienteI[]> {
  const response = await instance.get<buscarMedidorClienteI[]>(`lectura/medidor/cliente/${idCliente}`);
  return response.data;
}


export async function realizarPago(
  lecturas: string[],
  cliente: string,
  medidor: string
): Promise<any> {
  const payload = {
    cliente,
    medidor,
    lecturas: lecturas.map((item) => ({ lectura: item }))
  };
  const response = await instance.post('pago', payload);
  return response.data;
}


export async function detallePago(pago: string): Promise<PagoDetalleResponse> {
  const response = await instance.get<PagoDetalleResponse>(`pago/detalle/${pago}`);
  return response.data;
}


export async function listarPagos(
  codigoCliente: string,
  ci: string,
  nombre: string,
  apellidoMaterno: string,
  apellidoPaterno: string,
  numeroMedidor: string,
  fechaInicio: string,
  fechaFin: string
): Promise<ResultadoHttp<ListarPagos>> {
  const response = await instance.get<ResultadoHttp<ListarPagos>>('pago', {
    params: {
      codigoCliente,
      ci,
      nombre,
      apellidoMaterno,
      apellidoPaterno,
      numeroMedidor,
      fechaInicio,
      fechaFin
    }
  });
  return response.data;
}
