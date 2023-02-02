class Earth {
  private y: number;
  private speed: number;
  public isDisplayed: boolean;

  constructor() {
    this.y = 0;
    this.speed = 2;
    this.isDisplayed = false;
  }

  public update() {
    this.y += this.speed;
  }

  public draw() {
    noStroke();
    fill(34, 139, 34);
    ellipse(width / 2, this.y + height / 1.2, width * 2.3, height * 0.8);
  }
}
