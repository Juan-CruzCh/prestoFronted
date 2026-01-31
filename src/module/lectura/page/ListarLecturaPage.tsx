import { useEffect, useState } from "react";
import type { ListarLecturaMedidorI } from "../interface/lectura";
import { useNavigate } from "react-router";
import { eliminarLecturaService, listarLecturasService } from "../service/lecturaService";
import { confirmarEliminar } from "../../../core/utils/alertasUtils";




export const ListarLecturasPage = () => {
    const [listarLecturas, setListarLecturas] = useState<ListarLecturaMedidorI[]>([]);
    const [pagina, setPagina] = useState(0);
    const [fechaInicio, setFechaInicio] = useState<string>("");
    const [fechaFin, setFechaFin] = useState<string>("");
    const [totalPaginas, setTotalPaginas] = useState(0);

    const navigate = useNavigate();


    useEffect(() => {
        const hoy = new Date();
        hoy.setHours(hoy.getHours() - 4);
        const hoyStr = hoy.toISOString().split("T")[0];
        setFechaInicio(hoyStr);
        setFechaFin(hoyStr);

        listarLecturasRegistradas(hoyStr, hoyStr);
    }, []);

    const listarLecturasRegistradas = async (inicio = fechaInicio, fin = fechaFin) => {
        try {
            const data = await listarLecturasService(inicio, fin);
            setListarLecturas(data);
            setTotalPaginas(Math.ceil(data.length / 20));
        } catch (err) {
            console.error("Error al listar lecturas", err);
        }
    };

    const onPageChange = (pageIndex: number) => {
        setPagina(pageIndex);
        listarLecturasRegistradas(fechaInicio, fechaFin);
    };

    const eliminarLectura = async (lectura: ListarLecturaMedidorI) => {
        const confirmacion = await confirmarEliminar(lectura.numeroMedidor)
        if (!confirmacion) return;
        try {
            await eliminarLecturaService(lectura._id);

        } catch (err: any) {
            alert(err.response?.data?.mensaje || "Ocurrió un error al eliminar");
        }
    };

    return (
        <div className="overflow-x-auto border rounded-lg p-4">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                Lecturas de Medidores
            </h2>

            {/* Filtro de fechas */}
            <div className="flex gap-2 mb-4">
                <input
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-2 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                <input
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-2 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                <button
                    onClick={() => listarLecturasRegistradas(fechaInicio, fechaFin)}
                    className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    🔍 Buscar
                </button>
            </div>

            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Medidor</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Mes</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Lectura Anterior</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Lectura Actual</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Consumo</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Costo</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Estado</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white text-sm">
                    {listarLecturas.map((item) => (
                        <tr key={item._id}>
                            <td className="px-4 py-2">{item.numeroMedidor}</td>
                            <td className="px-4 py-2">{item.mes}-{item.gestion}</td>
                            <td className="px-4 py-2">{item.lecturaAnterior}</td>
                            <td className="px-4 py-2">{item.lecturaActual}</td>
                            <td className="px-4 py-2">{item.consumoTotal}</td>
                            <td className="px-4 py-2">bs {item.costoApagar}</td>
                            <td className="px-4 py-2">{item.estado}</td>
                            <td className="px-4 py-2 space-x-2">
                                <button
                                    onClick={() => eliminarLectura(item)}
                                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-xs"
                                >
                                    Eliminar
                                </button>
                                <button
                                    onClick={() => navigate(`/lectura/detalle/${item.idMedidor}/${item._id}`)}
                                    className="bg-green-700 text-white px-2 py-1 rounded hover:bg-green-800 text-xs"
                                >
                                    Recibo
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Paginación simple */}
            <div className="flex justify-end mt-4 gap-2">
                {Array.from({ length: totalPaginas }).map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => onPageChange(idx)}
                        className={`px-3 py-1 rounded ${pagina === idx ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                    >
                        {idx + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};
