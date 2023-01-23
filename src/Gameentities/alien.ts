/// <reference path="enemy.ts" />

class Alien extends Enemy {
  private velocity: p5.Vector;


  constructor(position: p5.Vector) {
    const size = createVector(180, 150);
    super(position, size, alien);
    this.velocity = createVector(1, 3);
  }

  update() {
    this.position.x += this.velocity.x * deltaTime;
    if (this.position.x < -width/6 || this.position.x > width) {
      this.velocity.x = -this.velocity.x;
    }
    super.update();
  }
}