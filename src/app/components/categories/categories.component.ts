import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../../services/datasharing.service';
import { Categoria } from './../../interfaces/categoria';
import { ActivatedRoute } from '@angular/router';
import { ResolvedCategorias } from 'src/app/models/resolved-categories.model';
import { CriterioBusquedaProducto } from 'src/app/interfaces/criterios';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  message: string;
  error: string;
  listaCategorias: Categoria [] = new Array();
  criterioBusqueda: CriterioBusquedaProducto;

  loadCategorias() {
    if (localStorage.getItem('categorias') !== null) {
    const categorias: Array<Categoria> = JSON.parse(localStorage.getItem('categorias'));
    this.listaCategorias = categorias;
    } else {
      this.listaCategorias = [];
    }
  }

  newMessage(categoria: string) {
    this.data.changeMessage(categoria);
  }

  newCriterio(cat: string) {
    const crit: CriterioBusquedaProducto = {
      idComercial: undefined,
      marca: undefined,
      categoria: cat,
      nombre: undefined
    };
    this.data.changeCriterioBusquedaProducto(crit);
  }

  constructor(
    private data: DataSharingService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.loadCategorias();
    // this.data.currentMessage.subscribe(message => this.message = message);
    this.data.currentCriterio.subscribe(criterio => this.criterioBusqueda = criterio);
  }

}


