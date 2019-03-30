import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/interfaces/categoria';
import { DataSharingService } from 'src/app/services/datasharing.service';
import { Producto } from 'src/app/interfaces/producto';
import { Provincia } from 'src/app/interfaces/provincia';
import { Localidad } from 'src/app/interfaces/localidad';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
/*
export interface User {
  name: string;
}
*/
@Component({
  selector: 'app-searchfilter',
  templateUrl: './searchfilter.component.html',
  styleUrls: ['./searchfilter.component.css']
})
export class SearchfilterComponent implements OnInit {

  listaCategorias: Categoria[] = new Array();
  listaMarcas: string [] = new Array ();
  listaProvincias: Provincia [] = new Array();
  listaLocalidades: Localidad [] = new Array();
  message: string;

  formProvincia = new FormControl();
/*
  options: User[] = [
    {name: 'Mary'},
    {name: 'Shelley'},
    {name: 'Igor'}
  ];
  filteredOptions: Observable<User[]>;*/
  filteredProvincias: Observable<Provincia[]>;


  displayFn(prov?: Provincia): string | undefined {
    return prov ? prov.nombre : undefined;
  }

  private _filter(nombre: string): Provincia[] {
    const filterValue = nombre.toLowerCase();
    return this.listaProvincias.filter(prov =>
      prov.nombre.toLowerCase().normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '').indexOf(filterValue) === 0);
  }

  filtrarProvincias() {
    this.filteredProvincias = this.formProvincia.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.listaProvincias.slice())
    );
  }

  loadCategories() {
    const lcat = localStorage.getItem('categorias');
    if (lcat !== null) {
      this.listaCategorias = JSON.parse(lcat);
    } else {
      this.listaCategorias = [];
    }
  }

  loadProvinces() {
    // localStorage.setItem('provincias', JSON.stringify(this.listaProvincias));
    this.listaProvincias = JSON.parse(localStorage.getItem('provincias'));
  }

  newMessage(categoria: string) {
    this.data.changeMessage(categoria);
  }

  getLocalidadesByProvincia(idProvincia: number) {
    const lloc: Localidad[] = JSON.parse(localStorage.getItem('localidades'));
    this.listaLocalidades = lloc.filter(loc => loc.idProvincia === idProvincia);
    console.log(this.listaLocalidades);
  }


  constructor(
    private data: DataSharingService
  ) { }

  ngOnInit() {
    this.loadCategories();
    this.loadProvinces();
    this.filtrarProvincias();
    this.data.currentMessage.subscribe(message => {
      this.message = message;
      this.listaMarcas = [];
      const lprod: Producto [] = JSON.parse(localStorage.getItem('productos'));
      if (lprod !== null) {
        lprod.forEach(prod => {
          if (prod.categoria === this.message) {
            this.listaMarcas.push(prod.marca);
          }
        });
      }
    });
  }

}
