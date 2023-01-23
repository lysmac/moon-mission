class GameMenu {
  x: number = 0;
  y: number = 0;
  color: string;
  width: number = 100;
  height: number = 100;
  textSize: number = 20;
  titleText: string = "MOON MISSION";
  textPlay: string = 'PRESS "SPACE" TO PLAY';
  textHowToPlay: string = "USE ARROW LEFT AND RIGHT TO MOVE";
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
    // 32 is keycode for space
    if (keyIsDown(32)) {
      this.game.startNewGame();
    }

    this.background.update();
  }
  
  public draw() {
    this.background.draw();
    //background(255, 204, 0);
    
    fill(this.color);
    rect(this.x, this.y, this.width, this.height, 20);
    noStroke();

    fill("#FDCA51");
    textSize(70);
    textAlign(CENTER);
    textFont("sofia sans");
    
    
    
    let textPlayY = this.y + 60;
    let textHowToPlayY = this.y + 90;
    
    text(this.titleText, this.x + (this.width / 2), this.y - 90);
    fill("#D9D9D9");
    
    textFont("secular one");
    textSize(this.textSize);
    text(this.textPlay, this.x + (this.width / 2), textPlayY  + 30);
    text(this.textHowToPlay, this.x + (this.width / 2), textHowToPlayY + 30);
    
    angleMode(DEGREES);
    rotate(25);

    image(raket3, 330, 350, 80, 190, 0, 0, raket3.width, raket3.height, CONTAIN, LEFT);
    

 
  }




  }


// font-family: 'Kanit', sans-serif;
// font-family: 'Secular One', sans-serif;
// font-family: 'Sofia Sans', sans-serif;
