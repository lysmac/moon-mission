class GameMenu {
  x: number = 0;
  y: number = 0;
  color: string;
  width: number = 100;
  height: number = 100;
  textSize: number = 20;
  text: string = "GAME MENU";
  textPlay: string = "PLAY";
  textHowToPlay: string = "HOW TO PLAY";
  textColor: string = "black";
  game: IStartGame;
  background: Background; 

  constructor(
    game: IStartGame,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ) {
    this.game = game;
    this.x = x;
    this.y = y;
    // this.position = createVector(0, 0)
    this.width = width;
    this.height = height;
    this.color = color;
    this.background = new Background(true);
  }

  public update() {
    if (true) {
      this.game.startNewGame();
    }

    this.background.update();
  }
  
  public draw() {
    this.background.draw();
    //background(255, 204, 0);
    
    fill(this.color);
    // rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height, 20);
    noStroke();
    
    textSize(this.textSize);
    textAlign(CENTER, CENTER);
    fill(this.textColor);
    textFont("times new roman");
    text(this.text, this.x + 140, this.y + 30);
    text(this.textPlay, this.x + 160, this.y + 60);
    text(this.textHowToPlay, this.x + 130, this.y + 90);
    
    image(img, 0, 0);
  }
}
