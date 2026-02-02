import React, { useState, useEffect } from 'react';

import { listarClientes as listarClientesService, eliminarCliente as eliminarClienteService } from '../service/clienteService';
import type { ListarClienteI } from '../interface/cliente';

import { confirmarEliminar } from '../../../core/utils/alertasUtils';



export function ListarCliente({ onClienteSeleccionado }: { onClienteSeleccionado: (cliente: ListarClienteI) => void; }) {
  const [codigo, setCodigo] = useState('');
  const [ci, setCi] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [pagina, setPagina] = useState(1);
  const [paginas, setPaginas] = useState(0);
  const [clientes, setClientes] = useState<ListarClienteI[]>([]);
  const [editarCliente, setEditarCliente] = useState<ListarClienteI | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const listarClientes = async () => {
    try {
      const response = await listarClientesService(
        codigo, ci, nombre, apellidoPaterno, apellidoMaterno, pagina
      );
      setPaginas(response.paginas);
      setClientes(response.data);
    } catch (err) {
      console.error('Error al listar clientes', err);
    }
  };

  useEffect(() => {
    listarClientes();
  }, [pagina]);

  const handlePageChange = (newPage: number) => {
    setPagina(newPage);
  };



  const handleEliminar = async (cliente: ListarClienteI) => {
    const confirmacion = await confirmarEliminar(cliente.nombre);
    if (!confirmacion) return;
    try {
      await eliminarClienteService(cliente._id);
      listarClientes();
    } catch {
      alert('Ocurrió un error al eliminar el cliente');
    }
  };

  const handleActualizar = (cliente: ListarClienteI) => {
    setEditarCliente(cliente);
    setMostrarModal(true);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3 text-gray-700">Clientes</h3>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Seleccionar</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Código Cliente
                <input
                  type="text"
                  placeholder="Buscar"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  onInput={listarClientes}
                  className="mt-1 w-full p-1 border border-gray-300 rounded text-sm"
                />
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                CI
                <input
                  type="text"
                  placeholder="Buscar"
                  value={ci}
                  onChange={(e) => setCi(e.target.value)}
                  onInput={listarClientes}
                  className="mt-1 w-full p-1 border border-gray-300 rounded text-sm"
                />
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Nombre
                <input
                  type="text"
                  placeholder="Buscar"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  onInput={listarClientes}
                  className="mt-1 w-full p-1 border border-gray-300 rounded text-sm"
                />
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Apellido Paterno
                <input
                  type="text"
                  placeholder="Buscar"
                  value={apellidoPaterno}
                  onChange={(e) => setApellidoPaterno(e.target.value)}
                  onInput={listarClientes}
                  className="mt-1 w-full p-1 border border-gray-300 rounded text-sm"
                />
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Apellido Materno
                <input
                  type="text"
                  placeholder="Buscar"
                  value={apellidoMaterno}
                  onChange={(e) => setApellidoMaterno(e.target.value)}
                  onInput={listarClientes}
                  className="mt-1 w-full p-1 border border-gray-300 rounded text-sm"
                />
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Celular</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">

            {clientes.map((item) => (
              <tr key={item._id}>
                <td className="px-4 py-2">
                  <input
                    type="radio"
                    onClick={() => onClienteSeleccionado(item)}
                    name="cliente"
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                </td>
                <td className="px-4 py-2">{item.codigo}</td>
                <td className="px-4 py-2">{item.ci}</td>
                <td className="px-4 py-2">{item.nombre}</td>
                <td className="px-4 py-2">{item.apellidoPaterno}</td>
                <td className="px-4 py-2">{item.apellidoMaterno}</td>
                <td className="px-4 py-2">{item.celular}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEliminar(item)}
                    className="bg-red-500 p-2 text-white rounded"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => handleActualizar(item)}
                    className="bg-green-500 p-2 text-white rounded"
                  >
                    Actualizar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación simple */}
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: paginas }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 border rounded ${pagina === i + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/*mostrarModal && editarCliente && (
        <EditarClienteModal
          cliente={editarCliente}
          onClose={() => setMostrarModal(false)}
          onActualizar={() => listarClientes()}
        />
      )*/}
    </div>
  );
};
