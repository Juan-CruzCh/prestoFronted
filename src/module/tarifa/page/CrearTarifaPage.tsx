import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import type { FormularioRango, TarifaI } from "../interface/tarifa";
import { crearTarifa } from "../service/tarifaService";


export const CrearTarifaPage: React.FC = () => {
  const { handleSubmit, control, watch, reset, formState: { errors } } = useForm<FormularioRango>({
    defaultValues: {
      nombre: "",
      rango1: 0,
      rango2: 0,
      costo: 0,
      iva: 0
    }
  });

  const [rangos, setRangos] = useState<FormularioRango[]>([]);

  const agregarRango = (data: FormularioRango) => {
    setRangos(prev => [
      ...prev,
      {
        rango1: data.rango1,
        rango2: data.rango2,
        costo: data.costo,
        iva: data.iva
      }
    ]);
    // Limpiar campos de rango
    reset({ ...watch(), rango1: 0, rango2: 0, costo: 0, iva: 0 });
  };

  const eliminarRango = (index: number) => {
    setRangos(prev => prev.filter((_, i) => i !== index));
  };

  const guardarTarifa = async (data: FormularioRango) => {
    if (!data.nombre || rangos.length === 0) {
      alert("Nombre y al menos un rango son obligatorios");
      return;
    }

    const tarifa: TarifaI = {
      nombre: data.nombre.toUpperCase(),
      rango: rangos
    };

    try {
      const response = await crearTarifa(tarifa);
      console.log("Tarifa creada:", response.data);
      reset();
      setRangos([]);
    } catch (err) {
      console.error("Error al guardar tarifa", err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Crear Tarifa</h1>

      <form onSubmit={handleSubmit(agregarRango)} className="bg-white p-6 rounded-lg shadow space-y-6">
        {/* Nombre Tarifa */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Tarifa</label>
          <Controller
            name="nombre"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            )}
          />
          {errors.nombre && <small className="text-red-500">El nombre es obligatorio</small>}
        </div>

        {/* Agregar Rango */}
        <div className="border p-4 rounded-lg bg-gray-50 mb-4">
          <h2 className="text-lg font-semibold mb-3">Agregar Rango</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["rango1", "rango2", "costo", "iva"].map((campo) => (
              <div key={campo}>
                <label className="block text-sm font-medium">{campo === "costo" ? "Costo (Bs)" : campo === "iva" ? "IVA (%)" : campo.charAt(0).toUpperCase() + campo.slice(1)}</label>
                <Controller
                  name={campo as keyof FormularioRango}
                  control={control}
                  rules={{ required: true, min: 0 }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      step="any"
                      className="w-full px-2 py-1 border rounded"
                    />
                  )}
                />
                {errors[campo as keyof FormularioRango] && (
                  <small className="text-red-500">Este campo es obligatorio</small>
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Añadir Rango
          </button>
        </div>
      </form>

      {/* Tabla Rangos */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Rangos Agregados</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Rango 1</th>
                <th className="px-4 py-2 border">Rango 2</th>
                <th className="px-4 py-2 border">Costo</th>
                <th className="px-4 py-2 border">IVA (%)</th>
                <th className="px-4 py-2 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rangos.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 text-center">
                  <td className="px-4 py-2 border">{item.rango1}</td>
                  <td className="px-4 py-2 border">{item.rango2}</td>
                  <td className="px-4 py-2 border">{item.costo}</td>
                  <td className="px-4 py-2 border">{item.iva}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => eliminarRango(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Guardar Tarifa */}
      <button
        onClick={handleSubmit(guardarTarifa)}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-lg font-medium mt-4"
      >
        Guardar Tarifa
      </button>
    </div>
  );
};
