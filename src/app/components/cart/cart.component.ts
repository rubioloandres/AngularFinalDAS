import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { SucursalesDataSource } from 'src/app/data/sucursales.datasource';
import { Ubicacion } from 'src/app/interfaces/ubicacion';
import { Sucursal } from 'src/app/interfaces/sucursal';
import { PricetableComponent } from '../pricetable/pricetable.component';
import { DataSharingService } from 'src/app/services/datasharing.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  listaProductosCarrito: Producto[] = new Array();
  displayedColumns = ['item', 'nombre', 'categoria', 'cantidad', 'accion'];
  listaSucursales: Sucursal[] = new Array();

  codigos: string;

  getTotalCost() {
   // return this.listaProductos.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  loadCart() {
    const carLS: Producto [] = JSON.parse(localStorage.getItem('carrito'));
    this.listaProductosCarrito = carLS;
  }

  removeProd(prod: Producto) {
    const carLS: Producto [] = JSON.parse(localStorage.getItem('carrito'));
    this.listaProductosCarrito =  carLS.filter(p => p.nombre !== prod.nombre);
    localStorage.setItem('carrito', JSON.stringify(this.listaProductosCarrito));
  }

  removeAllProds() {
    localStorage.removeItem('carrito');
    this.listaProductosCarrito = [];
  }

  sendCogidos() {
    const lprod: Producto [] = JSON.parse(localStorage.getItem('carrito'));
    const lpre = new Array();
    lprod.forEach(prod => {
      lpre.push(prod.idComercial);
    });

    this.data.changeCodigos(lpre.toString());
  }

  constructor(
    private data: DataSharingService
    ) { }

  ngOnInit() {
    this.loadCart();
  }

}
