class AmmunitionDisplay {
  private position: p5.Vector;
  private size: p5.Vector;
  private color: string;
  public currentAmmo: number;
  private maxAmmo: number;
  public cooldownBar: number;
  public timer: number;
  public delay: number;

  constructor() {
    this.position = createVector(60, height - 50);
    this.size = createVector(100, 10);
    this.color = "white";
    this.maxAmmo = 15;
    this.currentAmmo = 15;
    this.cooldownBar = 1;
    this.timer = 0;
    this.delay = 3;
  }

  public update() {
    if (this.currentAmmo < 6) {
      this.color = "red";
    } else {
      this.color = "white";
    }

    if (this.timer % this.delay === 0) {
        this.cooldownBar += 1;
        this.timer = 0;
    }
    this.timer++;
  }

  public draw() {
    push();
    textSize(20);
    fill(this.color);
    text(
      `${this.currentAmmo} / ${this.maxAmmo}`,
      this.position.x,
      this.position.y
    );
    pop();

    if (this.currentAmmo == 0) {
      push();
      fill(255)
      rect(this.position.x - 50, this.position.y + 15, this.size.x, this.size.y);

      fill(140);
      rect(this.position.x - 50, this.position.y + 15, this.cooldownBar, this.size.y);
      pop();
    }
  }
}
