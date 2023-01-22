/// <reference path="enemy.ts" />

class Astroid extends Enemy {

  constructor(position: p5.Vector) {
    const size = createVector(random(100, 500), random(100, 500));
    super(position, size, asteroid);
    
  }
}