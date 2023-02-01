abstract class GameEntity {
  public position: p5.Vector;
  public size: p5.Vector;
  public hp: number
  public image: p5.Image;
  private defaultSpeed: p5.Vector;
  public currentSpeed: p5.Vector;
  private boostedSpeed: p5.Vector;

  constructor(position: p5.Vector, size: p5.Vector, image: p5.Image, hp: number) {
    this.position = position;
    this.size = size;
    this.image = image;
    this.hp = hp;
    this.defaultSpeed = createVector(0, random(2, 10));
    this.currentSpeed = this.defaultSpeed;
    this.boostedSpeed = createVector(0, 30);
  }

  public update() {
    this.position.add(this.currentSpeed);
  }

  public draw() {
    image(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
  }

  public boostCurrentSpeed(endTime: number) {
    this.currentSpeed = this.boostedSpeed;
    const remainingTime = endTime - Date.now();


    setTimeout(() => {
      this.currentSpeed = this.defaultSpeed;
    }, remainingTime);
  }
}