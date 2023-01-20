class Star {
  x: number;
  y: number;
  speed: number;

  constructor() {
    this.x = random(width);
    this.y = random(-height, 0);
    this.speed = random(1, 5);
  }

  show() {
    stroke(255);
    point(this.x, this.y);
  }

  fall() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = random(-height, 0);
    }
  }
}