/// <reference path="enemy.ts" />

class Alien extends GameEntity {
  private velocity: p5.Vector;

  constructor(position: p5.Vector) {
    const size = createVector(130, 100);
    const hp = 2;
    super(position, size, alien, hp);
    this.velocity = createVector(0.5, 1);
  }

  update() {
    this.position.x += this.velocity.x * deltaTime;
    if (this.position.x < -width/6 || this.position.x > width) {
      this.velocity.x = -this.velocity.x;
    }
    super.update();
  }
}