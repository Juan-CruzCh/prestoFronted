import type { AxiosResponse } from "axios";
import { instance } from "../../../core/config/instanceAxios";
import type { ResultadoHttp } from "../../../core/interface/ResultadoHttp";
import type { CrearClienteI, ListarClienteI } from "../interface/cliente";


export async function listarClientes(
  codigo: string,
  ci: string,
  nombre: string,
  apellidoPaterno: string,
  apellidoMaterno: string,
  celular:string,
  pagina: number
): Promise<ResultadoHttp<ListarClienteI>> {
  const response = await instance.get<ResultadoHttp<ListarClienteI>>('cliente', {
    params: { codigo, ci, nombre, apellidoPaterno, apellidoMaterno, pagina, celular },
  });
  return response.data;
}

export async function crearCliente(data: CrearClienteI): Promise<ListarClienteI> {
  const response = await instance.post<ListarClienteI>('cliente', data);
  return response.data;
}


export async function editarCliente(data: CrearClienteI, id: string): Promise<AxiosResponse> {
  const response = await instance.patch<ListarClienteI>(`cliente/${id}`, data);
  return response;
}

export async function eliminarCliente(id: string): Promise<AxiosResponse> {
  const response = await instance.delete<ListarClienteI>(`cliente/${id}`);
  return response;
}
