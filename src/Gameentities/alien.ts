/// <reference path="enemy.ts" />

class Alien extends GameEntity {
  public velocity: p5.Vector;

  constructor(position: p5.Vector) {
    const size = createVector(130, 100);
    const hp = 3;
    super(position, size, alien, hp);
    this.velocity = createVector(0.5, 1);
  }

  public update() {
    this.position.x += this.velocity.x * deltaTime;
    if (this.position.x < -width/6 || this.position.x > width) {
      this.velocity.x = -this.velocity.x;
    }
    super.update();
  }

  // public draw() {
    // image(this.image, this.position.x, this.position.y, this.size.x, this.size.y);

    // alien hitbox shape
    // push();
    // fill(255);
    // triangle(this.position.x + 2, this.position.y + 55, 
    //   this.position.x + this.size.x / 2, this.position.y - 2, 
    //   this.position.x + this.size.x - 2, this.position.y + 55);

    // ellipse(this.position.x + this.size.x / 2, 
    // this.position.y + 65, 
    // this.size.x, 
    // this.size.y - 35);
    // pop();
  // }
}