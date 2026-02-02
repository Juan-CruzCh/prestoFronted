import { create } from "zustand";
import { verificarLogin } from "../../module/autenticacion/service/autenticacionService";
import type { UsuarioPerfilI } from "../../module/usuario/interface/usuario";
interface AuthStore {
    usuario: UsuarioPerfilI | null;
    loading: boolean;
    isAutenticaicon: boolean;
    verificarAuth: () => Promise<void>;
}
export const useAuthStore = create<AuthStore>((set) => ({
    loading: false,
    usuario: {
        apellidoMaterno: '',
        apellidoPaterno: '',
        ci: '',
        direccion: '',
        nombre: '',
        rol: '',
        usuario: ''
    },
    isAutenticaicon: false,
    verificarAuth: async () => {
        try {
            const url = window.location.pathname
            console.log(url);
            if (url != '/') {
                const response = await verificarLogin()
                if (response) {
                    set({ usuario: response, isAutenticaicon: true })
                }
            }


        } catch (error) {
            set({ usuario: null, isAutenticaicon: false })
        }

    }

}))