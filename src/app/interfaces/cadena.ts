import { Sucursal } from './sucursal';

export interface Cadena {
  id: number;
  nombre: string;
  imagen: string;
}

export interface CadenaSucursal {
  id: number;
  nombre: string;
  sucursales: Sucursal [];
}
