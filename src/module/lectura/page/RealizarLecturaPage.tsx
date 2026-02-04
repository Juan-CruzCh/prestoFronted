import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import type { BuscarMedidorClienteI, FormularioLecturaI } from "../interface/lectura";
import { buscarMedidorCliente, registrarLectura } from "../service/lecturaService";



export const RealizarLecturaPage = () => {
    const navigate = useNavigate();

    const [numeroMedidor, setNumeroMedidor] = useState("");
    const [lecturaCliente, setLecturaCliente] = useState<BuscarMedidorClienteI>();
    const [error, setError] = useState("");
    const [mes, setMes] = useState("");
    const [gestion, setGestion] = useState("");
    const [gestiones, setGestiones] = useState<number[]>([]);

    const mesesAno = [
        "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
        "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
    ];


    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<FormularioLecturaI>({
        defaultValues: {
            lecturaAnterior: 0,
            lecturaActual: 0,
        }
    });


    useEffect(() => {
        const date = new Date();
        setMes(mesesAno[date.getMonth()]);
        setGestion(date.getFullYear().toString());

        setGestiones([
            date.getFullYear(),
            date.getFullYear() - 1,
            date.getFullYear() - 2,
        ]);
    }, []);


    const buscarMedidor = async () => {
        try {
            setError("");
            const response = await buscarMedidorCliente(numeroMedidor);
            if (response) {
                setLecturaCliente(response);
                setValue("lecturaAnterior", response.lecturaActual || 0);
            }
        } catch (err: any) {
            setError(err?.response?.data?.error || "Error al buscar medidor");
        }
    };


    const onSubmit = async (form: FormularioLecturaI) => {

        if (lecturaCliente && lecturaCliente.medidor) {
            const data = {
                gestion: Number(gestion),
                medidor: lecturaCliente.medidor,
                lecturaActual: Number(form.lecturaActual),
                lecturaAnterior: Number(form.lecturaAnterior),
                mes,
            };

            try {
                const response = await registrarLectura(data);
                if (response) {
                    navigate(`/lectura/detalle/${response.medidor}/${response.lectura}`);
                }
            } catch (err: any) {
                alert(err?.response?.data?.mensaje || "Error al registrar");
            }
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4 py-6">
            <div className="w-full max-w-3xl bg-white p-6 sm:p-8 rounded-lg shadow-md space-y-5">

                <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-800">
                    Crear Lectura
                </h2>

                {/* Número de medidor */}
                <div>
                    <label className="block mb-2 font-medium text-gray-700">
                        Número de Medidor
                    </label>

                    <div className="flex gap-2">
                        <input
                            value={numeroMedidor}
                            onChange={(e) => setNumeroMedidor(e.target.value)}
                            type="text"
                            placeholder="Ingrese número de medidor"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            type="button"
                            onClick={buscarMedidor}
                            className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700"
                        >
                            Buscar
                        </button>
                    </div>

                    {error && <small className="text-red-500">{error}</small>}
                </div>

                {/* Información del cliente */}
                {lecturaCliente && (
                    <div className="p-4 bg-gray-50 rounded-lg border space-y-2">
                        <p>
                            <strong>Nombre:</strong>{" "}
                            <span className="text-gray-600">{lecturaCliente.nombre}</span>
                        </p>
                        <p>
                            <strong>N° Medidor:</strong>{" "}
                            <span className="text-gray-600">{lecturaCliente.numeroMedidor}</span>
                        </p>
                        <p>
                            <strong>Estado:</strong>{" "}
                            <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 rounded text-sm">
                                {lecturaCliente.estado}
                            </span>
                        </p>
                    </div>
                )}

                {/* Año */}
                <div>
                    <label className="block mb-2 font-medium text-gray-700">Año</label>
                    <select
                        value={gestion}
                        onChange={(e) => setGestion(e.target.value)}
                        className="w-full p-3 border rounded-lg"
                    >
                        {gestiones.map((g) => (
                            <option key={g} value={g}>{g}</option>
                        ))}
                    </select>
                </div>


                <div>
                    <label className="block mb-2 font-medium text-gray-700">Mes</label>
                    <select
                        value={mes}
                        onChange={(e) => setMes(e.target.value)}
                        className="w-full p-3 border rounded-lg"
                    >
                        <option value="">-- Seleccione un mes --</option>
                        {mesesAno.map((m) => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>


                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                Lectura Anterior
                            </label>
                            <input
                                type="number"
                                disabled
                                {...register("lecturaAnterior", { required: true, min: 0 })}
                                className="w-full p-3 border rounded-lg bg-gray-100 text-right"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                Lectura Actual
                            </label>
                            <input
                                type="number"
                                {...register("lecturaActual", { required: true, min: 0 })}
                                className="w-full p-3 border rounded-lg"
                            />
                            {errors.lecturaActual && (
                                <small className="text-red-500">
                                    La lectura es obligatoria
                                </small>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
