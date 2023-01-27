class GameMenu {
  private position: p5.Vector;
  private size: p5.Vector;
  private game: IStartGame;
  background: Background;

  constructor(

    game: IStartGame,
    
  ) {
    this.game = game;
    this.position = createVector(100, 300);
    this.size = createVector(400, 370);
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
    rect(this.position.x, this.position.y, this.size.x, this.size.y, 20);
    noStroke();

    //TITLE
    fill("#FDCA51");
    textSize(70);
    textAlign(CENTER);
    image(header,0,0);


    //textFont("sofia sans");
    // text("MOON MISSION", this.position.x + this.size.x/ 2, this.position.y - 90);
    // fill("#D9D9D9");


    // MENU TEXT
    textFont("secular one");
    fill("#D9D9D9");
    textSize(21);
    text("PRESS", this.position.x + 65, this.position.y + 70);
    fill("#FDCA51");

    text(
      "SPACE",
      this.position.x + textWidth("PRESS ") + 69,
      this.position.y + 70
    );

    fill("#D9D9D9");
    text(
      " TO START NEW GAME",
      this.position.x + textWidth("PRESS SPACE") + 145,
      this.position.y + 70
    );

    fill("#D9D9D9");
    textSize(21);

    text("HOW TO PLAY", this.position.x +200, this.position.y+150);

    // IMAGE OF KEYS
    image(interactionKeys,180,470, 300,70);
    fill("#D9D9D9");
    textSize(15);
    text("PAUSE", this.position.x +100, this.position.y+260);
    text("SHOOT", this.position.x +200, this.position.y+260);
    text("MOVE", this.position.x +330, this.position.y+260);
    textSize(13);
    text("PRESS S TO TOGGLE MUSIC", this.position.x +200, this.position.y+320);

  
    
    //SPACESHIP
    angleMode(DEGREES);
    rotate(25);
    image(raket3, 310, 350, 80, 250, 0, 0, raket3.width, raket3.height, CONTAIN, LEFT);
    
    

  }
}

// font-family: 'Kanit', sans-serif;
// font-family: 'Secular One', sans-serif;
// font-family: 'Sofia Sans', sans-serif;
