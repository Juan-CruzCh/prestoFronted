import { create } from "zustand";
import { verificarLogin } from "../../module/autenticacion/service/autenticacionService";
import type { UsuarioPerfilI } from "../../module/usuario/interface/usuario";
interface AuthStore {
    user: UsuarioPerfilI | null;
    loading: boolean;
    isAutenticaicon: boolean;
    verificarAuth: () => Promise<void>;
}
export const useAuthStore = create<AuthStore>((set) => ({
    loading: false,
    user: {
        apellidoMaterno: '',
        apellidoPaterno: '',
        celular: '',
        ci: '',
        direccion: '',
        nombre: '',
        rol: '',
        usuario: ''
    },
    isAutenticaicon: false,
    verificarAuth: async () => {
        try {
            console.log('verificando login');

            const response = await verificarLogin()
            if (response) {
                set({ user: response, isAutenticaicon: true })
            }

        } catch (error) {
            console.log(error);
            
            set({ user: null, isAutenticaicon: false })
        }

    }

}))