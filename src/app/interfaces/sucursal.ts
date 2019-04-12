import { ProductoPrecio } from './producto';

export interface Sucursal {
  idCadena: number;
  idSucursal: number;
  nombreSucursal: string;
  direccion: string;
  lat: string;
  lng: string;
  productos: ProductoPrecio[];
  mejorOpcion: boolean;
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
