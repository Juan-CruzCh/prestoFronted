import { instance } from '../../../core/config/instanceAxios';
import type { UsuarioCrearI, UsuarioListarI, UpdateUsuarioI } from '../interface/usuario';

export async function listarUsuarios(): Promise<UsuarioListarI[]> {
  const response = await instance.get<UsuarioListarI[]>('usuario');
  return response.data;
}
export async function crearUsuario(data: UsuarioCrearI): Promise<any> {
  const response = await instance.post('usuario', data);
  return response.data;
}


export async function eliminarUsuario(id: string): Promise<any> {
  const response = await instance.delete<any>(`usuario/${id}`);
  return response.data;
}

export async function actualizarUsuario(id: string, data: UpdateUsuarioI): Promise<any> {
  const response = await instance.patch<any>(`usuario/${id}`, data);
  return response.data;
}
