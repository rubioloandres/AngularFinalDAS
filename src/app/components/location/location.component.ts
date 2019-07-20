import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject, Component, OnInit } from '@angular/core';
import { Provincia } from 'src/app/interfaces/provincia';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Localidad } from 'src/app/interfaces/localidad';
import { startWith, map } from 'rxjs/operators';
import { Ubicacion } from 'src/app/interfaces/ubicacion';
import { GeoLocationService } from 'src/app/services/geoLocation.service';
import { DataSharingService } from 'src/app/services/datasharing.service';
import { ProvinciasService } from 'src/app/services/indec/provincias.service';

@Component({
  selector: 'app-dialog-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})

export class DialogLocationComponent implements OnInit {

  listaProvincias: Provincia[] = new Array();
  formProvincia = new FormControl();
  filteredProvincias: Observable<Provincia[]>;

  listaLocalidades: Localidad[] = new Array();
  formLocalidad = new FormControl();
  filteredLocalidades: Observable<Localidad[]>;

  ubicacion: Ubicacion;

  displayFnP(prov?: Provincia): string | undefined {
    return prov ? prov.nombreProvincia : undefined;
  }

  displayFnL(loc?: Localidad): string | undefined {
    return loc ? loc.nombreLocalidad : undefined;
  }

  private _filterP(nombre: string): Provincia[] {
    const filterValue = nombre.toLowerCase();
    return this.listaProvincias.filter(prov =>
      prov.nombreProvincia.toLowerCase().normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '').indexOf(filterValue) === 0);
  }

  private _filterL(nombre: string): Localidad[] {
    const filterValue = nombre.toLowerCase();
    return this.listaLocalidades.filter(loc =>
      loc.nombreLocalidad.toLowerCase().normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '').indexOf(filterValue) === 0);
  }

  filtrarProvincias() {
    this.filteredProvincias = this.formProvincia.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterP(name) : this.listaProvincias.slice())
      );
  }

  filtrarLocalidades() {
    this.filteredLocalidades = this.formLocalidad.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterL(name) : this.listaLocalidades.slice())
      );
  }

  loadProvinces() { // TODO: cambiar nombre a  "cargarProvincias"
    this.listaProvincias = JSON.parse(localStorage.getItem('provincias'));
  }

  getLocalidadesByProvincia(codigoEntidadFederal: string) {
    const lloc: Localidad[] = JSON.parse(localStorage.getItem('localidades'));
    this.listaLocalidades = lloc.filter(loc => loc.codigoEntidadFederal === codigoEntidadFederal);
  }

  getAutomaticLocation() {
    this.loc.getCurrentLocation();
  }



  saveUbicacion(localidad: Localidad, provincia: Provincia) { // TODO: cambiar nombre a  "guardarUbicacion"
    
  const isNotUbicacionValida =(provincia.codigoEntidadFederal === undefined
                          || localidad.nombreLocalidad === undefined
                          || provincia.nombreProvincia === undefined)
  if (isNotUbicacionValida) 
    {
        console.log('Ubicacion invalida...')
    }
    else {
      const ubicacion: Ubicacion = {
        codigoEntidadFederal: provincia.codigoEntidadFederal,
        localidad: localidad.nombreLocalidad,
        provincia: provincia.nombreProvincia
      };

      //GuardaSession
      localStorage.setItem('ubicacion', JSON.stringify(ubicacion));

      this.dataS.changeUbicacion(ubicacion);
    }

  }

  hayUbicacion() {
    const ub = localStorage.getItem('ubicacion');
    if (ub !== null) {
      return true;
    }
    return false;
  }

  listoParaRegistrar() {
    if (this.formLocalidad.value !== null && this.formProvincia.value !== null) {
      return true;
    } else {
      return false;
    }
  }

  constructor(
    private loc: GeoLocationService,
    private dataS: DataSharingService,
    public dialogRef: MatDialogRef<DialogLocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
    this.loadProvinces();
    this.filtrarProvincias();
    this.filtrarLocalidades();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
