import { Component, OnInit, OnDestroy } from '@angular/core';
import { Producto, ProductoPrecio } from './../../interfaces/producto';
import { Sucursal, TotalSucursal, SucursalInfo, SucursalTablaPrecio } from './../../interfaces/sucursal';
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
import { MenuService } from 'src/app/services/indec/menu.service';

@Component({
  selector: 'app-pricetable',
  templateUrl: './pricetable.component.html',
  styleUrls: ['./pricetable.component.css']
})
export class PricetableComponent implements OnInit, OnDestroy {

  displayedColumns = new Array();
  precioTotalSucursal: TotalSucursal[] = new Array();
  listaSucursales: SucursalTablaPrecio[] = new Array();
  listaProductos: Producto[] = new Array();
  listaCadenasDisponibles: Cadena [] = new Array();
  listaCadenasNoDisponibles: CadenaSucursal [] = new Array();
  cantidadDeColumnas = 4;
  error: string;
  suscripcionCodigos: Subscription;
  suscripcionPlato: Subscription;
  suscripcionProducto: Subscription;
  loading = true;
  ubicacion: Ubicacion;

  agregarDatosSucursal(suc: Sucursal): SucursalTablaPrecio {
    const sucursalTablaPrecio: SucursalTablaPrecio = {
      idSucursal: suc.idSucursal,
      nombreSucursal: suc.nombreSucursal,
      direccion: suc.direccion,
      latitud: suc.latitud,
      longitud: suc.longitud,
      email: suc.email,
      telefono: suc.telefono,
      cuit: suc.cuit,
      localidad: suc.localidad,
      provincia: suc.provincia,
      codigoEntidadFederal: suc.codigoEntidadFederal,
      idCadena: suc.idCadena,
      productos: suc.productos,
      mejorOpcion: suc.mejorOpcion,
      CantidadDeProductosConPrecioMasBajo: suc.CantidadDeProductosConPrecioMasBajo,
      total: suc.total,
      imagenCadena: this.getCadena(suc.idCadena).imagenCadena,
      nombreCadena: this.getCadena(suc.idCadena).nombreCadena
    };
    return sucursalTablaPrecio;
  }

  agregarDatosSucursales(suc: Sucursal[]): SucursalTablaPrecio[] {
    return suc.map(s => this.agregarDatosSucursal(s));
  }

  esMejorPrecio(idCad: number, idSuc: number, idProd: string) {
    const sucursal: Sucursal = this.listaSucursales
                               .find (suc => (suc.idCadena === idCad) && (suc.idSucursal === idSuc));
    const producto = sucursal.productos.find( prod => prod.codigoDeBarras === idProd);
    if (producto !== undefined && (producto.mejorPrecio)) {
      return true;
    } else {
      return false;
    }
  }

  cadenasNoDisp() {
    if ( (this.listaCadenasNoDisponibles !== null)) {
      return true;
    }
    return false;
  }

  loadCadenas() {
    this.listaCadenasDisponibles = JSON.parse(localStorage.getItem('cadenas'));
  }

  loadColumns() {
    this.actualizarCantidadColumnas();
    console.log(this.cantidadDeColumnas);
    this.displayedColumns.push('item');
    for (const suc of this.listaSucursales) {
      this.displayedColumns.push('sucursal' + ( (this.listaSucursales.indexOf(suc)) + 1));
    }
    console.log(this.displayedColumns);
  }

  loadProductos() {
    this.listaProductos =  JSON.parse(localStorage.getItem('carrito'));
  }

  getProductoPriceBySucursal(indexSuc: number, idProd: string) {
    const pp: ProductoPrecio = this.listaSucursales[indexSuc]
                                     .productos
                                     .find(p => p.codigoDeBarras === idProd);
    if (pp === undefined) {
      return 'No Disponible';
    } else {
      return '$ ' + pp.precio;
    }
  }

  removeProduct(idprod: string) {
    const prodscart: Producto [] = JSON.parse(localStorage.getItem('carrito'));
    this.listaProductos = prodscart.filter(p => p.codigoDeBarras !== idprod);
    localStorage.setItem('carrito', JSON.stringify(this.listaProductos));
  }

