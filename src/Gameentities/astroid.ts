/// <reference path="enemy.ts" />

class Astroid extends GameEntity {

  constructor(position: p5.Vector) {
    const size = createVector(125, 125);
    const hp = 2;
    super(position, size, asteroid, hp); 
  }

  // public update() {
  //   super.update();
  // }

  // public draw() {
    // image(this.image, this.position.x, this.position.y, this.size.x, this.size.y);

    // asteroid hitbox shape
    // push();
    // fill(255);
    // ellipse(this.position.x + this.size.x / 2,
    //   this.position.y + this.size.y / 2,
    //   this.size.x - 5,
    //   this.size.y - 5);
    // pop();
  // }
}