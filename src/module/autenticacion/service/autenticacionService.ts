import { instance } from '../../../core/config/instanceAxios';
import type { UpdateUsuarioI } from '../../usuario/interface/usuario';


export async function login(usuarioInput: string, password: string): Promise<any> {
    const response = await instance.post('autenticacion', { usuario: usuarioInput, password });
    return response.data;
}


export async function verificarLogin(): Promise<any> {
    const response = await instance.get<UpdateUsuarioI>('verificar/autenticacion');
    return response.data;

}


export async function cerrarSession(): Promise<boolean> {
    const response = await instance.get('cerrarSession');
    return response.data;

}

