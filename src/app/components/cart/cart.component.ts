import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { DataSharingService } from 'src/app/services/datasharing.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit {
  carrito: Producto[] = new Array();
  displayedColumns = ['item', 'nombre', 'categoria', 'cantidad', 'accion'];
  codigos: string;

  initCart(): void {
    if (this.localCartIsNull()) {
      this.createLocalCart();
    } else {
      this.carrito = this.loadCartFromLocal();
    }
  }
  /* inicio Metodos que dan soporte a initCart()*/
  localCartIsNull(): boolean {
    const car = localStorage.getItem('carrito');
    if (car === null) {
      return true;
    }
    return false;
  }
  createLocalCart(): void {
    const car = localStorage.setItem('carrito', '[]');
    this.carrito = [];
  }
  loadCartFromLocal(): Producto[] {
    if (this.localCartIsEmpty()) {
      return [];
    } else {
      return JSON.parse(localStorage.getItem('carrito'));
    }
  }
  localCartIsEmpty(): boolean {
    const car: Producto [] = JSON.parse(localStorage.getItem('carrito'));
    if (car.length === 0) {
      return true;
    }
    return false;
  }
  /*fin Metodos que dan soporte a initCart()*/

  cartIsEmpty(): boolean {
    return this.carrito.length === 0;
  }

  removeProductFromCart(prod: Producto): void {
    const carLS: Producto [] = JSON.parse(localStorage.getItem('carrito'));
    this.carrito =  carLS.filter(p => p.nombre !== prod.nombre);
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  removeAllProds(): void {
    this.carrito = [];
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  addToCart(prod: Producto): void {
    console.log(prod);
    if ( ! this.localCartIsNull()) {
      const carLS: Producto[] = JSON.parse(localStorage.getItem('carrito'));
      const prodIsNotOnCart =  carLS.filter(p => p.nombre === prod.nombre ).length === 0;
      if (prodIsNotOnCart) {
        this.carrito = JSON.parse(localStorage.getItem('carrito'));
        this.carrito.push(prod);
        localStorage.setItem('carrito', JSON.stringify(this.carrito));
        return;
      } else {
       // prod.cantidad = this.inputCant;
        this.carrito.push(prod);
        localStorage.setItem('carrito', JSON.stringify(this.carrito));
      }
    } else {
      this.carrito.push(prod);
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
    }
  }

  prodIsInCart( idprod: string): boolean {
    if (! this.localCartIsNull() ) {
      const prodCart: Producto[] = JSON.parse(localStorage.getItem('carrito'));
      if (prodCart.filter(p => p.idComercial === idprod).length === 1 ) {
        return true;
      }
    }
    return false;
  }

  updateCant(idprod: string, cant: number): void {
    const lcart: Producto[] = JSON.parse(localStorage.getItem('carrito'));
    if (lcart !== null) {
    lcart.forEach(prod => {
        if (prod.idComercial === idprod) {
          prod.cantidad = cant;
          localStorage.setItem('carrito', JSON.stringify(lcart));
        }
      });
    }
  }


  getAllProducts(): Producto [] {
    if (!this.localCartIsNull()) {
      const currentcarrito: Producto[] = JSON.parse(localStorage.getItem('carrito'));
      return currentcarrito;
    } else {
      return [];
    }
  }

  constructor(
    private data: DataSharingService
    ) { }

  ngOnInit() {
    this.initCart();
  }

}
