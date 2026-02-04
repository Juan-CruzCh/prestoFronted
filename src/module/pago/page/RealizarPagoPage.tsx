import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { buscarMedidorClienteI } from "../interface/pago";
import { ListarCliente } from "../../cliente/components/ListarCliente";
import type { ListarClienteI } from "../../cliente/interface/cliente";
import { advertencia, confirmarPago, error } from "../../../core/utils/alertasUtils";
import { lecturasPendientesPago, realizarPago } from "../service/pagoService";

export const RealizarPagoPage = () => {
  const navigate = useNavigate();

  const [lecturasCliente, setLecturasCliente] = useState<buscarMedidorClienteI[]>([]);
  const [medidorSeleccionado, setMedidorSeleccionado] = useState("");
  const [lecturaSeleccionadas, setLecturaSeleccionadas] = useState<string[]>([]);
  const [meses, setMeses] = useState<string[]>([]);
  const [total, setTotal] = useState(0);

  const [cliente, setCliente] = useState<ListarClienteI>();

  const [idMedidor, setIdMedidor] = useState("");


  const btnMedidor = (numeroMedidor: string) => {
    if (medidorSeleccionado !== numeroMedidor) {
      setMedidorSeleccionado(numeroMedidor);
      setLecturaSeleccionadas([]);
      setMeses([]);
      setTotal(0);
    }
  };

  const btnLectura = (
    checked: boolean,
    id: string,
    monto: number,
    mes: string,
    idMedidor: string
  ) => {
    setIdMedidor(idMedidor);

    if (checked) {
      setTotal((prev) => prev + monto);
      setLecturaSeleccionadas((prev) => [...prev, id]);
      setMeses((prev) => [...prev, mes]);
    } else {
      setTotal((prev) => prev - monto);
      setLecturaSeleccionadas((prev) => prev.filter((l) => l !== id));
      setMeses((prev) => prev.filter((m) => m !== mes));
    }
  };


  useEffect(() => {
   
    if (cliente) {

      listarLecturasPendients(cliente._id)

    }
  }, [cliente])

  const listarLecturasPendients = async (id: string) => {
    try {
      const response = await lecturasPendientesPago(id)
    setLecturasCliente(response)
    } catch (error) { 
      console.log(error);
      
      
    }
  }

  const btnRealizarPago = async () => {
    if (!cliente) {
      advertencia("Seleccione un cliente");
      return;
    }
    if (lecturaSeleccionadas.length <= 0) {
      advertencia("Debe seleccionar al menos una lectura");
      return;
    }
    const clienteCompleto = `${cliente.nombre} ${cliente.apellidoPaterno} ${cliente.apellidoMaterno}`
    const confirmacion = await confirmarPago(clienteCompleto, meses, total);
    if (!confirmacion) return;

    try {
      const idPago = await realizarPago(
        lecturaSeleccionadas,
        cliente._id,
        idMedidor
      );
      navigate(`/pago/detalle/${idPago}`);
    } catch {
      error("Ocurrió un error");
    }
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
         Realizar Pago
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* CLIENTES */}
        <div className="lg:col-span-3">
          
            
              <ListarCliente onClienteSeleccionado={setCliente} />
           
         
        </div>

        {/* MEDIDORES */}
        <div className="lg:col-span-2 space-y-6">

          {lecturasCliente.map((item) => (
            <div
              key={item._id}
              className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition opacity-90"
            >
              {/* MEDIDOR */}
              <div className="flex items-center justify-between mb-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="medidor"
                    className="h-5 w-5 text-blue-600"
                    checked={medidorSeleccionado === item.numeroMedidor}
                    onChange={() => btnMedidor(item.numeroMedidor)}
                  />
                  <span className="text-xl font-semibold text-gray-800">
                    Medidor {item.numeroMedidor}
                  </span>
                </label>

                <span className="px-3 py-1 rounded-full text-xs font-semibold">
                  {item.estado}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                {item.direccion}
              </p>

              {/* LECTURAS */}
              <table className="w-full text-sm border rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th>Mes</th>
                    <th>Anterior</th>
                    <th>Actual</th>
                    <th>Consumo</th>
                    <th>Costo</th>
                    <th>✔</th>
                  </tr>
                </thead>
                <tbody>
                  {item.lecturas.map((l) => (
                    <tr key={l._id} className="hover:bg-gray-50">
                      <td>{l.mes}</td>
                      <td className="text-center">{l.lecturaAnterior}</td>
                      <td className="text-center">{l.lecturaActual}</td>
                      <td className="text-center">{l.consumoTotal}</td>
                      <td className="text-center font-medium">
                        {l.costoApagar} Bs
                      </td>
                      <td className="text-center">
                        <input
                          type="checkbox"
                          disabled={medidorSeleccionado !== item.numeroMedidor}
                          checked={lecturaSeleccionadas.includes(l._id)}
                          onChange={(e) =>
                            btnLectura(
                              e.target.checked,
                              l._id,
                              l.costoApagar,
                              l.mes,
                              item._id
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          {/* TOTAL */}
          <div className="flex justify-end">
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-6 py-3 text-blue-700 text-lg font-semibold">
              Total a pagar: Bs {total}
            </div>
          </div>

          {/* BOTÓN */}
          <div className="flex justify-end">
            <button
              onClick={btnRealizarPago}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
            >
              Realizar Pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
