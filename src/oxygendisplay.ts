class OxygenDisplay {
  private position: p5.Vector;
  private size: p5.Vector;
  public oxygenLevel: number;
  public maxOxygenLevel: number;
  private color: string;
  private intervalId: any;
  private isPaused: boolean;

  constructor() {
    this.position = createVector(50, 100);
    this.size = createVector(20, 600);
    this.oxygenLevel = 100;
    this.maxOxygenLevel = 100;
    this.color = 'green';
    this.isPaused = false;

    this.intervalId = setInterval(() => {
      if ( this.isPaused) {
        return
      }
      this.update();
    }, 1000);
  }

  public update() {
    this.oxygenLevel -= 10;
    if (this.oxygenLevel < this.maxOxygenLevel / 2) {
      this.color = 'yellow';
    }
    if (this.oxygenLevel < this.maxOxygenLevel / 4) {
      this.color = 'red';
    }
    if (this.oxygenLevel <= 0) {
      clearInterval(this.intervalId);
    }
  }

  public draw() {
    stroke(255);
    fill(this.color);
    let barHeight = this.size.y * (this.oxygenLevel / this.maxOxygenLevel);
    rect(this.position.x, this.position.y + (this.size.y-barHeight), this.size.x, barHeight);
    textSize(15);
    text(`Oxygen: ${this.oxygenLevel}`, this.position.x, this.position.y - 10);
    this.flashScreen();
  }

  public pause() {
    this.isPaused = true;
  }

  public resume() {
    this.isPaused = false;
  }

  public flashScreen() {
    if (this.color === 'red') {
      let opacity = 50 + 50 * sin(frameCount * 5);
      let startColor = color(255, 0, 0, opacity);
      let endColor = color(255, 0, 0, 0);
      let rectHeight = 80 / 10;
  
      for (let i = 0; i < 10; i++) {
        let color = lerpColor(startColor, endColor, i / 10);
        noStroke();
        fill(color);
        rect(0, i * rectHeight, width, rectHeight);
        rect(0, height - (i + 1) * rectHeight, width, rectHeight);
      }
    }
  }
}