import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/interfaces/categoria';
import { DataSharingService } from 'src/app/services/datasharing.service';
import { GeoLocationService } from 'src/app/services/geoLocation.service';
import { Provincia } from 'src/app/interfaces/provincia';
import { Producto } from 'src/app/interfaces/producto';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

/**
 * @title Nested menu
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NestedMenuExampleComponent implements OnInit {

  listaProvincias: Provincia [] = new Array();
  listaCategorias: string [] = new Array();
  listaCadenas = [ 'Walmart' , 'Disco' , 'Jumbo' , 'Libertad', 'Carrefour' ];
  message: string;
  searchInput = '';

  listaProductos: Producto [] = new Array();
  formBusProd = new FormControl( this.searchInput = '');
  filteredProds: Observable<Producto[]>;

  private _filterProds(value: string): Producto[] {
    if (value.length > 1) {
      const filterValue = value.toLowerCase();
      return this.listaProductos.filter(prod => prod.nombre.toLowerCase().indexOf(filterValue) === 0);
    }
  }

  filtrarProductos() {
    this.filteredProds = this.formBusProd.valueChanges
      .pipe(
        startWith(''),
        map(prod => prod ? this._filterProds(prod) : this.listaProductos.slice())
      );
  }

  loadProducts() {
    this.listaProductos = JSON.parse(localStorage.getItem('productos'));
  }

  loadCategories() {
    const lcat: Categoria [] = JSON.parse(localStorage.getItem('categorias'));
    if (lcat !== null) {
      lcat.forEach(cat => {
        this.listaCategorias.push(cat.nombre);
      });
    } else {
      this.listaCategorias = [];
    }
  }

  loadProvinces() {
    /*this.listaProvincias = ['Cordoba', 'Buenos Aires', 'Santa Fe', 'Mendoza', 'San Luis', 'San Juan'];
    localStorage.setItem('provincias', JSON.stringify(this.listaProvincias));*/
    const lprov: Provincia [] = JSON.parse(localStorage.getItem('provincias'));
    if (lprov !== null) {
      this.listaProvincias = lprov;
    } else {
      this.listaProvincias = [];
    }
  }

  newMessage(categoria: string) {
    this.data.changeMessage(categoria);
  }

  getAutomaticLocation() {
    this.loc.getCurrentLocation();
  }

  searchProducts() {
    this.data.changeMessage(this.searchInput);
    this.searchInput = '';
  }

  constructor(
    private data: DataSharingService,
    private loc: GeoLocationService
   ) {
    this.loadProducts();
    this.filtrarProductos();
   }

  ngOnInit() {
    this.loadProvinces();
    this.loadCategories();
    this.data.currentMessage.subscribe(message => this.message = message);
  }

}
