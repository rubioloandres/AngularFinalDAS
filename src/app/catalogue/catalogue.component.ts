import { Component, OnInit} from '@angular/core';
import { DataSharingService } from '../services/datasharing.service';
import { Producto } from './../interfaces/producto';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  listaProductos: Producto [] = new Array();

  listaProdCarrito: Producto [] = new Array();

  message: string;

  cargarProductos() {
    console.log('entro');
    const prods: Array<Producto> = JSON.parse(localStorage.getItem('productos'));
    this.listaProductos = prods;
    return this.listaProductos;
  }

  addToCart(prod: Producto) {
    var carLS: Producto[] = JSON.parse(localStorage.getItem('carrito'));
    if (carLS === null) {
      this.listaProdCarrito.push(prod);
      localStorage.setItem('carrito', JSON.stringify(this.listaProdCarrito));
    } else {
      if ( (carLS.filter(p => p.nombre === prod.nombre ).length === 0)) {
        this.listaProdCarrito = JSON.parse(localStorage.getItem('carrito'));
        this.listaProdCarrito.push(prod);
        localStorage.setItem('carrito', JSON.stringify(this.listaProdCarrito));
      }
    }
  }

  cartContainsProd( idprod: number) {
    //console.log('entro');
    const prodCart: Producto[] = JSON.parse(localStorage.getItem('carrito'));
    if (prodCart === null) {
      return false;
    }

    if (prodCart.filter(p => p.id === idprod).length === 1 ) {
      return true;
    }
    return false;
  }

  constructor(private data: DataSharingService) {
  }

  ngOnInit() {/*
    this.data.currentMessage.subscribe(message => {
      this.message = message;
      const prods: Array<Producto> = JSON.parse(localStorage.getItem('productos'));
      this.listaProductos = prods.filter(p => p.categoria === this.message);
    });*/
     this.cargarProductos();
  }

}
