import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Dia } from 'src/app/interfaces/dia';
import { Menu } from 'src/app/interfaces/menu';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css']
})
export class HealthComponent implements OnInit {

  diasDeSemana: Dia [] = new Array();
  diaActual: Dia;
  menuSemanal: Menu [] = new Array();
  menuDiario: Menu;

  customOptions: any = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay: true,
    navSpeed: 600,
    navText: [''],
    responsive: {
      0: {
        items: 1
      } ,
      200: {
        items: 1
      },
      400: {
        items: 1
      },
      600: {
        items: 1
      }
    },
    nav: false
  };

  cargarSemana() {
    const startOfWeek = moment().startOf('isoWeek');
    const endOfWeek = moment().endOf('isoWeek');

    let dia: Dia;
    const days = [];
    let day = startOfWeek;
    const currentDay = moment().locale('es').format('dddd');
    let nombreDia: string;
    while (day <= endOfWeek) {
        days.push(day.toDate());
        nombreDia = day.locale('es').format('dddd').toUpperCase();
        dia = {
            nombre: nombreDia
          , numero: day.format('DD')
          , mes: day.format('MMMM').toUpperCase()
          , actual: (currentDay === day.locale('es').format('dddd') ? ( this.cargarMenuDiario(nombreDia) ) : false)
        };
        day = day.clone().add(1, 'd');
        this.diasDeSemana.push(dia);
    }
  }

  cargarMenuSemanal() {
    this.menuSemanal = [
      { nombre: 'Verduras', dia: 'LUNES',
        platos: [{ nombre: 'Tortilla de Verduras', imagen: './../../../assets/img/menu/lunes/tortilla_verdura.jpg',
                   ingredientes: [{ nombre: 'Huevo', idComercial: '123456', cantidad: 6},
                                  { nombre: 'Pimienta (cucharada)', idComercial: '123456', cantidad: 0.25},
                                  { nombre: 'Oregano (cucharada)', idComercial: '123456', cantidad: 0.50},
                                  { nombre: 'Queso rallado (gr)', idComercial: '123456', cantidad: 50},
                                  { nombre: 'Aceite (cucharada)', idComercial: '123456', cantidad: 2},
                                  { nombre: 'Cebolla', idComercial: '123456', cantidad: 1},
                                  { nombre: 'Ajo (cucharada)', idComercial: '123456', cantidad: 0.2},
                                  { nombre: 'Vegetales mezclados (taza)', idComercial: '123456', cantidad: 2},
                                  { nombre: 'Tomate', idComercial: '123456', cantidad: 1}
                                ],
                   preparacion: `Bata los huevos con pimienta, orégano o albahaca, y queso en un cuenco o tazón mediano.
                   Caliente el aceite en una sartén medio. Añada cebolla, ajo, y otros vegetales y cocínelos a fuego medio
                   (300 grados F en una sartén eléctrica) hasta que estén tiernos.
                   Ponga la mezcla de huevos sobre los vegetales. Con el cuchillo o la espátula,
                   levante los bordes de los huevos para que la mezcla se mueva fácilmente en el fondo de la sartén.
                   Cocine hasta que los huevos estén cocinados a su gusto, más o menos 6 minutos. Ponga encima rebanadas de tomate.
                   Corte en 8 pedazos; sirva caliente.
                   Refrigere lo que sobre dentro de las siguientes 2 horas.`
                }]
      },
      { nombre: 'Pollo', dia: 'MARTES',
        platos: [{ nombre: 'Panqueques de Pollo', imagen: './../../../assets/img/menu/martes/panqueques_de_pollo.jpg',
                   ingredientes: [{ nombre: 'Pechuga Pollo (gr)', idComercial: '123456', cantidad: 700 },
                                  { nombre: 'Leche (cc)', idComercial: '123456', cantidad: 200 },
                                  { nombre: 'Harina (kg)', idComercial: '123456', cantidad: 1 },
                                  { nombre: 'Huevos', idComercial: '123456', cantidad: 6 },
                                  { nombre: 'Crema (cc)', idComercial: '123456', cantidad: 200 },
                                  { nombre: 'Queso rallado (gr)', idComercial: '123456', cantidad: 50 },
                                  { nombre: 'Aceite (cucharada)', idComercial: '123456', cantidad: 2 },
                                  { nombre: 'Aji (cucharada)', idComercial: '123456', cantidad: 0.5},
                                  { nombre: 'Sal (cucharada)', idComercial: '123456', cantidad: 0.5},
                                  { nombre: 'Pimienta (cucharada)', idComercial: '123456', cantidad: 0.25}
                                 ],
                   preparacion: `– Lavar la pechuga de pollo y poner en una olla con 4 tazas de agua.
                   Sazonar con sal, pimienta, orégano y aliños de su gusto. Cocinar a fuego alto hasta que hierva,
                    reducir el calor y cocinar tapado 20-25 minutos o hasta que el pollo esté cocido.
                    Retirar el pollo de la olla, colar y reservar el caldo para usarlo más adelante.
                   – Eliminar la piel del pollo, enfriar ligeramente, desmenuzar y reservar.
                   – En un recipiente, añadir la leche, 1 taza de agua, 3 huevos y 1 taza de harina.
                   Batir para incorporar todos los ingredientes y colar a otro recipiente.
                   – Calentar un sartén de unos 20 cm de diámetro y con la ayuda de un papel absorbente pintar
                   el fondo con aceite. Agregar 1/2 taza de la mezcla de panqueque y mover rápidamente el sartén
                   para esparcir la mezcla por todo el fondo. Cocinar 2-3 minutos hasta dorar, dar vuelta y cocinar
                   por el otro lado 1-2 minutos también hasta dorar. No dorar mucho para que no queden muy rígidos.
                   Repetir el proceso con el resto del batido hasta completar 8 panqueques.
                   – Calentar 3 tazas del caldo del pollo a fuego medio hasta hervir.
                   – En un bol aparte, poner 3/4 taza de harina y disolver con agua.
                   Agregar de a poco el caldo del pollo, revolviendo hasta que la mezcla espese.
                   Incorporar la crema, mezclar y sazonar con sal, pimienta, una pizca de orégano,
                    2 cucharadas de ají de color y la mitad del queso rallado.
                   – Reservar 3 tazas de la mezcla y al resto que queda agregar el pollo desmenuzado y revolver.
                   – Rellenar cada uno de los panqueques con 2 -3 cucharadas de la mezcla del pollo.
                   – Poner los panqueques rellenados en una fuente de horno,
                   cubrir con las 3 tazas de crema reservada, espolvorear con el resto del queso rallado y 1 cucharadita de ají de color.
                   – Cocinar en el horno hasta calentar y dorar. Servir caliente 2 panqueques por persona.que tengas en casa`
                }]
      },
      { nombre: 'Budin y Guisos', dia: 'MIERCOLES',
        platos: [{ nombre: 'Tortilla de Zanahorias', imagen: './../../../assets/img/menu/miercoles/tortilla_de_zanahoria.jpg',
                   ingredientes: [{ nombre: 'Cebolla', idComercial: '123456', cantidad: 1 },
                                  { nombre: 'Zanahoria', idComercial: '123456', cantidad: 4 },
                                  { nombre: 'Huevos', idComercial: '123456', cantidad: 2 },
                                  { nombre: 'Crema (cc)', idComercial: '123456', cantidad: 150 },
                                  { nombre: 'Aceite (cucharada)', idComercial: '123456', cantidad: 2 },
                                  { nombre: 'Perejil (cucharada)', idComercial: '123456', cantidad: 0.5},
                                  { nombre: 'Sal (cucharada)', idComercial: '123456', cantidad: 0.5},
                                  { nombre: 'Pimienta (cucharada)', idComercial: '123456', cantidad: 0.25}
                                 ],
                   preparacion: `Calentar a fuego medio-alto 1 cucharada de aceite en una sartén mediana
                   anti-adherente, agregar la cebolla picada y dejar dorar por 5-8 minutos hasta que este
                   empezando a cambiar de color.
                   Juntar la cebolla con la zanahoria rallada en un bol y revolver mezclando bien.
                   En un bol pequeño mezclar los huevos con la crema, perejil si desean, sal y pimienta,
                   batir por 2 minutos con un tenedor hasta que este espumoso.
                   En la misma sartén de la cebolla, la pueden limpiar con una toalla de papel (fuera del fuego)
                   calentar 1 cucharada de aceite a fuego medio, agregar la mezcla de zanahoria y cebolla
                   y aplastar bien de manera de cubrir toda la sartén de manera pareja, agregar de inmediato
                   la mezcla de huevos y dejar que escurra. Dejar cocinar la tortilla a fuego medio por unos
                   15 minutos, agitarla de vez en cuando para que no se pegue.
                   Cuando el centro este cocido (deje de estar húmedo) dar vuelta la tortilla,
                   yo lo hago con la ayuda de un plato y dejarla dorar por el otro lado unos 3 minutos mas.
                   Servir caliente o a temperatura ambiente, espolvoreada con ciboulette si desean.
                   Si no quieren dar vuelta la tortilla, pueden usar el broiler del horno para dorarla arriba,
                   quedan igual de bien. Yo hago eso en mi casa.`
                }]
      },
      { nombre: 'Legumbres', dia: 'JUEVES',
        platos: [{ nombre: 'Hummus', imagen: './../../../assets/img/menu/jueves/hummus.jpg',
                   ingredientes: [{ nombre: 'Garbanzos (gr)', idComercial: '123456', cantidad: 400 },
                                  { nombre: 'Limon', idComercial: '123456', cantidad: 0.5 },
                                  { nombre: 'Sesamo (cucharada)', idComercial: '123456', cantidad: 1 },
                                  { nombre: 'Ajo', idComercial: '123456', cantidad: 1 },
                                  { nombre: 'Caldo (taza)', idComercial: '123456', cantidad: 0.5 },
                                  { nombre: 'Comino (cucharada)', idComercial: '123456', cantidad: 0.5},
                                  { nombre: 'Aceite (cucharada)', idComercial: '123456', cantidad: 2},
                                  { nombre: 'Pimenton (cucharada)', idComercial: '123456', cantidad: 1}
                                 ],
                   preparacion: `Podemos usar garbanzos de bote o cocer los garbanzos. Si optamos por esta opción,
                   tenemos que dejar los garbanzos en remojo entre 8 y 12 horas en abundante agua.
                   A diferencia de otras legumbres, los garbanzos deben echarse en la olla cuando el agua esté
                   hirviendo, dejamos cocer durante 2 horas y le añadimos la sal al final.
                   Escurrimos y dejamos enfriar.
                   Echamos los garbanzos en una batidora o robot de cocina junto con el zumo de medio limón,
                   el tahín, el ajo, la sal, el comino y el caldo de cocción (o agua en caso de que los garbanzos
                    sean de bote) y batimos hasta crear una crema homogénea. Si se desea que el hummus quede
                    más líquido basta con añadir más caldo o agua.
                   Para la presentación del hummus vertemos la crema en un plato o cuenco y con una cuchara
                   creamos surcos en la superficie. Añadimos aceite de oliva virgen extra al gusto, aceitunas
                   y pimentón dulce para decorarlo. Por último, elegimos el acompañamiento deseado.`
                }]
      },
      { nombre: 'Pastas', dia: 'VIERNES',
        platos: [{ nombre: 'Tallarines alfredo', imagen: './../../../assets/img/menu/viernes/tallarines.jpg',
                   ingredientes: [{ nombre: 'Tallarines (gr)', idComercial: '123456', cantidad: 500 },
                                  { nombre: 'Jamon (gr)', idComercial: '123456', cantidad: 400 },
                                  { nombre: 'Leche (taza)', idComercial: '123456', cantidad: 1 },
                                  { nombre: 'Queso parmesano (taza)', idComercial: '123456', cantidad: 0.5 },
                                  { nombre: 'Margarina (gr)', idComercial: '123456', cantidad: 100 },
                                  { nombre: 'Sal (cucharada)', idComercial: '123456', cantidad: 1},
                                  { nombre: 'Perejil (hoja)', idComercial: '123456', cantidad: 2}
                                 ],
                   preparacion: `Cocina los tallarines como los sueles preparar.
                   Luego en una olla aparte debes derretir la mantequilla con la leche,
                   agregar el queso parmesano rallado y dejar a fuego lento por algunos minutos (revolver al mismo tiempo).
                   Después condimenta esta mezcla con sal al gusto y añade el jamón cortado en cuadrados.
                   Posteriormente agrega la salsa sobre los tallarines y finaliza decorando con perejil si deseas. ¡Provecho!`
                }]
      },
      { nombre: 'Carne', dia: 'SABADO',
        platos: [{ nombre: 'Bistec a la plancha', imagen: './../../../assets/img/menu/sabado/bistec_a_la_plancha.jpg',
                   ingredientes: [{ nombre: 'Filetes de carne', idComercial: '123456', cantidad: 2 },
                                  { nombre: 'Aceite (cucharada)', idComercial: '123456', cantidad: 2 },
                                  { nombre: 'Ajo', idComercial: '123456', cantidad: 1 },
                                  { nombre: 'Pimienta (cucharada)', idComercial: '123456', cantidad: 0.5 },
                                  { nombre: 'Comino (cucharada)', idComercial: '123456', cantidad: 0.5 },
                                  { nombre: 'Sal (cucharada)', idComercial: '123456', cantidad: 1}
                                 ],
                   preparacion: `Lo primero antes de preparar, debemos sazonar la carne con todos los aliños y
                   colocarlo a macerar con la salsa inglesa, por lo menos una media hora antes de cocer.
                   Luego colocamos la plancha o la sartén en fuego medio, cuando esté caliente añadimos un chorito minimo
                   de aceite y colocamos los filetes a cocinar. Debemos vigilar que doren bien sin llegar a resecarse,
                   por eso no debemos subir mucho la llama. Se pueden acompañar con arroz blanco, papas, puré,
                   y una fresca ensalada verde de lechuga, cebolla y tomate.`
                }]
      },
      { nombre: 'Pescado', dia: 'DOMINGO',
        platos: [{ nombre: 'Croquetas de Atun', imagen: './../../../assets/img/menu/domingo/croquetas_de_atun.jpg',
                   ingredientes: [{ nombre: 'Atun en lata', idComercial: '123456', cantidad: 2 },
                                  { nombre: 'Huevos', idComercial: '123456', cantidad: 2 },
                                  { nombre: 'Perejil (taza)', idComercial: '123456', cantidad: 0.25 },
                                  { nombre: 'Pan rallado (taza)', idComercial: '123456', cantidad: 0.5 },
                                  { nombre: 'Harina (taza)', idComercial: '123456', cantidad: 0.5 },
                                  { nombre: 'Sal (cucharada)', idComercial: '123456', cantidad: 1},
                                  { nombre: 'Pimienta (cucharada)', idComercial: '123456', cantidad: 0.5}
                                 ],
                   preparacion: `Retirar el atún de la lata y escurrir su líquido.
                   En un recipiente grande verter el atún, los huevos, el perejil y el pan rallado,
                   se salpimienta la preparación y se mezcla muy bien.
                   Se agrega harina a la mezcla, hasta crear consistencia.
                    Se arman las croquetas y se fríen.`
                }]
      }
    ];
  }

  getMenuDiario(dia: string) {
    return this.menuSemanal.find( menu => menu.dia === dia);
  }

  actualizarDia() {
    this.diaActual = {
      nombre: moment().locale('es').format('dddd'),
      numero: moment().format('DD'),
      mes: moment().format('MMMM').toUpperCase(),
      actual: true
    }
  }

  cargarMenuDiario(dia: string) {
    this.menuDiario = this.menuSemanal.find( menu => menu.dia === dia);
    return true;
  }

  constructor() { }

  ngOnInit() {
    this.cargarMenuSemanal();
    this.cargarSemana();
    this.actualizarDia();

  }

}
