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

  displayedColumns: string[] = new Array();
  precioTotalSucursal: TotalSucursal[] = new Array();
  listaSucursales: SucursalTablaPrecio[] = new Array();
  listaSucursalesOrdenadas: SucursalTablaPrecio [] = new Array();
  listaSucursalesAnterior: SucursalTablaPrecio[] = new Array();
  listaProductos: Producto[] = new Array();
  listaCadenasDisponibles: Cadena [] = new Array();
  listaCadenasNoDisponibles: CadenaSucursal [] = new Array();
  error: string;
  suscripcionCodigos: Subscription;
  suscripcionProducto: Subscription;
  loading = true;
  ubicacion: Ubicacion;
  sucursalSeleccionada: SucursalTablaPrecio = undefined;
  indiceSucSel: number;

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
      cantidadDeProductosConPrecioMasBajo: suc.cantidadDeProductosConPrecioMasBajo,
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
    const sucursal: Sucursal = this.listaSucursalesAnterior
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
    const n = this.calcularCantidadColumnas();
    this.displayedColumns.push('item');
    let i = 1;
    while (i <= n)  {
      this.displayedColumns.push('sucursal' + i);
      i++;
    }
    this.listaSucursalesOrdenadas = this.listaSucursales.sort(  (suc1, suc2) => {
      if ( suc1.cantidadDeProductosConPrecioMasBajo > suc2.cantidadDeProductosConPrecioMasBajo) {  return -1; }
      if ( suc1.cantidadDeProductosConPrecioMasBajo < suc2.cantidadDeProductosConPrecioMasBajo) {  return 1; }
      return 0;
    });
    this.listaSucursalesAnterior = this.listaSucursalesOrdenadas;
    this.listaSucursalesOrdenadas = this.listaSucursalesOrdenadas.slice(0, 4);
  }

  loadProductos() { // controlar que ocurre cuando esto es undefined o null
    this.listaProductos =  JSON.parse(localStorage.getItem('carrito'));
  }

  getProductoPriceBySucursal(sucursal: SucursalTablaPrecio, idProd: string) {
    const precioProd = this.listaSucursales.find( s => s === sucursal).productos.find(p => p.codigoDeBarras === idProd).precio;
    if (precioProd === 0) {
      return 'No Disponible';
    } else {
      return '$ ' + precioProd;
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
        this.compararPorProducto();
      } else {
        console.log(codigos);
        this.compararPrecios(codigos);
      }
    });
  }

  compararPorProducto() {
    this.suscripcionProducto = this.data.currentProducto.subscribe(
      producto => {
        if (producto.codigoDeBarras !== 'string' ) {
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
                this.loadColumns();
          }, err => {
              console.log('HTTP Error Comparador ', err);
              this.error = err;
              this.loading = false;
          }, () => console.log('HTTP Request Comparador completed')
        );
  }

  sucursalesEmpty() {
    if (this.listaSucursalesOrdenadas.length > 0) {
      return false;
      } else {
        return true;
    }
  }

  calcularCantidadColumnas() {
    if (this.listaSucursales !== undefined) {
      if (this.listaSucursales.length < 4) {
        return this.listaSucursales.length;
      } else {
        return 4;
      }
    }
  }

  cargarUbicacion() {
    const ub = localStorage.getItem('ubicacion');
    if (ub !== null) {
      this.ubicacion = JSON.parse(ub);
    }
  }

  cambiarSucursalSeleccionada(suc: SucursalTablaPrecio, indexSuc: number) {
    this.sucursalSeleccionada = suc;
    this.indiceSucSel = indexSuc;
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
    if (this.suscripcionCodigos !== undefined) {  this.suscripcionCodigos.unsubscribe(); }
    if (this.suscripcionProducto !== undefined) { this.suscripcionProducto.unsubscribe(); }
  }
}
