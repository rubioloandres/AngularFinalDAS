import { Component, OnInit, OnDestroy } from '@angular/core';
import { Producto, ProductoPrecio } from './../../interfaces/producto';
import { Sucursal, TotalSucursal, SucursalInfo } from './../../interfaces/sucursal';
import { Cadena, CadenaSucursal } from 'src/app/interfaces/cadena';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataSharingService } from 'src/app/services/datasharing.service';
import { Ubicacion } from 'src/app/interfaces/ubicacion';
import { CadenasService } from 'src/app/services/indec/cadenas.service';
import { ActivatedRoute } from '@angular/router';
import { ResolvedRespuestaComparador } from 'src/app/models/resolved-comparador.model';
import { resolve } from 'url';
import { DialogInfoSucursalComponent } from './../info/info.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pricetable',
  templateUrl: './pricetable.component.html',
  styleUrls: ['./pricetable.component.css']
})
export class PricetableComponent implements OnInit, OnDestroy {

  displayedColumns = new Array();
  precioTotalSucursal: TotalSucursal[] = new Array();
  listaSucursales: Sucursal[] = new Array();
  listaProductos: Producto[] = new Array();
  listaCadenas: Cadena [] = new Array();
  listaCadenasSinPrecios: CadenaSucursal [] = new Array();

  codigos: string;
  error: string;
  subscription: Subscription;
  loading = true;

  esMejorPrecio(idCad: number, idSuc: number, idProd: string) {
    const sucursal: Sucursal = this.listaSucursales
                          .filter(suc =>
                                (suc.idCadena === idCad) && (suc.idSucursal === idSuc))[0];
    const producto = sucursal.productos.find( prod => prod.idComercial === idProd);
    if (producto !== undefined && (producto.mejorPrecio)) {
      return true;
    } else {
      return false;
    }
  }

  cadenasNoDisp() {
    if ( (this.listaCadenasSinPrecios !== null)) {
      return true;
    }
    return false;
  }

  loadCadenas() {
    this.listaCadenas = JSON.parse(localStorage.getItem('cadenas'));
  }

  loadColumns() {
    this.displayedColumns.push('item');
    for (const suc of this.listaSucursales) {
      this.displayedColumns.push('sucursal' + ( (this.listaSucursales.indexOf(suc)) + 1));
    }
    this.displayedColumns.push('star');

    console.log(this.displayedColumns);
  }

  loadProductos() {
    this.listaProductos =  JSON.parse(localStorage.getItem('carrito'));
  }

  getProductoPriceBySucursal(indexSuc: number, idProd: string) {
    const pp: ProductoPrecio[] = this.listaSucursales[indexSuc]
                                     .productos
                                     .filter(p => p.idComercial === idProd);
    if (pp.length === 0) {
      return 'No Disponible';
    } else {
      return '$ ' + pp[0].precio;
    }
  }

  getTotal(indexSuc: number) {
    const tot  = this.listaSucursales[indexSuc]
                      .productos
                      .map(p => p.precio)
                      .reduce((total, precProd) => total + precProd, 0);
    this.precioTotalSucursal.push({numeroSucursal: indexSuc, totalPrecio: tot});
    return tot;
  }

  removeProduct(idprod: string) {
    const prodscart: Producto [] = JSON.parse(localStorage.getItem('carrito'));
    this.listaProductos = prodscart.filter(p => p.idComercial !== idprod);
    localStorage.setItem('carrito', JSON.stringify(this.listaProductos));
  }

  getCadena(id: number) {
    return this.listaCadenas.find(cad => cad.id === id);
  }

  openDialogInfo(suc: Sucursal): void {
    const cadenaSuc = this.getCadena(suc.idCadena);
    const dialogRef = this.dialog.open(DialogInfoSucursalComponent, {
      width: '500px',
      data: {   nombreCadena: cadenaSuc.nombre,
                imagenCadena: cadenaSuc.imagen,
                nombreSucursal: suc.nombreSucursal,
                direccion: suc.direccion,
                latitud: suc.lat,
                longitud: suc.lng}
    });
  }

  updateSucursales() {
    const ubicacion: Ubicacion = JSON.parse(localStorage.getItem('ubicacion'));
    this.subscription = this.data.currentCodigos.subscribe(codigos => {
      this.codigos = codigos;
      console.log(codigos);
      this.sCad.getComparacionINDEC(ubicacion.codigoEntidadFederal, ubicacion.localidad, this.codigos.toString()   )
      .subscribe( cadenas  =>  {
              this.loading = false;
              console.log(cadenas);
              cadenas.forEach(cadena => {
                if (cadena.disponibilidad === 'Disponible') {
                  this.listaSucursales = this.listaSucursales.concat(cadena.sucursales);
                } else {
                  this.listaCadenasSinPrecios.push(cadena);
                }
            });
              console.log('HTTP Response Comparador success');
              console.log(this.listaSucursales);
              this.loadColumns();
        }, err => {
            console.log('HTTP Error Comparador ', err);
            this.error = err;
            this.loading = false;
        }, () => console.log('HTTP Request Comparador completed')
      );
    });
  }

  sucursalesEmpty() {
   if (this.listaSucursales.length > 0) {
    return false;
   } else {
     return true;
   }
  }

  constructor(
    private sCad: CadenasService,
    public dialog: MatDialog,
    private data: DataSharingService
  ) { }

  ngOnInit() {
    this.loadCadenas();
    this.loadProductos();
    this.updateSucursales();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
