import { ProductoPrecio } from './producto';

export interface Sucursal {
  idCadena: number;
  idSucursal: number;
  nombre: string;
  direccion: string;
  latitud: string;
  longitud: string;
  listaPreciosProductos: ProductoPrecio[];
  mejor: boolean;
}

export interface TotalSucursal {
  numeroSucursal: number;
  totalPrecio: number;
}

export interface SucursalInfo {
  nombreCadena: string;
  imagenCadena: string;
  nombreSucursal: string;
  direccion: string;
  latitud: string;
  longitud: string;
}
