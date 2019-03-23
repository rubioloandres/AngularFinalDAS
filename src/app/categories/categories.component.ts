import { Component, OnInit , AfterViewInit, Output, EventEmitter} from '@angular/core';
import { CategoriesDataSource } from './categories.datasource';
import { ProductsDataSource } from './products.datasource';
import { CatalogueComponent } from '../catalogue/catalogue.component';

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
  styleUrls: ['./categories.component.css'],
  providers: [CatalogueComponent]
})
export class CategoriesComponent implements OnInit, AfterViewInit {

  private _categorias: Categoria[];
  private categoria: Categoria;

  private _productos: string[];
  private producto: string;

  listaCategorias: Categoria[] = new Array();

  constructor(
    private _dsCat: CategoriesDataSource,
    private _dsProd: ProductsDataSource,
    private _catalogo: CatalogueComponent
    ) {   }

  ngOnInit() {
    // ver manejo de error, si no hay respuesta del servlet, buscar en localsotorage
    this.loadCategorias();
   // this.loadProductos();
  }

  ngAfterViewInit(): void {
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

/*
  get categorias(): Categoria[] {
    return this._categorias;
  }

  getProductosByCategoria(cat: string) {
    //const prods: Array<Producto> = JSON.parse(localStorage.getItem('productos'));
    console.log(this._catalogo.listaProductos);
    // this._catalogo.getProductosByCategoria(cat);
    console.log(this._catalogo.listaProductos);
    //this._catalogo.listaProductos = prods.filter(p => p.categoria === cat);
  }

  loadProductos() {
    this._dsProd.getProductosINDEC().subscribe( prods  =>  {
          localStorage.setItem('productos', JSON.stringify(prods));
          });
  }
 // @Output('function') eventLoad: EventEmitter<string> = new EventEmitter<string>();
  @Output() eventLoad = new EventEmitter();
  loadProd(categoria: string) {
    console.log(this._catalogo.listaProductos);
    // this.eventLoad.emit(categoria);
   //  this.eventLoad.emit(null);
   // this._catalogo.loadProdsByCat(categoria);
    console.log(this._catalogo.listaProductos);

  }*/

}
