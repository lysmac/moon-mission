/// <reference path="enemy.ts" />

class Astroid extends GameEntity {

  constructor(position: p5.Vector) {
    const size = createVector(125, 125);
    const hp = 2;
    super(position, size, asteroid, hp); 
  }
}