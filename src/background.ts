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

class Atmosphere {
  y: number;
  speed: number;
  alphaValue: number;
  isDisplayed: boolean;

  constructor() {
    this.y = 0;
    this.speed = 2;
    this.alphaValue = 255;
    this.isDisplayed = false;

  }

  display() {
    noStroke();
    fill(135, 206, 235, this.alphaValue);
    ellipse(width/2, this.y+height/2, width*2.3, height*2);
    this.isDisplayed = true;

  }

  move() {
    this.y += this.speed;
    this.alphaValue -= .4;
    if (!this.isDisplayed) {
      this.y += this.speed;
      this.alphaValue -= .5;
    }
  }
}
class Earth {
  y: number;
  speed: number;
  isDisplayed: boolean;

  constructor() {
    this.y = 0;
    this.speed = 2;
    this.isDisplayed = false;

  }

  display() {
    noStroke();
    fill(34,139,34);
    ellipse(width/2, this.y+height/1.2, width*2.3, height*0.8);
    this.isDisplayed = true;

  }

  move() {
    this.y += this.speed;
    if (!this.isDisplayed) {
      this.y += this.speed;
    }
  }
}


class Background {
  private stars: Star[];
  public atmosphere: Atmosphere;
  public earth: Earth;

  constructor() {
    this.stars = [];
    for (let i = 0; i < 1000; i++) {
      this.stars[i] = new Star();
    }

    this.atmosphere = new Atmosphere();
    this.earth = new Earth();
  }

  public update() {
    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i].fall();
    }

    this.atmosphere.move();
    this.atmosphere.display();

    this.earth.move();
    this.earth.display();
  }
  
  public draw() {
    background(0);
    for (let i = 0; i < this.stars.length; i++) {
        this.stars[i].show();
    }

    this.atmosphere.move();
    this.atmosphere.display();

    this.earth.move();
    this.earth.display();
  }
}