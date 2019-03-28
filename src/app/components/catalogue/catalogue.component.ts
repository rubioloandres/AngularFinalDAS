import { Component, OnInit} from '@angular/core';
import { DataSharingService } from '../../services/datasharing.service';
import { Producto } from './../../interfaces/producto';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  listaProductos: Producto [] = new Array();
  listaProdCarrito: Producto [] = new Array();
  message: string;
  inputCant = 1;
  listInputCant: number[] = new Array();
  cargarProductos() {
    const prods: Array<Producto> = JSON.parse(localStorage.getItem('productos'));
    this.listaProductos = prods;
    return this.listaProductos;
  }

  addToCart(prod: Producto) {
    const carLS: Producto[] = JSON.parse(localStorage.getItem('carrito'));
    prod.cantidad = this.inputCant;
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
    const prodCart: Producto[] = JSON.parse(localStorage.getItem('carrito'));
    if (prodCart === null) {
      return false;
    }
    if (prodCart.filter(p => p.id === idprod).length === 1 ) {
      return true;
    }
    return false;
  }

  updateCatalogue() {
       /*
    this.data.currentMessage.subscribe(message => {
      this.message = message;
      const prods: Array<Producto> = JSON.parse(localStorage.getItem('productos'));
      this.listaProductos = prods.filter(p => p.categoria.toLowerCase() === this.message.toLowerCase()  );
    });*/
    this.data.currentMessage.subscribe(message => {
      this.message = message;
      const prods: Array<Producto> = JSON.parse(localStorage.getItem('productos'));
      this.listaProductos = prods.filter(p =>
          ( p.categoria.toLowerCase().includes(this.message.toLowerCase()) )  ||
          ( p.marca.toLowerCase().includes(this.message.toLowerCase()) )      ||
          ( p.nombre.toLowerCase().includes(this.message.toLowerCase()) )
      );
    });
  }

  updateCant(idprod: number) {
    const lcart: Producto[] = JSON.parse(localStorage.getItem('carrito'));
    if (lcart !== null) {
      lcart.forEach(prod => {
        if (prod.id === idprod) {
          prod.cantidad = this.inputCant;
          localStorage.setItem('carrito', JSON.stringify(lcart));
        }
      });
    }
  }

  constructor(
    private data: DataSharingService
    ) { }

  ngOnInit() {
    this.updateCatalogue();
     //this.cargarProductos();
  }

}
