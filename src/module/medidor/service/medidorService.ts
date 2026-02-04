import type { AxiosResponse } from 'axios';
import { instance } from '../../../core/config/instanceAxios';
import type { ResultadoHttp } from '../../../core/interface/ResultadoHttp';
import type {
  FormularioMedidorI,
  ListarMedidorClientesI,
  MedidorClienteI
} from '../interface/medidor';

export async function crearMedidor(data: FormularioMedidorI): Promise<AxiosResponse> {
  const response = await instance.post<AxiosResponse>('medidor', data);
  return response;
}


export async function editarMedidor(data: FormularioMedidorI, idMedidor: string): Promise<any> {
  const response = await instance.patch<any>(`medidor/${idMedidor}`, data);
  return response.data;
}


export async function listarMedidorClienteService(
  codigo: string,
  ci: string,
  nombre: string,
  apellidoPaterno: string,
  apellidoMaterno: string,
  numeroMedidor: string,
  tarifa: string,
  estado: string,
  estadoMedidor: string
): Promise<ResultadoHttp<ListarMedidorClientesI>> {
  const response = await instance.get<ResultadoHttp<ListarMedidorClientesI>>('medidor', {
    params: {
      codigo,
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      numeroMedidor,
      ci,
      tarifa,
      estado,
      estadoMedidor
    }
  });
  return response.data;
}


export async function eliminarMedidor(id: string): Promise<AxiosResponse> {
  const response = await instance.delete<any>(`medidor/${id}`);
  return response;
}


export async function obtenerMedidorPorId(id: string): Promise<MedidorClienteI[]> {
  const response = await instance.get<MedidorClienteI[]>(`medidor/${id}`);
  return response.data;
}
