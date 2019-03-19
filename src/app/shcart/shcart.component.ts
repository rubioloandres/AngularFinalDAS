import { Component, OnInit } from '@angular/core';

export interface Producto {
  nombre: string;
  categoria: string;
  imagen: string;
}

@Component({
  selector: 'app-shcart',
  templateUrl: './shcart.component.html',
  styleUrls: ['./shcart.component.css']
})
export class ShcartComponent implements OnInit {

  displayedColumns = ['item', 'nombre', 'categoria', 'accion'];

  listaProductos: Producto[] = [
    { nombre: 'Pan Bimbo', categoria: 'Pan', imagen: '../../assets/img/pan_bimbo.png' },
    { nombre: 'Galletitas surtidas Bagley', categoria: 'Galletitas Dulces', imagen: '../../assets/img/surtido-bagley.jpg'},
    { nombre: 'Azucar Ledesma 1kg', categoria: 'Azucar', imagen: '../../assets/img/azucar_ledesma.png' },
    { nombre: 'Pan Lactal', categoria: 'Pan', imagen: '../../assets/img/pan_lactal.png' },
    { nombre: 'Galletitas surtidas Arcor', categoria: 'Galletitas Dulces', imagen: '../../assets/img/surtidas_arcor.jpg'},
  ];

  /** Gets the total cost of all transactions. */
  getTotalCost() {
   // return this.listaProductos.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  constructor() { }

  ngOnInit() {
  }

}
