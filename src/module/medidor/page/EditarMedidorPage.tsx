import { useEffect, useState } from "react";
import { useForm,  } from "react-hook-form";
import { useParams } from "react-router";
import type { ListarTarifasI } from "../../tarifa/interface/tarifa";
import type { FormularioMedidorI, MedidorClienteI } from "../interface/medidor";
import { obtenerMedidorPorId } from "../service/medidorService";
import { listarTarifas } from "../../tarifa/service/tarifaService";



export const EditarMedidorPage = () => {
  const { id } = useParams(); // id del medidor
  const [cliente, setCliente] = useState<MedidorClienteI>();
  const [tarifas, setTarifas] = useState<ListarTarifasI[]>([]);

  const { register, handleSubmit,  setValue, formState: { errors } } = useForm<FormularioMedidorI>({
    defaultValues: {
      cliente: "",
      numeroMedidor: "",
      descripcion: "",
      direccion: "",
      fechaInstalacion: new Date(),
      tarifa: "",
    }
  });

  // Cargar tarifas y medidor
  useEffect(() => {
    listarTodasLasTarifas();
    if (id) obtenerMedidor(id);
  }, [id]);

  const listarTodasLasTarifas = async () => {
    try {
      const  data  = await listarTarifas()
      setTarifas(data);
    } catch (err) {
      console.error("Error al listar tarifas", err);
    }
  };

  const obtenerMedidor = async (id: string) => {
    try {
      const  data  = await obtenerMedidorPorId(id)
      
      const medidor = data[0];

      setCliente({
        _id: medidor.idCliente,
        codigoCliente: medidor.codigoCliente,
        ci: medidor.ci,
        nombre: medidor.nombre,
        apellidoPaterno: medidor.apellidoPaterno,
        apellidoMaterno: medidor.apellidoMaterno,
        descripcion:medidor.descripcion,
        direccion:medidor.direccion,
        fechaInstalacion:medidor.fechaInstalacion,
        idCliente:medidor.idCliente,
        numeroMedidor:medidor.numeroMedidor,
        tarifa:medidor.tarifa
      });


      setValue("cliente", medidor.idCliente);
      setValue("numeroMedidor", medidor.numeroMedidor);
      setValue("descripcion", medidor.descripcion);
      setValue("direccion", medidor.direccion);
      setValue("fechaInstalacion", new Date(medidor.fechaInstalacion)); // formato yyyy-mm-dd
      setValue("tarifa", medidor.tarifa);

    } catch (err) {
      console.error("Error al obtener medidor", err);
    }
  };

  const onSubmit = async (data: FormularioMedidorI) => {
    try {
      if (cliente) data.cliente = cliente._id;
   
      alert("Medidor editado correctamente");
    } catch (err) {
      console.error("Error al editar medidor", err);
    }
  };

 
  return (
    <div className="w-full p-4 bg-gray-50 min-h-screen">
      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-4">

        <div className="col-span-8">
          {/* Aquí colocarías tus componentes de selección/creación de cliente */}
          {/* Ejemplo: <CrearClienteModal onClienteSeleccionado={seleccionarCliente} /> */}
          {/* <ListarCliente onClienteSeleccionado={seleccionarCliente} /> */}
        </div>

        <div className="md:col-span-4 order-2 md:order-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Editar Medidor</h2>

            {/* Datos del Cliente */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Datos del Cliente
              </h3>
              {cliente ? (
                <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4 text-sm">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Código</p>
                      <p className="font-semibold text-gray-800">{cliente.codigoCliente}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">CI</p>
                      <p className="font-semibold text-gray-800">{cliente.ci}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Nombre</p>
                      <p className="font-semibold text-gray-800">{cliente.nombre}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Apellido Paterno</p>
                      <p className="font-semibold text-gray-800">{cliente.apellidoPaterno}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Apellido Materno</p>
                      <p className="font-semibold text-gray-800">{cliente.apellidoMaterno}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p>No hay cliente seleccionado</p>
              )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              {/* Número de Medidor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número de Medidor *</label>
                <input
                  type="text"
                  {...register("numeroMedidor", { required: "El número de medidor es obligatorio" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.numeroMedidor && <p className="text-red-500 text-sm mt-1">{errors.numeroMedidor.message}</p>}
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <input
                  type="text"
                  {...register("descripcion")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Tarifa */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tarifa *</label>
                <select
                  {...register("tarifa", { required: "La tarifa es obligatoria" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccione una tarifa</option>
                  {tarifas.map(t => (
                    <option key={t._id} value={t._id}>{t.nombre}</option>
                  ))}
                </select>
                {errors.tarifa && <p className="text-red-500 text-sm mt-1">{errors.tarifa.message}</p>}
              </div>

              {/* Dirección */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección *</label>
                <input
                  type="text"
                  {...register("direccion", { required: "La dirección es obligatoria" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.direccion && <p className="text-red-500 text-sm mt-1">{errors.direccion.message}</p>}
              </div>

              {/* Fecha de Instalación */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Instalación *</label>
                <input
                  type="date"
                  {...register("fechaInstalacion", { required: "La fecha de instalación es obligatoria" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.fechaInstalacion && <p className="text-red-500 text-sm mt-1">{errors.fechaInstalacion.message}</p>}
              </div>

              <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 font-medium">
                Guardar
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};
