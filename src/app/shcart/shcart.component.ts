import { Component, OnInit } from '@angular/core';
import { Producto } from './../interfaces/producto';

@Component({
  selector: 'app-shcart',
  templateUrl: './shcart.component.html',
  styleUrls: ['./shcart.component.css']
})
export class ShcartComponent implements OnInit {

  listaProductosCarrito: Producto[] = new Array();
  displayedColumns = ['item', 'nombre', 'categoria', 'accion'];

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
