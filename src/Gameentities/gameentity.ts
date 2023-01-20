abstract class GameEntity {
  protected position: p5.Vector;
  protected size: p5.Vector;
  protected speed: p5.Vector;
  protected image: p5.Image;

  constructor(position: p5.Vector, size: p5.Vector, image: p5.Image) {
    this.position = position;
    this.size = size;
    this.speed = createVector(0, random(2, 10));
    this.image = image;
  }

  public update() {
    this.position.add(this.speed);
  }

  public draw() {
    image(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
  }
}
