export interface Producto {
  idComercial: number;
  idCategoria: number;
  nombreCategoria: string;
  nombre: string;
  nombreMarca: string;
  cantidad: number;
  imagen: string;
  precio: string;
}

export interface ProductoPrecio {
  idProd: number;
  precio: number;
  mejorPrecio: boolean;
}
