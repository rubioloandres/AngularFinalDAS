import { Component, OnInit, Output, EventEmitter} from '@angular/core';

export interface Producto {
  nombre: string;
  categoria: string;
  imagen: string;
}

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  listaProductos: Producto [] = new Array();

  cargarProductos() {
    const prods: Array<Producto> = JSON.parse(localStorage.getItem('productos'));
    this.listaProductos = prods;
  }

  constructor() {
   }
  ngOnInit() {
     this.cargarProductos();
  }

  /*private _listaProductos: Producto [];
  private _categoria: string;

  getProdByCat(c: string): void {
    this._categoria = c;
  }

  @Output() catsChange = new EventEmitter();

  get prods() {
    const prods: Array<Producto> = JSON.parse(localStorage.getItem('productos'));
    this.listaProductos = prods.filter(p => p.categoria === this._categoria);
    return this.listaProductos;
  }

  set listaProductos( c: string ) {
    const prods: Array<Producto> = JSON.parse(localStorage.getItem('productos'));
    this._listaProductos = prods.filter(p => p.categoria === this._categoria);
    this.catsChange.emit(this._listaProductos);
    console.log('entro');
  }

getProductosByCategoria(cat: string) {
    const prods: Array<Producto> = JSON.parse(localStorage.getItem('productos'));
    this.listaProductos = prods.filter(p => p.categoria === cat);
  }

  @Input() cat: string = '';
  loadProdsByCat(cat: string): void {
    const prods: Array<Producto> = JSON.parse(localStorage.getItem('productos'));
    this.listaProductos = prods.filter(p => p.categoria === cat);
  }

  */
}
