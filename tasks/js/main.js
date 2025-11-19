// ======= file: shapes.js =======

// Top-level module bindings
const PI = 3.14159;
let globalCount = 0;

function makeCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

export class Circle {
  #radius; // private field tracked by PrivateEnvironment Record

  constructor(r) {
    this.#radius = r;
    globalCount++; // uses outer module binding
  }

  area() {
    return PI * this.#radius * this.#radius; // accesses module bindings
  }

  static #shapeType = "circle"; // another private name tracked in PER

  static getType() {
    return Circle.#shapeType;
  }
}

export default makeCounter;
