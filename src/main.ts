import { reservas } from "./constants";

//objeto es calcular el subtotal (precio sin IVA) y el total de las reservas que ha hecho un cliente.

/* Caso 1
En el caso de un cliente particular:

Habitación / día (IVA No Incluido):
Standard: 100 €.
Suite: 150 €.
Cargos adicionales:
Por cada persona adicional sumarle 40 € al precio de cada noche.
IVA sumarle un 21% al total.
Crear una clase que reciba la lista de reservas y calcule el subtotal y el total teniendo en cuenta los anteriores requisitos
*/

class Reservas {
  tipoHabitacion: "standard" | "suite"; //this is not assigning a string, its assigning ONLY these 2 strings
  pax: number;
  noches: number;
  desayuno: boolean;

  constructor(
    tipoHabitacion: "standard" | "suite",
    pax: number,
    noches: number,
    desayuno: boolean
  ) {
    this.tipoHabitacion = tipoHabitacion;
    this.pax = pax;
    this.noches = noches;
    this.desayuno = desayuno;
  }

  calcularSubtotal(): number {
    // const desayuno: number = this.desayuno ? 
    //   this.noches * this.pax * 15 : 0; 
    const desayuno = (): number => {
      let precio = 0;
      if (this.desayuno) {
        precio = this.noches * this.pax * 15;
      }
      return precio
    };
    const multiplier: number = this.tipoHabitacion === "suite" ? 150 : 100;
    let personaAdicional: number = this.pax > 1 ? this.pax - 1 : 0;
    return this.noches * multiplier + personaAdicional * 40 * this.noches + desayuno();
  }

  calcularTotal(): number {
    return this.calcularSubtotal() * 0.21 + this.calcularSubtotal();
  }
}

const caso1 = new Reservas("standard", 2, 1, true);
console.log(caso1);
console.log("Subtotal:", caso1.calcularSubtotal());
console.log("Total:", caso1.calcularTotal());
const caso2 = new Reservas("suite", 1, 3, false);
console.log(caso2);
console.log("Subtotal:", caso2.calcularSubtotal());
console.log("Total:", caso2.calcularTotal());

/* CASO 2
Cubrimos el caso de un tour operador, al reservar grandes volúmenes, le damos las siguientes condiciones especiales:

Todas las habitaciones tienen el mismo precio (100 €).
Adicionalmente se le aplica un 15 % de descuento a los servicios contratados.
Crear una clase que herede de la primera que cubra el caso del cálculo de totales y subtotales para el tour operador.
*/

class Tour extends Reservas {
  //additional params here

  constructor(tipoHabitacion: "standard", pax: number, noches: number, desayuno: boolean) {
    super(tipoHabitacion, pax, noches, desayuno);
    //additional params here
  }
  calcularSubtotal(): number {
    const desayuno = (): number => {
      let precio = 0;
      if (this.desayuno) {
        precio = this.noches * this.pax * 15;
      }
      return precio
    };
    let personaAdicional: number = this.pax > 1 ? this.pax - 1 : 0;
    return (this.noches * 100 + personaAdicional * 40 * this.noches + desayuno()) * 0.85;
  }
}

const group = new Tour("standard", 2, 1, true);
console.log(group);
console.log("Subtotal:", group.calcularSubtotal());
console.log("Total:", group.calcularTotal());
const group1 = new Tour("standard", 1, 3, false);
console.log(group1);
console.log("Subtotal:", group1.calcularSubtotal());
console.log("Total:", group1.calcularTotal());

/* Desafio
Crear una clase base con la funcionalidad común, y dos clases hijas una con el caso para cliente particular y otra para tour operador.

En el constructor de la clase base, introduce la lista de precios de habitaciones, ¿Qué tendrás que hacer para que en el hijo puedas inicializar la clase?
*/

//Parte Adidicional

const reservasArray = reservas.map(
  reserva => new Reservas(reserva.tipoHabitacion, reserva.pax, reserva.noches, reserva.desayuno)
);

reservasArray.forEach(reserva => {
  console.log('Subtotal:', reserva.calcularSubtotal())
  console.log('Total:', reserva.calcularTotal())
})