  getCadena(id: number) {
    return this.listaCadenasDisponibles.find(cad => cad.idCadena === id);
  }

  openDialogInfo(suc: Sucursal): void {
    const cadenaSuc = this.getCadena(suc.idCadena);
    const dialogRef = this.dialog.open(DialogInfoSucursalComponent, {
      width: '500px',
      data: {   nombreCadena: cadenaSuc.nombreCadena,
                imagenCadena: cadenaSuc.imagenCadena,
                nombreSucursal: suc.nombreSucursal,
                direccion: suc.direccion,
                latitud: suc.latitud,
                longitud: suc.longitud}
    });
  }

  updateSucursales() {
    this.suscripcionCodigos = this.data.currentCodigos.subscribe(codigos => {
      if (codigos === 'default codigos') {
        this.compararPorPlato();
      } else {
        console.log(codigos);
        this.compararPrecios(codigos);
      }
    });
  }

  compararPorPlato() {
    this.suscripcionPlato = this.data.currentPlato.subscribe(
      idPlato => {
        if (idPlato === 0) {
          this.compararPorProducto();
        } else {
          console.log(idPlato);
          this.sMen.getPrecioPlato(this.ubicacion.codigoEntidadFederal, this.ubicacion.localidad, idPlato)
                   .subscribe(
                     cadenas => {
                       this.loading = false;
                       console.log(cadenas);
                       cadenas.forEach( cadena => {
                          if (cadena.disponible) {
                            this.listaSucursales = this.listaSucursales.concat(this.agregarDatosSucursales(cadena.sucursales));
                          } else {
                            this.listaCadenasNoDisponibles.push(cadena);
                          }
                       });
                       console.log('HTTP Response Comparador plato success');
                       console.log(this.listaSucursales);
                       this.loadColumns();
                     }, err => {
                        console.log('HTTP Error Comparador plato', err);
                        this.error = err;
                        this.loading = false;
                     }, () => console.log('HTTP Request Comparador plato completed')
                   );
        }
      }
    );
  }

  compararPorProducto() {
    this.suscripcionProducto = this.data.currentProducto.subscribe(
      producto => {
        if (producto !== undefined) {
          console.log(producto);
          this.listaProductos = new Array();
          this.listaProductos.push(producto);
          this.compararPrecios(producto.codigoDeBarras);
        }
      }
    );
  }

  compararPrecios(codigos: any) {
    this.sCad.getComparacionINDEC(this.ubicacion.codigoEntidadFederal, this.ubicacion.localidad, codigos.toString()   )
        .subscribe( cadenas  =>  {
                this.loading = false;
                console.log(cadenas);
                cadenas.forEach(cadena => {
                  if (cadena.disponible) {
                    this.listaSucursales = this.listaSucursales.concat(this.agregarDatosSucursales(cadena.sucursales));
                  } else {
                    this.listaCadenasNoDisponibles.push(cadena);
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
  }

  sucursalesEmpty() {
   if (this.listaSucursales.length > 0) {
    return false;
   } else {
     return true;
   }
  }

  actualizarCantidadColumnas() {
    if (this.listaSucursales !== undefined) {
      if (this.listaSucursales.length < 4) {
        this.cantidadDeColumnas = this.listaSucursales.length;
      }
    }
  }

  cargarUbicacion() {
    const ub = localStorage.getItem('ubicacion');
    if (ub !== null) {
      this.ubicacion = JSON.parse(ub);
    }
  }

  constructor(
    private sCad: CadenasService,
    private sMen: MenuService,
    public dialog: MatDialog,
    private data: DataSharingService
  ) { }

  ngOnInit() {
    this.cargarUbicacion();
    this.loadCadenas();
    this.loadProductos();
    this.updateSucursales();
  }

  ngOnDestroy() {
    this.suscripcionCodigos.unsubscribe();
    this.suscripcionPlato.unsubscribe();
    this.suscripcionProducto.unsubscribe();
  }
}
