import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Producto, ProductoPrecio } from './../../interfaces/producto';
import { Sucursal, TotalSucursal } from './../../interfaces/sucursal';
import { SucursalesDataSource } from 'src/app/data/sucursales.datasource';

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

  loadSucursales() {
    this.listaSucursales = [
      {
        nombreCadena: 'Disco', imagen: '../../../assets/img/disco_logo.png',
        direccion: 'dir disco 111', localidad: 'localidad 1', listaPreciosProductos: [
          { idProd: 1111, precio: 50 },
          { idProd: 3333, precio: 41 },
          { idProd: 4444, precio: 25 },
          { idProd: 5555, precio: 7.50 },
          // { idProd: 111116666, precio: 87 }
        ], mejor: true
      },
      {
       nombreCadena: 'Walmart', imagen: '../../../assets/img/walmart_logo.png',
       direccion: 'dir walmart 222', localidad: 'localidad 1', listaPreciosProductos: [
        { idProd: 2222, precio: 50 },
        { idProd: 3333, precio: 37 },
        { idProd: 4444, precio: 25 },
        { idProd: 6666, precio: 80 }
        ], mejor: false
      },
      {
         nombreCadena: 'Libertad', imagen: '../../../assets/img/libertad_logo_nopng.jpg',
         direccion: 'dir libertad 333', localidad: 'localidad 1', listaPreciosProductos: [
          { idProd: 4444, precio: 23 },
          { idProd: 6666, precio: 82 }
         ], mejor: false
      },
      {
        nombreCadena: 'Carrefour', imagen: '../../../assets/img/carrefour_logo.png',
        direccion: 'dir carrefour 444', localidad: 'localidad 1', listaPreciosProductos: [
          { idProd: 2222, precio: 45 },
          { idProd: 3333, precio: 37 },
          { idProd: 4444, precio: 23 },
          { idProd: 6666, precio: 81 }
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

  constructor(
    private dsSuc: SucursalesDataSource
  ) {   }

  ngOnInit() {
    this.loadSucursales();
    this.loadProductos();
    this.loadColumns();
  }

  ngAfterViewInit(): void {
  }
}
