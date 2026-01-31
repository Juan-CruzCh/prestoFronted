import { instance } from '../../../core/config/instanceAxios';
import type { ResultadoHttp } from '../../../core/interface/ResultadoHttp';
import type {
  FormularioMedidorI,
  ListarMedidorClientesI,
  MedidorClienteI
} from '../interface/medidor';

export async function crearMedidor(data: FormularioMedidorI): Promise<any> {
  const response = await instance.post<any>('medidor', data);
  return response.data;
}


export async function editarMedidor(data: FormularioMedidorI, idMedidor: string): Promise<any> {
  const response = await instance.patch<any>(`medidor/${idMedidor}`, data);
  return response.data;
}


export async function listarMedidorCliente(
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


export async function eliminarMedidor(id: string): Promise<any> {
  const response = await instance.delete<any>(`medidor/${id}`);
  return response.data;
}


export async function obtenerMedidorPorId(id: string): Promise<MedidorClienteI[]> {
  const response = await instance.get<MedidorClienteI[]>(`medidor/${id}`);
  return response.data;
}
