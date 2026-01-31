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
  console.log(data);
  const response = await instance.post(`lectura`, data);
  return response.data;
}


export async function listarLecturas(fechaInicio: string, fechaFin: string): Promise<ListarLecturaMedidorI[]> {
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

export async function eliminarLectura(id: string): Promise<any> {
  const response = await instance.delete<any>(`lectura/${id}`);
  return response.data;
}
