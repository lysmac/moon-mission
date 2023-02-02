class Alien extends GameEntity {
  public velocity: p5.Vector;

  constructor(position: p5.Vector) {
    const size = createVector(130, 100);
    const hp = 3;
    super(position, size, alien, hp);
    this.velocity = createVector(0.5, 1);
  }

  public update() {
    // moving alien from side to side across the screen
    this.position.x += this.velocity.x * deltaTime;
    if (this.position.x < -width/6 || this.position.x > width) {
      this.velocity.x = -this.velocity.x;
    }
    super.update();
  }

  public getHitBox() {
    return {
      x: this.position.x + 10,
      y: this.position.y + 10,
      width: this.size.x - 20,
      height: this.size.y - 20,
    }
  }
}