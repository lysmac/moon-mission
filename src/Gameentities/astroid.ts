/// <reference path="enemy.ts" />

class Astroid extends Enemy {

  constructor(position: p5.Vector) {
    const size = createVector(125, 125);
    super(position, size, asteroid);
  }
}