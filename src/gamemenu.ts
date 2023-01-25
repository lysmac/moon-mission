class GameMenu {
  x: number = 0;
  y: number = 0;
  color: string;
  width: number = 100;
  height: number = 100;
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
    
    //BACKGROUND SQUARE MENU
    fill(this.color);
    stroke("#D9D9D9");
    rect(this.x, this.y, this.width, this.height, 20);
    noStroke();

    //TITLE
    fill("#FDCA51");
    textSize(70);
    textAlign(CENTER);

    textFont("sofia sans");
    text("MOON MISSION", this.x + this.width / 2, this.y - 90);
    fill("#D9D9D9");

    // MENU TEXT
    fill("#D9D9D9");
    textSize(21);
    text("PRESS", this.x +65, this.y+70);
    fill("#FDCA51");
    text("SPACE", this.x + textWidth("PRESS ")+72, this.y + 70);
    fill("#D9D9D9");
    text(" TO START NEW GAME", this.x +textWidth("PRESS SPACE")+145, this.y + 70);

    fill("#D9D9D9");
    textSize(21);
    text("HOW TO PLAY", this.x +200, this.y+140);
    
    //SPACESHIP
    angleMode(DEGREES);
    rotate(25);
    image(raket3, 330, 350, 80, 250, 0, 0, raket3.width, raket3.height, CONTAIN, LEFT);
    
  }




  }


// font-family: 'Kanit', sans-serif;
// font-family: 'Secular One', sans-serif;
// font-family: 'Sofia Sans', sans-serif;
