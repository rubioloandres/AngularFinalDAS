export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  marca: string;
  cantidad: number;
  imagen: string;
  precio: string;
}

export interface ProductoPrecio {
  idProd: number;
  precio: number;
  mejorPrecio: boolean;
}
