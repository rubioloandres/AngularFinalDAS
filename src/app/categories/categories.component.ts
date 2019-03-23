import { Component, OnInit } from '@angular/core';
import { CategoriesDataSource } from './categories.datasource';
import { ProductsDataSource } from './products.datasource';
import { DataSharingService } from '../services/datasharing.service';

export interface Categoria {
  nombre: string;
  imagen: string;
}

export interface Producto {
  nombre: string;
  categoria: string;
  imagen: string;
}
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  private _categorias: Categoria[];
  private categoria: Categoria;

  message: string;

  listaCategorias: Categoria[] = new Array();

  constructor(
    private data: DataSharingService,
    private _dsCat: CategoriesDataSource,
    private _dsProd: ProductsDataSource
    ) {   }

  ngOnInit() {
    // ver manejo de error, si no hay respuesta del servlet, buscar en localsotorage
    this.loadCategorias();
    this.data.currentMessage.subscribe(message => this.message = message);
   // this.loadProductos();
  }

  loadCategorias() {
    const categorias: Array<Categoria> = JSON.parse(localStorage.getItem('categorias'));
    this.listaCategorias = categorias;

    /*this._dsCat.getCategoriasINDEC().subscribe( cats  =>  {
          localStorage.setItem('categorias', JSON.stringify(cats));
          const categorias: Array<Categoria> = cats;
          this.listaCategorias = categorias;
          });*/
  }

  newMessage(categoria: string) {
    this.data.changeMessage(categoria);
  }
}
