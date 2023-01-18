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

class Background {
  private stars: Star[];

  constructor() {
    this.stars = [];
    for (let i = 0; i < 1000; i++) {
        this.stars[i] = new Star();
    }
  }

  
  public update() {
    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i].fall();
  }
  }
  
  public draw() {
    background(0);
    for (let i = 0; i < this.stars.length; i++) {
        this.stars[i].show();
    }
  }
}