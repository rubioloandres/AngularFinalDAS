import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  listaProductosCarrito: Producto[] = new Array();
  displayedColumns = ['item', 'nombre', 'categoria', 'cantidad', 'accion'];

  getTotalCost() {
   // return this.listaProductos.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  loadCart() {
    const carLS: Producto [] = JSON.parse(localStorage.getItem('carrito'));
    this.listaProductosCarrito = carLS;
  }

  removeProd(prod: Producto){
    const carLS: Producto [] = JSON.parse(localStorage.getItem('carrito'));
    this.listaProductosCarrito =  carLS.filter(p => p.nombre !== prod.nombre);
    localStorage.setItem('carrito', JSON.stringify(this.listaProductosCarrito));
  }

  removeAllProds() {
    localStorage.removeItem('carrito');
    this.listaProductosCarrito = [];
  }

  getPrices() {
    const lprod: Producto [] = JSON.parse(localStorage.getItem('carrito'));
    const lpre = new Array();
    lprod.forEach(prod => {
      lpre.push(prod.idComercial);
    });
    console.log(lpre.toString());
  }

  constructor() { }

  ngOnInit() {
    this.loadCart();
  }

}
