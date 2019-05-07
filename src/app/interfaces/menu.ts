import { ProductoIngrediente } from './producto';

export interface Menu {
  nombre: string;
  dia: string;
  platos: Plato [];
}

export interface Plato {
  nombre: string;
  imagen: string;
  ingredientes: ProductoIngrediente [];
  preparacion: string;
}
