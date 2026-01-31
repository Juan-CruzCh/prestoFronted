import { instance } from '../../../core/config/instanceAxios';
import type {UsuarioPerfilI } from '../../usuario/interface/usuario';


export async function login(usuarioInput: string, password: string): Promise<{ token: String }> {
    const response = await instance.post('autenticacion', { usuario: usuarioInput, password });
    return response.data;
}


export async function verificarLogin(): Promise<UsuarioPerfilI> {
    const response = await instance.get<UsuarioPerfilI>('verificar/autenticacion');
    return response.data;

}


export async function cerrarSession(): Promise<boolean> {
    const response = await instance.get('cerrarSession');
    return response.data;

}

