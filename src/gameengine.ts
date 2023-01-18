class GameEngine {
  private background: Background; 

    constructor() {
      this.background = new Background();
    }
  
    public update() {
      this.background.update();
    }
  
    public draw() {
      this.background.draw();
    }
  }