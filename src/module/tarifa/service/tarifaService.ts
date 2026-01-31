import { instance } from '../../../core/config/instanceAxios';
import type { TarifaI, ListarTarifasI, ListarTarifasRangoI } from '../interface/tarifa';


export async function crearTarifa(data: TarifaI): Promise<any> {
  const response = await instance.post('tarifa', data);
  return response.data;
}


export async function listarTarifasRangos(): Promise<ListarTarifasRangoI[]> {
  const response = await instance.get<ListarTarifasRangoI[]>('tarifa/rangos');
  return response.data;
}

export async function listarTarifas(): Promise<ListarTarifasI[]> {
  const response = await instance.get<ListarTarifasI[]>('tarifa');
  return response.data;
}


export async function eliminarTarifa(id: string): Promise<any> {
  const response = await instance.delete<any>(`tarifa/${id}`);
  return response.data;
}


export async function eliminarRango(id: string): Promise<any> {
  const response = await instance.delete<any>(`tarifa/rango/${id}`);
  return response.data;
}
