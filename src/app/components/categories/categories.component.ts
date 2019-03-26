import { Component, OnInit } from '@angular/core';
import { CategoriesDataSource } from '../../data/categories.datasource';
import { ProductsDataSource } from '../../data/products.datasource';
import { DataSharingService } from '../../services/datasharing.service';
import { Categoria } from './../../interfaces/categoria';
import { Producto } from './../../interfaces/producto';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  private _categorias: Categoria[];
  private categoria: Categoria;
  message: string;
  listaCategorias: Categoria [] = new Array();

  // reubicar array y metodo
  listaProductos: Producto [] = new Array();

  constructor(
    private data: DataSharingService,
    private _dsCat: CategoriesDataSource,
    private _dsProd: ProductsDataSource
    ) {   }

  ngOnInit() {
    // ver manejo de error, si no hay respuesta del servlet, buscar en localsotorage
    this.loadProductos();
    this.loadCategorias();
    this.data.currentMessage.subscribe(message => this.message = message);
  }

  loadCategorias() {
    /*
    this.listaCategorias = [
      { nombre: 'Pan', imagen: './../../assets/img/cat_pan.png' },
      { nombre: 'Aceite', imagen: './../../assets/img/cat_aceite.png' },
      { nombre: 'Galletitas Dulces', imagen: './../../assets/img/cat_gal_d.jpg' },
      { nombre: 'Azucar', imagen: './../../assets/img/cat_azucar.png' },
      { nombre: 'Bebidas Alcoholicas', imagen: './../../assets/img/cat_beb_a.png' }
    ];
    localStorage.setItem('categorias', JSON.stringify(this.listaCategorias)); */

    const categorias: Array<Categoria> = JSON.parse(localStorage.getItem('categorias'));
    this.listaCategorias = categorias;
    /*
    this._dsCat.getCategoriasINDEC().subscribe( cats  =>  {
          localStorage.setItem('categorias', JSON.stringify(cats));
          const categorias: Array<Categoria> = cats;
          this.listaCategorias = categorias;
          });*/
  }

  loadProductos() {
    /*
    // poner id reales
    this.listaProductos = [
      { id: 1111, nombre: 'Pan Bimbo', categoria: 'Pan', marca: 'Bimbo',
      cantidad: 1, imagen: './../../assets/img/pan_bimbo.png', precio: 'No disponible' },
      { id: 2222, nombre: 'Galletitas surtidas Bagley', categoria: 'Galletitas Dulces', marca: 'Bagley',
        cantidad: 1, imagen: './../../assets/img/surtido-bagley.jpg', precio: 'No disponible' },
      { id: 3333, nombre: 'Azucar Ledesma 1kg', categoria: 'Azucar', marca: 'Ledesma',
      cantidad: 1, imagen: './../../assets/img/azucar_ledesma.png', precio: 'No disponible' },
      { id: 4444, nombre: 'Pan Lactal', categoria: 'Pan', marca: 'Lactal',
      cantidad: 1, imagen: './../../assets/img/pan_lactal.png', precio: 'No disponible' },
      { id: 5555, nombre: 'Galletitas surtidas Arcor', categoria: 'Galletitas Dulces', marca: 'Arcor',
      cantidad: 1, imagen: './../../assets/img/surtidas_arcor.jpg', precio: 'No disponible' },
    ];
    localStorage.setItem('productos', JSON.stringify(this.listaProductos));

    this._dsProd.getProductosINDEC().subscribe( prods  =>  {
          localStorage.setItem('productos', JSON.stringify(prods));
          });*/
  }

  newMessage(categoria: string) {
    this.data.changeMessage(categoria);
  }
}
