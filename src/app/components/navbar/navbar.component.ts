import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/interfaces/categoria';
import { DataSharingService } from 'src/app/services/datasharing.service';
import { GeoLocationService } from 'src/app/services/geoLocation.service';

/**
 * @title Nested menu
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NestedMenuExampleComponent implements OnInit {

  listaProvincias: string [] = new Array();
  listaCategorias: string [] = new Array();
  listaCadenas = [ 'Walmart' , 'Disco' , 'Jumbo' , 'Libertad', 'Carrefour' ];
  message: string;
  searchInput = '';

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
    const lprov: string [] = JSON.parse(localStorage.getItem('provincias'));
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
   ) { }

  ngOnInit() {
    this.loadProvinces();
    this.loadCategories();
    this.data.currentMessage.subscribe(message => this.message = message);
  }

}
