import { Component, OnInit} from '@angular/core';
import { DataSharingService } from '../../services/datasharing.service';
import { Producto } from './../../interfaces/producto';
import { CartComponent } from '../cart/cart.component';
import { CriterioBusquedaProducto } from 'src/app/interfaces/criterios';
import { Ubicacion } from 'src/app/interfaces/ubicacion';
import { DialogLocationComponent } from '../location/location.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  listaProductos: Producto [] = new Array();
  message: string;
  ubicacion: Ubicacion;
  criterioBusqueda: CriterioBusquedaProducto;

  addToCart(prod: Producto) {
    this.cart.addToCart(prod);
  }

  removeFromCart(prod: Producto) {
    this.cart.removeProductFromCart(prod);
  }

  prodIsInCart(idprod: string): boolean {
    return this.cart.prodIsInCart(idprod);
  }

  updateCatalogue() {// HACK:
    this.data.currentCriterio.subscribe(criterio => {
      const prods: Producto [] = JSON.parse(localStorage.getItem('productos'));

      // busca solo categoria
      if (criterio.categoria !== undefined && criterio.marca === undefined && criterio.nombre === undefined) {
        this.listaProductos = prods.filter(p =>
          p.nombreCategoria.toLowerCase() === criterio.categoria.toLowerCase()
        );
      }
      // busca marca y categoria
      if (criterio.categoria !== undefined && criterio.marca !== undefined && criterio.nombre === undefined) {
        this.listaProductos = prods.filter(p =>
          p.nombreCategoria.toLowerCase() === criterio.categoria.toLowerCase()
          &&
          p.nombreMarca.toLowerCase() === criterio.marca.toLowerCase()
        );
      }
      // busca por la searchbar
      if (criterio.categoria === undefined && criterio.marca === undefined && criterio.nombre !== undefined) {
        this.listaProductos = prods.filter(p =>
          ( p.nombreCategoria.toLowerCase().includes(criterio.nombre.toLowerCase()) )  ||
          ( p.nombreMarca.toLowerCase().includes(criterio.nombre.toLowerCase()) )      ||
          ( p.nombreProducto.toLowerCase().includes(criterio.nombre.toLowerCase()) )
        );
    }
      const currentcarrito: Producto [] = this.cart.getAllProducts();
    });
  }

  consultarPrecio(producto: Producto) {
    console.log(producto.codigoDeBarras);
    this.data.changeCodigos('default codigos');
    this.data.changeProducto(producto);
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
    private cart: CartComponent,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.cart.initCart();
    this.cargarUbicacion();
    this.updateCatalogue();
  }

}
