import { CadenaSucursal } from './cadena';

export interface EstadoRespuesta {
  codigo: number;
  mensaje: string;
}

export interface Respuesta {
  estado: EstadoRespuesta;
  sucursales: CadenaSucursal [];
}
