import React, { useEffect, useState } from "react";

import axios from "axios";
import { data, useNavigate } from "react-router";
import { eliminarRangoService, eliminarTarifaService, listarTarifasRangos } from "../service/tarifaService";
import { confirmarEliminar } from "../../../core/utils/alertasUtils";

interface TarifaRango {
  _id: string;
  rango1: number;
  rango2: number;
  costo: number;
  iva: number;
}

interface ListarTarifasRangoI {
  _id: string;
  nombre: string;
  rango: TarifaRango[];
}

export const ListarTarifaPage: React.FC = () => {
  const [tarifas, setTarifas] = useState<ListarTarifasRangoI[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    listarTarifas();
  }, []);

  const listarTarifas = async () => {
    try {
      const data  = await listarTarifasRangos();
      setTarifas(data);
    } catch (err) {
      console.error("Error al listar tarifas", err);
    }
  };

  const eliminarTarifa = async (tarifa: ListarTarifasRangoI) => {
    const confirmacion = confirmarEliminar(tarifa.nombre)
    if(!confirmacion) return

    try {
      const { data } = await eliminarTarifaService(tarifa._id);
      if (data.MatchedCount > 0) {
       
      }
    } catch (err) {
      alert("Ocurrió un error al eliminar la tarifa");
      console.error(err);
    }
  };

  const eliminarRango = async (rango: TarifaRango) => {
     const confirmacion = confirmarEliminar(`${rango.rango1} - ${rango.rango2}`)
    if(!confirmacion) return

    try {
      const { data } = await eliminarRangoService(rango._id);
      if (data.MatchedCount > 0) {
        listarTarifas();
      }
    } catch (err) {
      alert("Ocurrió un error al eliminar el rango");
      console.error(err);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Listado de Tarifas</h1>
        <button
          onClick={() => navigate("/tarifa/crear")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Crear Tarifa
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 border text-left">Nombre</th>
              <th className="px-4 py-3 border text-left">Rangos</th>
              <th className="px-4 py-3 border text-left">Acción</th>
            </tr>
          </thead>
          <tbody>
            {tarifas.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 border font-medium">{item.nombre}</td>
                <td className="px-4 py-3 border">
                  <div className="flex gap-3 overflow-x-auto py-2">
                    {item.rango.map((r) => (
                      <div
                        key={r._id}
                        className="min-w-[180px] p-3 bg-blue-50 border border-blue-200 rounded-lg flex flex-col justify-between"
                      >
                        <p className="text-sm">
                          <span className="font-semibold">Rango:</span> {r.rango1} - {r.rango2}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Costo:</span> Bs {r.costo}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">IVA:</span> {r.iva}%
                        </p>
                        <div className="mt-2 flex flex-col gap-1">
                          <button
                            onClick={() => navigate(`/tarifa/editar-rango/${r._id}`)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => eliminarRango(r)}
                            className="bg-red-600 text-white px-3 py-1 rounded-md"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 border font-medium flex flex-col gap-2">
                  <button
                    onClick={() => navigate(`/tarifa/editar/${item._id}`)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarTarifa(item)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md"
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
  );
};
