import { Component, OnInit, Input} from '@angular/core';
import { DataSharingService } from '../services/datasharing.service';

export interface Producto {
  nombre: string;
  categoria: string;
  imagen: string;
}

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  listaProductos: Producto [] = new Array();

  message: string;

  cargarProductos() {
    console.log('entro');
    const prods: Array<Producto> = JSON.parse(localStorage.getItem('productos'));
    this.listaProductos = prods;
    return this.listaProductos;
  }

  constructor(private data: DataSharingService) {
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => {
      this.message = message;
      const prods: Array<Producto> = JSON.parse(localStorage.getItem('productos'));
      this.listaProductos = prods.filter(p => p.categoria === this.message);
    });
    // this.cargarProductos();
  }

}
