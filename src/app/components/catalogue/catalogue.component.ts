import { Component, OnInit} from '@angular/core';
import { DataSharingService } from '../../services/datasharing.service';
import { Producto } from './../../interfaces/producto';
import { CartComponent } from '../cart/cart.component';
import { CriterioBusquedaProducto } from 'src/app/interfaces/criterios';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  listaProductos: Producto [] = new Array();
  message: string;

  criterioBusqueda: CriterioBusquedaProducto;

  addToCart(prod: Producto, cant: number) {
    prod.cantidad = cant;
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
     // console.log(criterio);
     // this.criterioBusqueda = criterio;
      const prods: Producto [] = JSON.parse(localStorage.getItem('productos'));

      //busca solo categoria
      if (criterio.categoria !== undefined && criterio.marca === undefined && criterio.nombre === undefined) {
        this.listaProductos = prods.filter(p =>
          p.nombreCategoria.toLowerCase() === criterio.categoria.toLowerCase()
        );
      }
      //busca marca y categoria
      if (criterio.categoria !== undefined && criterio.marca !== undefined && criterio.nombre === undefined) {
        this.listaProductos = prods.filter(p =>
          p.nombreCategoria.toLowerCase() === criterio.categoria.toLowerCase()
          &&
          p.nombreMarca.toLowerCase() === criterio.marca.toLowerCase()
        );
      }
      //busca por la searchbar
      if (criterio.categoria === undefined && criterio.marca === undefined && criterio.nombre !== undefined) {
        this.listaProductos = prods.filter(p =>
          ( p.nombreCategoria.toLowerCase().includes(criterio.nombre.toLowerCase()) )  ||
          ( p.nombreMarca.toLowerCase().includes(criterio.nombre.toLowerCase()) )      ||
          ( p.nombre.toLowerCase().includes(criterio.nombre.toLowerCase()) )
        );
    }

      const currentcarrito: Producto [] = this.cart.getAllProducts();
      for (const pc of currentcarrito) {
        for (const pl of this.listaProductos) {
           if (pc.idComercial === pl.idComercial) {
             pl.cantidad = pc.cantidad;
           } else {
             pl.cantidad = 1;
           }
        }
      }
    });
  }

  updateCant(idprod: string, cant: number) {
    console.log(cant);
    this.cart.updateCant(idprod, cant);
  }

  constructor(
    private data: DataSharingService,
    private cart: CartComponent
    ) { }

  ngOnInit() {
    this.cart.initCart();
    this.updateCatalogue();
  }

}
