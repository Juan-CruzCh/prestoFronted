export interface FormularioRango {
  nombre: string
  rango1: number;
  rango2: number;
  costo: number;
  iva: number;
}

export interface TarifaI {
  nombre: string;
  rango: RangoI[];
}

interface RangoI {
  rango1: number;
  rango2: number;
  costo: number;
  iva: number;
}


export interface TarifaRango {
  _id: string;
  rango1: number;
  rango2: number;
  costo: number;
  tarifa: string;
  iva: number;
  flag: string;
  fecha: string;

}

export interface ListarTarifasRangoI {
  _id: string;
  fecha: string;
  flag: string;
  nombre: string;
  rango: TarifaRango[];

}


export interface ListarTarifasI {
  _id: string;

  nombre: string;


}
