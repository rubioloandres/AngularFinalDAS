import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/services/datasharing.service';
import { CriterioBusquedaProducto } from 'src/app/interfaces/criterios';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  searchInput = '';
  criterioBusqueda: CriterioBusquedaProducto;

  customOptions: any = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay: true,
    navSpeed: 600,
    navText: [''],
    responsive: {
      0: {
        items: 1
      } ,
      200: {
        items: 1
      },
      400: {
        items: 1
      },
      600: {
        items: 1
      }
    },
    nav: false
  };

  searchProducts() {
    const crit: CriterioBusquedaProducto = {
      idComercial: undefined,
      marca: undefined,
      categoria: undefined,
      nombre: this.searchInput
    };
    this.data.changeCriterioBusquedaProducto(crit);
  }

  constructor(
    private data: DataSharingService
  ) { }

  ngOnInit() {
  }
}
