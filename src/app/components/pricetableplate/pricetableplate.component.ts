
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Producto, ProductoIngrediente } from './../../interfaces/producto';
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
import { Menu, Plato } from 'src/app/interfaces/menu';

@Component({
  selector: 'app-pricetableplate',
  templateUrl: './pricetableplate.component.html',
  styleUrls: ['./pricetableplate.component.css']
})
export class PricetableplateComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = new Array();
  displayedColumns2: string[] = ['ingredienteColumnName', 'productoColumnName', 'precioColumnName'];
  precioTotalSucursal: TotalSucursal[] = new Array();
  listaSucursales: SucursalTablaPrecio[] = new Array();
  listaSucursalesOrdenadas: SucursalTablaPrecio [] = new Array();
  listaSucursalesAnterior: SucursalTablaPrecio[] = new Array();
  listaProductos: Producto[] = new Array();
  listaCadenasDisponibles: Cadena [] = new Array();
  listaCadenasNoDisponibles: CadenaSucursal [] = new Array();
  error: string;
  suscripcionPlato: Subscription;
  loading = true;
  ubicacion: Ubicacion;
  sucursalSeleccionada: SucursalTablaPrecio = undefined;
  indiceSucSel: number;
  listaPlatos: Plato [] = new Array();
  listaIngredientesPlato: ProductoIngrediente [] =  new Array();
  panelDetallesOpenState = false;
  precioTotal = Number.MAX_VALUE;

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
    console.log(this.displayedColumns);
  }

  loadPlato(idPlato: number) {
    let platotmp: Plato;
    const listaMenues: Menu [] =  JSON.parse(localStorage.getItem('menu'));
    if (listaMenues !== null && listaMenues.length > 0) {
      listaMenues.forEach(m => {
        platotmp = m.platos.find(p => p.idPlato === idPlato);
        if (platotmp !== undefined) {
          this.listaPlatos.push(platotmp);
        }
      }
      );
      console.log(this.listaPlatos);
    }
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
    this.suscripcionPlato = this.data.currentPlato.subscribe(
      idPlato => {
          this.loadPlato(idPlato);
          this.loadIngredientesPlato(idPlato);
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

  loadIngredientesPlato(idPlato: number) {
    const listaMenues: Menu [] =  JSON.parse(localStorage.getItem('menu'));
    if (listaMenues !== null && listaMenues.length > 0) {
      listaMenues.forEach(menu => {
      const tmpPlato = menu.platos.find(plato => plato.idPlato === idPlato);
      if (tmpPlato !== undefined) {
        tmpPlato.ingredientes
                .forEach(ingrediente => this.listaIngredientesPlato.push(ingrediente));
      }
      });
    }
  }

  completarNombreProducto(sucursal: SucursalTablaPrecio, ing: ProductoIngrediente): string {
    const producto = this.listaSucursales
                        .find( s => s === sucursal).productos
                        .find(p => p.idIngrediente === ing.idIngrediente);
    if (producto !== undefined) {
      return producto.nombre;
    } else {
      return 'No Disponible';
    }
  }

  completarPrecioProducto(sucursal: SucursalTablaPrecio, idingrediente: number): string {
    const producto = this.listaSucursales
                        .find( s => s === sucursal)
                        .productos
                        .find(p => p.idIngrediente === idingrediente);
    if (producto !== undefined) {
      return producto.precio.toString();
    } else {
      return 'No Disponible';
    }
  }

  mayorCantidadProductosDisponibles(suc: SucursalTablaPrecio) {
    let maxProds = 0;
    for (const sucursal of this.listaSucursales) {
      if (sucursal.productos.length) {
        maxProds = sucursal.productos.length;
      }
    }
    if (suc.productos.length === maxProds) { return true; } else { return false; }
  }

  todosProductosDisponibles(suc: SucursalTablaPrecio) {
    if (suc.productos.length === this.listaIngredientesPlato.length) {  return true;   }
    return false;
  }

  menorPrecioTotal(suc: SucursalTablaPrecio) {
    for (const sucursal of this.listaSucursales) {
      if (sucursal.total < this.precioTotal) {
        this.precioTotal = sucursal.total;
      }
    }
    if (suc.total === this.precioTotal) { return true; } else { return false; }
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
    this.updateSucursales();
  }

  ngOnDestroy() {
    this.suscripcionPlato.unsubscribe();
  }

}
