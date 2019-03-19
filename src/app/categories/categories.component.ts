import { Component, OnInit , AfterViewInit} from '@angular/core';
import { CategoriesDataSource } from './categories.datasource';
import { ProductsDataSource } from './products.datasource';
import { CatalogueComponent } from '../catalogue/catalogue.component';
export interface Categoria {
  nombre: string;
  imagen: string;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, AfterViewInit {

 // public isViewable: boolean;

  private _categorias: string[];
  private categoria: string;

  private _productos: string[];
  private producto: string;

  // datos estaticos
  listaCategorias: Categoria[] = new Array();

  // datos estaticos
  cargarCategorias() {
    this.listaCategorias = [
      { nombre: 'Pan', imagen: './../../assets/img/cat_pan.png' },
      { nombre: 'Galletitas Dulces', imagen: './../../assets/img/cat_gal_d.jpg' },
      { nombre: 'Azucar', imagen: './../../assets/img/cat_azucar.png' },
      { nombre: 'Aceite', imagen: './../../assets/img/cat_aceite.png' },
      { nombre: 'Bebidas Alcoholicas', imagen: './../../assets/img/cat_beb_a.png' }
    ];
  }

  constructor(
    private _dsCat: CategoriesDataSource,
    private _dsProd: ProductsDataSource,
    public _catalogo: CatalogueComponent
    ) { }

  ngOnInit() {
    this.cargarCategorias();

    // llamada a indec para obtener categorias de productos
    // this.getCategorias();

   // this.isViewable = true;
  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
  }

  get categorias(): string[] {
    return this._categorias;
  }

  get productosByCategoria(): string[] {
    return this._productos;
  }

  getCategorias() {
    this._dsCat.getCategoriasINDEC().subscribe( cats  => this._categorias = cats );
  }

  getProductosByCategorias(nomCat: string) {
   // this._dsProd.getProductosByCategoriaINDEC(nomCat).subscribe( prods => this._productos = prods );

   //alert(this._catalogo.isViewable);

   // this._catalogo.isViewable = true;
  //  alert(this._catalogo.isViewable);

   // ocultar categorias (este componente)
   // this.toggle();
  }
/*
  public toggle(): void {
    this.isViewable = !this.isViewable;
 }*/
}
