export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  cantidad: number;
  imagen: string;
  precio: string;
}

export interface ProductoPrecio {
  idProd: number;
  precio: number;
}
