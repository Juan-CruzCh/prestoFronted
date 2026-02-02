import { useEffect, useState } from "react";

import axios from "axios";
import type { ListarMedidorClientesI } from "../interface/medidor";
import type { ListarTarifasI } from "../../tarifa/interface/tarifa";
import { useNavigate } from "react-router";
import { listarTarifas } from "../../tarifa/service/tarifaService";
import { listarMedidorClienteService } from "../service/medidorService";



export const ListarMedidorPage = () => {
  const [listarMedidorClientes, setListarMedidorClientes] = useState<ListarMedidorClientesI[]>([]);
  const [tarifas, setTarifas] = useState<ListarTarifasI[]>([]);
  const [codigo, setCodigo] = useState("");
  const [ci, setCi] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [direccion, setDireccion] = useState("");
  const [numeroMedidor, setNumeroMedidor] = useState("");
  const [tarifa, setTarifa] = useState("");
  const [estado, setEstado] = useState("");
  const [pagina, setPagina] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    listarMedidorCliente();
    tarifasListar();
  }, [pagina]);

  const listarMedidorCliente = async () => {
    try {
      const  data  = await listarMedidorClienteService(codigo, ci, nombre, apellidoPaterno, apellidoMaterno, numeroMedidor, tarifa, estado , "")
      setListarMedidorClientes(data.data);

    } catch (err) {
    
      console.error("Error al listar medidores", err);
    }
  };

  const tarifasListar = async () => {
    try {
      const  data  = await listarTarifas();
      setTarifas(data);
    } catch (err) {
      console.error("Error al listar tarifas", err);
    }
  };

  const btnBuscar = () => {
    setPagina(1);
    listarMedidorCliente();
  };

  const eliminar = async (medidor: ListarMedidorClientesI) => {
    const confirmacion = window.confirm(`¿Deseas eliminar el medidor ${medidor.numeroMedidor}?`);
    if (!confirmacion) return;

    try {
      await axios.delete(`/api/medidor/${medidor._id}`);
      listarMedidorCliente();
    } catch (err) {
      console.error("Ocurrió un error al eliminar el medidor", err);
    }
  };

  return (
    <div className="w-full h-full max-w-full mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-12 order-1">
          <div className="overflow-x-auto rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th>
                    <input value={codigo} onChange={e => setCodigo(e.target.value)} type="text" placeholder="Código" className="w-full px-2 py-1 border rounded" />
                  </th>
                  <th>
                    <input value={ci} onChange={e => setCi(e.target.value)} type="text" placeholder="CI" className="w-full px-2 py-1 border rounded" />
                  </th>
                  <th>
                    <input value={nombre} onChange={e => setNombre(e.target.value)} type="text" placeholder="Nombre" className="w-full px-2 py-1 border rounded" />
                  </th>
                  <th>
                    <input value={apellidoPaterno} onChange={e => setApellidoPaterno(e.target.value)} type="text" placeholder="Apellido Paterno" className="w-full px-2 py-1 border rounded" />
                  </th>
                  <th>
                    <input value={apellidoMaterno} onChange={e => setApellidoMaterno(e.target.value)} type="text" placeholder="Apellido Materno" className="w-full px-2 py-1 border rounded" />
                  </th>
                  <th>
                    <input value={direccion} onChange={e => setDireccion(e.target.value)} type="text" placeholder="Dirección" className="w-full px-2 py-1 border rounded" />
                  </th>
                  <th>
                    <input value={numeroMedidor} onChange={e => setNumeroMedidor(e.target.value)} type="text" placeholder="N° Medidor" className="w-full px-2 py-1 border rounded" />
                  </th>
                  <th>
                    <select value={tarifa} onChange={e => setTarifa(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Todos</option>
                      {tarifas.map(item => (
                        <option key={item._id} value={item._id}>{item.nombre}</option>
                      ))}
                    </select>
                  </th>
                  <th>
                    <select value={estado} onChange={e => setEstado(e.target.value)} className="w-full rounded-lg border border-gray-300 px-2 py-1">
                      <option value="">Todos</option>
                      <option value="ACTIVO">ACTIVO</option>
                      <option value="INACTIVO">INACTIVO</option>
                      <option value="MANTENIMIENTO">MANTENIMIENTO</option>
                      <option value="EN_CORTE">EN_CORTE</option>
                    </select>
                  </th>
                  <th>
                    <button onClick={btnBuscar} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Buscar</button>
                  </th>
                </tr>
                <tr>
                  {["Código Cliente","CI","Nombre","Apellido Paterno","Apellido Materno","Dirección","Número de Medidor","Tarifa","Estado","Acción"].map((header, i) => (
                    <th key={i} className="px-4 py-2 text-left font-medium text-gray-700">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {listarMedidorClientes.map(item => (
                  <tr key={item._id}>
                    <td className="px-4 py-2">{item.codigo}</td>
                    <td className="px-4 py-2">{item.ci}</td>
                    <td className="px-4 py-2">{item.nombre}</td>
                    <td className="px-4 py-2">{item.apellidoPaterno}</td>
                    <td className="px-4 py-2">{item.apellidoMaterno}</td>
                    <td className="px-4 py-2">{item.direccion}</td>
                    <td className="px-4 py-2">{item.numeroMedidor}</td>
                    <td className="px-4 py-2">{item.tarifa}</td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">{item.estado}</span>
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <button onClick={() => eliminar(item)} className="bg-red-600 text-white px-3 py-1 rounded text-xs">Eliminar</button>
                      <button onClick={() => navigate(`/medidor/editar/${item._id}`)} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs">Editar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
           
          </div>
        </div>
      </div>
    </div>
  );
};
