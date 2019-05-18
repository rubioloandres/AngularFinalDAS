export interface Producto {
  codigoDeBarras: string;
  idCategoria: number;
  nombreCategoria: string;
  nombreProducto: string;
  nombreMarca: string;
  imagenProducto: string;
  precio: string;
}

export interface ProductoIngrediente {
  nombreIngrediente: string;
  descripcion: string;
}

export interface ProductoPrecio {
  codigoDeBarras: string;
  precio: number;
  validoDesde: string;
  nombre: string;
  marca: string;
  mejorPrecio: boolean;
}
