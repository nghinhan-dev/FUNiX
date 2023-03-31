class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    return this.speed + 10;
  }

  brake() {
    return this.speed - 5;
  }
}

const BMW = new Car("", 120);
const Mercedes = new Car("", 95);
console.log("BMW accelerate:", BMW.accelerate());
console.log("Mercedes accelerate:", Mercedes.accelerate());
console.log("BMW brake:", BMW.brake(  ));
console.log("Mercedes brake:", Mercedes.brake(  ));
