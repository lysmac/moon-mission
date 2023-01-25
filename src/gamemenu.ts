class GameMenu {
  // x: number = 0;
  // y: number = 0;
  position: p5.Vector;
  color: string;
  width: number;
  height: number;
  game: IStartGame;
  background: Background;

  constructor(
    position: p5.Vector,
    game: IStartGame,
    // x: number,
    // y: number,
    width: number,
    height: number,
    color: string
  ) {
    this.game = game;
    //this.position = position;
    // this.x = x;
    // this.y = y;
    this.position = createVector(100,300)
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
    fill("rgba(255, 0, 0, 0.4)");
    stroke("#D9D9D9");
    rect(this.position.x, this.position.y, 400, 300, 20);
    noStroke();

    //TITLE
    fill("#FDCA51");
    textSize(70);
    textAlign(CENTER);

    textFont("sofia sans");
    text("MOON MISSION", this.position.x + this.width / 2, this.y - 90);
    fill("#D9D9D9");

    // MENU TEXT
    fill("#D9D9D9");
    textSize(21);
    text("PRESS", this.position.x +65, this.position.y+70);
    fill("#FDCA51");
    text("SPACE", this.position.x + textWidth("PRESS ")+72, this.position.y + 70);
    fill("#D9D9D9");
    text(" TO START NEW GAME", this.position.x +textWidth("PRESS SPACE")+145, this.position.y + 70);

    fill("#D9D9D9");
    textSize(21);
    text("HOW TO PLAY", this.position.x +200, this.position.y+140);
    
    //SPACESHIP
    angleMode(DEGREES);
    rotate(25);
    image(raket3, 330, 350, 80, 250, 0, 0, raket3.width, raket3.height, CONTAIN, LEFT);
    
  }




  }


// font-family: 'Kanit', sans-serif;
// font-family: 'Secular One', sans-serif;
// font-family: 'Sofia Sans', sans-serif;
