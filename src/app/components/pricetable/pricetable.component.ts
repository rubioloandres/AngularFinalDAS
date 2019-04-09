import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Producto, ProductoPrecio } from './../../interfaces/producto';
import { Sucursal, TotalSucursal } from './../../interfaces/sucursal';
import { SucursalesDataSource } from 'src/app/data/sucursales.datasource';
import { Cadena } from 'src/app/interfaces/cadena';
import { CadenasDataSource } from 'src/app/data/cadenas.datasource';

@Component({
  selector: 'app-pricetable',
  templateUrl: './pricetable.component.html',
  styleUrls: ['./pricetable.component.css']
})
export class PricetableComponent implements OnInit, AfterViewInit {

  displayedColumns = new Array();
  precioTotalSucursal: TotalSucursal[] = new Array();
  listaSucursales: Sucursal[] = new Array();
  listaProductos: Producto[] = new Array();
  listaCadenas: Cadena [] = new Array();

  loadCadenas() {
    this.listaCadenas = JSON.parse(localStorage.getItem('cadenas'));
  }

  loadSucursales() {
    this.listaSucursales = [
      {
        idCadena: 5, idSucursal: 1, direccion: 'dir disco 111', latitud: '-33.111', longitud: '54.35'
        , listaPreciosProductos: [
          { idProd: 1111, precio: 50, mejorPrecio: false},
          { idProd: 3333, precio: 41, mejorPrecio: false},
          { idProd: 4444, precio: 25, mejorPrecio: false},
          { idProd: 5555, precio: 7.50, mejorPrecio: false },
        ], mejor: true
      },
      {
       idCadena: 1, idSucursal: 1, direccion: 'dir walmart 222', latitud: '-33.112', longitud: '54.36',
        listaPreciosProductos: [
        { idProd: 2222, precio: 50, mejorPrecio: false },
        { idProd: 3333, precio: 37, mejorPrecio: false },
        { idProd: 4444, precio: 25, mejorPrecio: false },
        { idProd: 6666, precio: 80, mejorPrecio: false }
        ], mejor: false
      },
      {
        idCadena: 4, idSucursal: 1, direccion: 'dir libertad 333', latitud: '-33.1112', longitud: '54.33',
         listaPreciosProductos: [
          { idProd: 4444, precio: 23, mejorPrecio: false },
          { idProd: 6666, precio: 82, mejorPrecio: false }
         ], mejor: false
      },
      {
        idCadena: 3, idSucursal: 1, direccion: 'dir carrefour 444', latitud: '-33.121', longitud: '54.66',
         listaPreciosProductos: [
          { idProd: 2222, precio: 45, mejorPrecio: false },
          { idProd: 3333, precio: 37, mejorPrecio: false },
          { idProd: 4444, precio: 23, mejorPrecio: false },
          { idProd: 6666, precio: 81, mejorPrecio: false }
        ], mejor: false
      }
    ];
    /*
    this.dsSuc.getPreciosSucursalesINDEC().subscribe(suc =>
      this.listaSucursales = suc );*/
  }

  loadColumns() {
    this.displayedColumns.push('item');
    for (const suc of this.listaSucursales) {
      this.displayedColumns.push('sucursal' + ( (this.listaSucursales.indexOf(suc)) + 1));
    }
    this.displayedColumns.push('star');
  }

  loadProductos() {
    this.listaProductos =  JSON.parse(localStorage.getItem('carrito'));
  }

  getProductoPriceBySucursal(indexSuc: number, idProd: number) {
    const pp: ProductoPrecio[] = this.listaSucursales[indexSuc]
                                     .listaPreciosProductos
                                     .filter(p => p.idProd === idProd);
    if (pp.length === 0) {
      return 'No Disponible';
    } else {
      return '$ ' + pp[0].precio;
    }
  }

  getTotal(indexSuc: number) {
    const tot  = this.listaSucursales[indexSuc]
                      .listaPreciosProductos
                      .map(p => p.precio)
                      .reduce((total, precProd) => total + precProd, 0);
    this.precioTotalSucursal.push({numeroSucursal: indexSuc, totalPrecio: tot});
    return tot;
  }

  removeProduct(idprod: number) {
    const prodscart: Producto [] = JSON.parse(localStorage.getItem('carrito'));
    this.listaProductos = prodscart.filter(p => p.id !== idprod);
    localStorage.setItem('carrito', JSON.stringify(this.listaProductos));
  }

  getCadena(id: number) {
    let cadena: Cadena;
    this.listaCadenas.forEach(cad => {
      if (cad.idCadena === id) {
        cadena = cad;
      }
    });
    return cadena;
  }

  constructor(
    private dsSuc: SucursalesDataSource
  ) {   }

  ngOnInit() {
    this.loadCadenas();
    this.loadSucursales();
    this.loadProductos();
    this.loadColumns();
  }

  ngAfterViewInit(): void {
  }
}
