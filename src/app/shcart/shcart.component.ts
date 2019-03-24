import { Component, OnInit } from '@angular/core';

export interface Producto {
  nombre: string;
  categoria: string;
  imagen: string;
}

@Component({
  selector: 'app-shcart',
  templateUrl: './shcart.component.html',
  styleUrls: ['./shcart.component.css']
})
export class ShcartComponent implements OnInit {

  listaProductosCarrito: Producto[] = new Array();

  displayedColumns = ['item', 'nombre', 'categoria', 'accion'];

  listaProductos: Producto[] = [
    { nombre: 'Pan Bimbo', categoria: 'Pan', imagen: '../../assets/img/pan_bimbo.png' },
    { nombre: 'Galletitas surtidas Bagley', categoria: 'Galletitas Dulces', imagen: '../../assets/img/surtido-bagley.jpg'},
    { nombre: 'Azucar Ledesma 1kg', categoria: 'Azucar', imagen: '../../assets/img/azucar_ledesma.png' },
    { nombre: 'Pan Lactal', categoria: 'Pan', imagen: '../../assets/img/pan_lactal.png' },
    { nombre: 'Galletitas surtidas Arcor', categoria: 'Galletitas Dulces', imagen: '../../assets/img/surtidas_arcor.jpg'},
  ];

  getTotalCost() {
   // return this.listaProductos.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  loadCart() {
    var carLS: Producto [] = JSON.parse(localStorage.getItem('carrito'));
    this.listaProductosCarrito = carLS;
  }

  removeProd(prod: Producto){
    var carLS: Producto [] = JSON.parse(localStorage.getItem('carrito'));
    this.listaProductosCarrito =  carLS.filter(p => p.nombre !== prod.nombre);
    localStorage.setItem('carrito', JSON.stringify(this.listaProductosCarrito));
  }

  removeAllProds() {
    localStorage.removeItem('carrito');
    this.listaProductosCarrito = [];
  }

  constructor() { }

  ngOnInit() {
    this.loadCart();
  }

}
