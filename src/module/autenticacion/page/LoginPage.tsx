import { useForm, } from "react-hook-form";
import { login } from "../service/autenticacionService";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";

interface LoginFormInputs {
  usuario: string;
  password: string;
}

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>();
 const navidate =  useNavigate()

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await login(data.usuario, data.password)
      console.log(response);
      
      if (response.token) {
        navidate('/dashboard')
      }
    } catch (error) {
      const e = error as AxiosError<any>
      console.log(e.status);

      console.log('e', e.response?.data.mensaje);

    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm border">
        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
          Sistema de Agua - Acceso
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Usuario */}
          <div className="mb-4">
            <label className="block text-blue-600 text-sm mb-2">Usuario</label>
            <input
              type="text"
              placeholder="Nombre de usuario"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("usuario", { required: "El usuario es obligatorio" })}
            />
            {errors.usuario && (
              <p className="text-red-500 text-sm mt-1">{errors.usuario.message}</p>
            )}
          </div>

          {/* Contraseña */}
          <div className="mb-6">
            <label className="block text-blue-600 text-sm mb-2">Contraseña</label>
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("password", { required: "La contraseña es obligatoria" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 font-medium"
          >
            Acceder
          </button>
        </form>
      </div>
    </div>
  );
};
