abstract class GameEntity {
  protected position: p5.Vector;

  constructor(position: p5.Vector) {
    this.position = position;
  }

  public update() {}

  public draw() {
    // image(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
  }
}
