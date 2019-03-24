import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Producto } from './../interfaces/producto';

export interface TotalSucursal {
  numeroSucursal: number;
  totalPrecio: number;
}

export interface ProductoPrecio {
  idProd: number;
  precio: number;
}

export interface Sucursal {
  nombreCadena: string;
  imagen: string;
  direccion: string;
  localidad: string;
  listaPreciosProductos: ProductoPrecio[];
  mejor: boolean;
}

@Component({
  selector: 'app-pricetable',
  templateUrl: './pricetable.component.html',
  styleUrls: ['./pricetable.component.css']
})
export class PricetableComponent implements OnInit, AfterViewInit {

  displayedColumns = ['item', 'sucursal1', 'sucursal2', 'sucursal3', 'sucursal4'];
  precioTotalSucursal: TotalSucursal[] = new Array();

  listaSucursales: Sucursal[] = new Array();
  listaProductos: Producto[] = new Array();
  mejorop = -1;
  indexSuc = 0;
  loadData() {

    this.listaSucursales = [
      {
        nombreCadena: 'Disco', imagen: '../../assets/img/disco_logo.png',
        direccion: 'dir disco 111', localidad: 'localidad 1', listaPreciosProductos: [
          { idProd: 111112222, precio: 50 },
          { idProd: 111113333, precio: 41 },
          { idProd: 111114444, precio: 25 },
          { idProd: 111115555, precio: 7.50 },
          // { idProd: 111116666, precio: 87 }
        ], mejor: true
      },
      {
       nombreCadena: 'Walmart', imagen: '../../assets/img/walmart_logo.png',
       direccion: 'dir walmart 222', localidad: 'localidad 1', listaPreciosProductos: [
        { idProd: 111112222, precio: 50 },
        { idProd: 111113333, precio: 37 },
        { idProd: 111114444, precio: 25 },
        { idProd: 111116666, precio: 80 }
        ], mejor: false
      },
      {
         nombreCadena: 'Libertad', imagen: '../../assets/img/libertad_logo_nopng.jpg',
         direccion: 'dir libertad 333', localidad: 'localidad 1', listaPreciosProductos: [
          { idProd: 111114444, precio: 23 },
          { idProd: 111116666, precio: 82 }
         ], mejor: false
      },
      {
        nombreCadena: 'Carrefour', imagen: '../../assets/img/carrefour_logo.png',
        direccion: 'dir carrefour 444', localidad: 'localidad 1', listaPreciosProductos: [
          { idProd: 111112222, precio: 45 },
          { idProd: 111113333, precio: 37 },
          { idProd: 111114444, precio: 23 },
          { idProd: 111116666, precio: 81 }
        ], mejor: false
      }
    ];
/*
    this.listaProductos =  [
      { nombre: 'Pan Bimbo', idProd: 111112222 , imagen: '../../assets/img/pan_bimbo.png' },
      { nombre: 'Galletitas surtidas Bagley', idProd: 111113333, imagen: '../../assets/img/surtido-bagley.jpg'},
      { nombre: 'Azucar Ledesma 1kg', idProd: 111114444,  imagen: '../../assets/img/azucar_ledesma.png' },
      { nombre: 'Pan Lactal', idProd: 111115555, imagen: '../../assets/img/pan_lactal.png' },
      { nombre: 'Galletitas surtidas Arcor', idProd: 111116666, imagen: '../../assets/img/surtidas_arcor.jpg' }
    ];*/

    this.listaProductos =  JSON.parse(localStorage.getItem('carrito'));
  }

  loadPrices() {
    this.listaProductos.forEach(element => {

    });
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

  constructor() {   }

  ngOnInit() {
    this.loadData();
    this.loadPrices();
  }

  ngAfterViewInit(): void {
  }
}
