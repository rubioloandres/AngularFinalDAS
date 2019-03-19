import { Component, OnInit } from '@angular/core';


/**
 * @title Nested menu
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NestedMenuExampleComponent implements OnInit {

  listaProvincias = ['Cordoba', 'Santa Fe', 'Buenos Aires', 'Mendoza', 'San Luis'];
  listaCategorias = ['Pan', 'Galletitas dulces', 'Galletitas de agua' ,  'Azucar'];
  listaCadenas = [ 'Walmart' , 'Disco' , 'Jumbo' , 'Libertad', 'Carrefour' ];

  constructor() { }

  ngOnInit() {
  }

}
