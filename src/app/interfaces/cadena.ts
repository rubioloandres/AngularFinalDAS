import { Sucursal } from './sucursal';

export interface Cadena {
  idCadena: number;
  nombre: string;
  imagen: string;
}

export interface CadenaSucursal {
  nombre: string;
  idCadena: number;
  imagen: string;
  listaSucursales: Sucursal [];
}
