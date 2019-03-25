import { ProductoPrecio } from './producto';

export interface Sucursal {
  nombreCadena: string;
  imagen: string;
  direccion: string;
  localidad: string;
  listaPreciosProductos: ProductoPrecio[];
  mejor: boolean;
}

export interface TotalSucursal {
  numeroSucursal: number;
  totalPrecio: number;
}
