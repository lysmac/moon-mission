class SpaceShip extends GameEntity {
  private images: p5.Image[];
  private currentImageIndex: number;
  private timer: number;
  private delay: number;

  constructor(position: p5.Vector) {
    const size = createVector(50, 200);
    super(position, size, raket3);
    this.images = [raket3, raket4, raket5];
    this.currentImageIndex = 0;
    this.timer = 0;
    this.delay = 20;
  }

  private moveSpaceship() {
    if (keyIsDown(LEFT_ARROW) && this.position.x > 0) {
      this.position.x -= 10;
    }
    if (keyIsDown(RIGHT_ARROW) && this.position.x < width - this.size.x) {
      this.position.x += 10;
    }
  }

  public update() {
    this.moveSpaceship();
    this.timer++;
    if (this.timer % this.delay === 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }
  }

  public draw() {
    image(this.images[this.currentImageIndex], this.position.x, this.position.y, this.size.x, this.size.y);
  }
}
