import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { DataSharingService } from 'src/app/services/datasharing.service';
import { Ubicacion } from 'src/app/interfaces/ubicacion';
import { MatDialog } from '@angular/material';
import { DialogLocationComponent } from '../location/location.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  carrito: Producto[] = new Array();
  displayedColumns = ['item', 'nombre', 'categoria', 'accion'];
  codigos: string;
  ubicacion: Ubicacion;

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
    this.carrito =  carLS.filter(p => p.nombreProducto !== prod.nombreProducto);
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  removeAllProds(): void {
    this.carrito = [];
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  // TODO: ver metodo, ya sin tener en cuenta la cantidad
  addToCart(prod: Producto): void {
    console.log(prod);
    if ( ! this.localCartIsNull()) {
      const carLS: Producto[] = JSON.parse(localStorage.getItem('carrito'));
      const prodIsNotOnCart =  carLS.filter(p => p.nombreProducto === prod.nombreProducto ).length === 0;
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
      if (prodCart.filter(p => p.codigoDeBarras === idprod).length === 1 ) {
        return true;
      }
    }
    return false;
  }

  sendCodigos() {
    const lproductos: Producto [] = JSON.parse(localStorage.getItem('carrito'));
    const lcodigos = new Array();
    lproductos.forEach(prod => {
      lcodigos.push(prod.codigoDeBarras);
    });
    this.data.changeCodigos(lcodigos.toString());

    const productoSource: Producto =   {
        codigoDeBarras: 'string',
        idCategoria: 0,
        nombreCategoria: 'string',
        nombreProducto: 'string',
        nombreMarca: 'string',
        imagenProducto: 'string',
        precio: 'string',
    };
    this.data.changeProducto(productoSource);
  }

  getAllProducts(): Producto [] {
    if (!this.localCartIsNull()) {
      const currentcarrito: Producto[] = JSON.parse(localStorage.getItem('carrito'));
      return currentcarrito;
    } else {
      return [];
    }
  }

  cargarUbicacion() {
    const ubLS = localStorage.getItem('ubicacion');
    if (ubLS == null || ubLS.length < 2 ) {
      this.ubicacion = undefined;
      return;
    } else {
      this.ubicacion = JSON.parse(ubLS);
    }
  }

  registrarUbicacion() {
    console.log('SE NECESITA DETERMINAR UNA UBICACION');
    const dialogRef = this.dialog.open(DialogLocationComponent, {
      width: '500px',
      data: {   data: 'ubic___'}
    });
  }

  constructor(
    private data: DataSharingService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.cargarUbicacion();
    this.initCart();
  }

}
