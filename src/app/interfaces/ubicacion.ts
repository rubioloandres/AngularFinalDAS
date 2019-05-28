export interface Coordenadas {
  latitud: number;
  longitud: number;
  precision: number;
}

export interface Ubicacion {
  codigoEntidadFederal: string;
  localidad: string;
}

export interface UbicacionNombres {
  provincia: string;
  localidad: string;
}


export interface MapData {
  latitud: number;
  longitud: number;
  precision: number;
  nombreUbicacion: string;
  direccion: string;
}


