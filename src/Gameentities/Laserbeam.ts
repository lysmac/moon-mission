class LaserBeam {
  public position: p5.Vector;
  public size: p5.Vector;
  private speed: number;
  private color: p5.Color;

  constructor(x: number, y: number) {
    this.position = createVector(x, y);
    this.speed = 15;
    this.size = createVector(5, 30);
    this.color = color(124,252,0);
  }
  
  public update() {
    this.position.y -= this.speed;
  }
  
  public draw() {
    fill(this.color);
    rect(this.position.x, this.position.y, this.size.x, this.size.y);
  }
}