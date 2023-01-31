class Star {
  private x: number;
  private y: number;
  private speed: number;

  constructor() {
    this.x = random(width);
    this.y = random(-height, 0);
    this.speed = random(1, 5);
  }

  public show() {
    stroke(255);
    point(this.x, this.y);
  }

  public fall() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = random(-height, 0);
    }
  }
}
