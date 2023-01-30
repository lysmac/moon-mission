abstract class GameEntity {
  public position: p5.Vector;
  public size: p5.Vector;
  public hp: number
  public image: p5.Image;
  public speed: p5.Vector;

  constructor(position: p5.Vector, size: p5.Vector, image: p5.Image, hp: number) {
    this.position = position;
    this.size = size;
    this.speed = createVector(0, random(2, 10));
    this.image = image;
    this.hp = hp;
  }

  public update() {
    this.position.add(this.speed);
  }

  public draw() {
    image(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
  }
}