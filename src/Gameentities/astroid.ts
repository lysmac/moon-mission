/// <reference path="enemy.ts" />

class Astroid extends Enemy {
  // private image: p5.Image;
  // private speed: p5.Vector;
  // private size: p5.Vector;

  constructor(position: p5.Vector) {
    const size = createVector(random(100, 500), random(100, 500));
    super(position, size, asteroid);

    // this.image = loadImage('/assets/Astroid.png');
    // this.speed = createVector(0, random(2, 10));
    // this.size = createVector(random(100, 500), random(100, 500));
  }
}