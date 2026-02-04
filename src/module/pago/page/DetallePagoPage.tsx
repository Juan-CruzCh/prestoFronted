import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import type { PagoDetalleResponse } from "../interface/pago";
import { numeroATextoBolivianos } from "../../../core/utils/numeroTexto";
import { detallePago } from "../service/pagoService";
//import '../style/detallePago.css'

import logEscudo from "../../../assets/logo/escudo.png";
import logoPresto from "../../../assets/logo/logo.png";

export const DetallePagoPage = () => {
    const { id } = useParams();
    const reciboRef = useRef<HTMLDivElement>(null);
    const [detalle, setDetalle] = useState<PagoDetalleResponse>();
    const [totalPagado, setTotalPagado] = useState(0);
    const [totalTexto, setTotalTexto] = useState("");

    useEffect(() => {


        cargarDetalle();
    }, [id]);

    const cargarDetalle = async () => {
        if (id) {
            const data = await detallePago(id);
            const total = data.detallePago.detallePago.reduce(
                (acc, i) => acc + i.costoPagado,
                0
            );
            setDetalle(data);
            setTotalPagado(total);
            setTotalTexto(numeroATextoBolivianos(total));
        }
    };

    const imprimirRecibo = () => {
        if (!reciboRef.current) return;

        const printContents = reciboRef.current.innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };


    return (
        <>
            {
                detalle && (
                    <div className="flex justify-center py-6 bg-gray-100 min-h-screen">
                        <div
                            ref={reciboRef}
                            className="bg-white text-black p-4"
                            style={{ width: "180mm", minHeight: "250mm", fontSize: "12px" }}
                        >


                            <div className="flex items-center justify-between mb-4">
                                <img src={logoPresto} className="w-36 h-24 object-contain" />

                                <div className="text-center flex-1 border-b-4 border-black pb-1">
                                    <h1 className="text-2xl font-bold tracking-widest mb-1">
                                        RECIBO DE PAGO
                                    </h1>
                                    <p className="text-sm tracking-wide">
                                        Servicio de Agua Potable
                                    </p>
                                </div>

                                <img src={logEscudo} className="w-28 h-20 object-contain" />
                            </div>

                            {/* Nº RECIBO */}
                            <div className="text-right mb-4 text-xs font-bold">
                                Nº Recibo: {detalle.detallePago.numeroPago}
                            </div>

                            {/* INFO CLIENTE */}
                            <div className="mb-4 grid grid-cols-3 gap-2 text-xs">
                                <div>
                                    <p className="uppercase text-gray-600">Cliente</p>
                                    <p className="font-bold">
                                        {detalle.detallePago.nombre}{" "}
                                        {detalle.detallePago.apellidoPaterno}{" "}
                                        {detalle.detallePago.apellidoMaterno}
                                    </p>
                                </div>

                                <div>
                                    <p className="uppercase text-gray-600">Dirección</p>
                                    <p>{detalle.detallePago.direccion}</p>
                                </div>

                                <div>
                                    <p className="uppercase text-gray-600">Medidor / Socio</p>
                                    <p className="font-bold">
                                        {detalle.detallePago.numeroMedidor} /{" "}
                                        {detalle.detallePago.codigoCliente}
                                    </p>
                                    <p className="uppercase text-gray-600">Fecha Emisión</p>
                                    <p className="font-bold">
                                        {new Date(detalle.detallePago.fecha).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="h-0.5 bg-black mb-4"></div>

                            {/* DETALLE DE PAGO */}
                            <table className="w-full text-xs border-collapse mb-4">
                                <thead>
                                    <tr className="bg-black text-white">
                                        <th>Mes</th>
                                        <th>Lect. Anterior</th>
                                        <th>Lect. Actual</th>
                                        <th>Consumo m³</th>
                                        <th className="text-right">Importe Bs</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detalle.detallePago.detallePago.map((d, i) => (
                                        <tr key={i} className="border-b">
                                            <td>{d.mes}</td>
                                            <td className="text-center">{d.lecturaAnterior}</td>
                                            <td className="text-center">{d.lecturaActual}</td>
                                            <td className="text-center font-semibold">{d.consumoTotal}</td>
                                            <td className="text-right font-semibold">
                                                {d.costoPagado}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="font-bold bg-gray-100">
                                        <td colSpan={4}>Total Pagado</td>
                                        <td className="text-right">{totalPagado} Bs</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5} className="italic">
                                            Son: {totalTexto}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>

                            {/* HISTORIAL */}
                            <table className="w-full text-xs">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th>Mes</th>
                                        <th>m³</th>
                                        <th>Bs</th>
                                        <th>Estado</th>
                                        <th>F. Pago</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detalle.historial.map((h, i) => (
                                        <tr key={i}>
                                            <td>{h.mes}</td>
                                            <td className="text-center">{h.consumoTotal}</td>
                                            <td className="text-right">{h.costoApagar}</td>
                                            <td className="text-center font-bold">{h.estado}</td>
                                            <td className="text-center">
                                                {new Date(h.fechaPago).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* FIRMAS */}
                            <div className="grid grid-cols-2 gap-8 mt-8 text-xs">
                                <div className="text-center">
                                    <div className="border-t-2 border-black w-36 mx-auto mb-1"></div>
                                    Secretario Hacienda
                                </div>
                                <div className="text-center">
                                    <div className="border-t-2 border-black w-36 mx-auto mb-1"></div>
                                    Recibí Conforme
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* BOTÓN IMPRIMIR */}
            <div className="text-center my-6">
                <button
                    onClick={imprimirRecibo}
                    className="bg-black text-white px-10 py-4 rounded-lg font-bold uppercase shadow-lg"
                >
                    Imprimir Recibo
                </button>
            </div>
        </>
    );
};
