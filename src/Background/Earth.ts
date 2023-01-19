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