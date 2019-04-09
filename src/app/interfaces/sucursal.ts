import { ProductoPrecio } from './producto';

export interface Sucursal {
  idCadena: number;
  idSucursal: number;
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
