class Game {
  private position: p5.Vector;
  private isCircleVisible: boolean;

  constructor() {
    this.position = createVector(width * 0.5, height * 0.5);
    this.isCircleVisible = false;
  }

  public update() {
    this.position.set(mouseX, mouseY);
    this.isCircleVisible = mouseIsPressed;
  }

  public draw() {
    background('black');
    this.drawText();

    if (this.isCircleVisible) {
      this.drawCircle();
    }
  }

  public drawText() {
    push();
    fill('white');
    textSize(width * 0.1);
    textStyle('bold');
    textAlign('center');
    text('Click & Drag', width * 0.5, height * 0.5);
    pop();
  }

  public drawCircle() {
    push();
    fill('green');
    stroke('white');
    strokeWeight(width * 0.01);
    circle(this.position.x, this.position.y, width * 0.2);
    pop();
  }
}
