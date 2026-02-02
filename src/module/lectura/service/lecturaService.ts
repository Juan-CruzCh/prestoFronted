import { instance } from '../../../core/config/instanceAxios';
import type {
  BuscarMedidorClienteI,
  DetalleLecturasResponse,
  FormularioLecturaI,
  ListarLecturaMedidorI
} from '../interface/lectura';

export async function buscarMedidorCliente(numeroMedidor: string): Promise<BuscarMedidorClienteI> {
  const response = await instance.get<BuscarMedidorClienteI>(`lectura/medidor/${numeroMedidor}`);
  return response.data;
}


export async function registrarLectura(data: FormularioLecturaI): Promise<any> {
  const response = await instance.post(`lectura`, data);
  return response.data;
}


export async function listarLecturasService(fechaInicio: string, fechaFin: string): Promise<ListarLecturaMedidorI[]> {
  console.log(fechaInicio, fechaFin);
  
  const response = await instance.post<ListarLecturaMedidorI[]>(`lectura/listar`, {
    fechaInicio,
    fechaFin
  });
  return response.data;
}


export async function detalleLectura(medidor: string, lectura: string): Promise<DetalleLecturasResponse> {
  const response = await instance.get<DetalleLecturasResponse>(`lectura/detalle/${medidor}/${lectura}`);
  return response.data;
}

export async function eliminarLecturaService(id: string): Promise<any> {
  const response = await instance.delete<any>(`lectura/${id}`);
  return response.data;
}
