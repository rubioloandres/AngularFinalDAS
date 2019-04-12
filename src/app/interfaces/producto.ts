export interface Producto {
  idComercial: string;
  idCategoria: number;
  nombreCategoria: string;
  nombre: string;
  nombreMarca: string;
  cantidad: number;
  imagen: string;
  precio: string;
}

export interface ProductoPrecio {
  idComercial: string;
  precio: number;
  mejorPrecio: boolean;
}
