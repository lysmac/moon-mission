class PauseMenu {
  x: number = 0;
  y: number = 0;
  color: string;
  width: number = 100;
  height: number = 100;
  game: IStartGame;

  constructor(
    game: IStartGame,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.game = game;
  }

  public update() {
    if (keyIsDown(77)) {
      console.log("pressed m");
      this.game.changeCurrentScene("start");
    }

    if (keyIsDown(32)) {
      game.startNewGame();
    }
  }

  public draw() {
    //BACKGROUND SQUARE MENU
    fill(this.color);
    stroke("#D9D9D9");
    rect(this.x, this.y, 400, 240, 20);
    noStroke();

    //let resumeY = this.y + 60;
    //let restartY = this.y + 130;

    // Title
    fill("#FDCA51");
    textSize(70);
    textAlign(CENTER);

    textFont("sofia sans");
    text("MOON MISSION", this.x + this.width / 2, this.y - 90);
    fill("#D9D9D9");

    // MENU TEXT
    textFont("secular one");
    textSize(21);
    text("PRESS", this.x + 123, this.y + 90);
    fill("#FDCA51");
    text("ESC", this.x + textWidth("PRESS ") + 113, this.y + 90);
    fill("#D9D9D9");
    text("TO RESUME", this.x + textWidth("PRESS SPACE") + 132, this.y + 90);

    text("PRESS", this.x + 60, this.y + 160);
    fill("#FDCA51");
    text("SPACE", this.x + textWidth("PRESS ") + 63, this.y + 160);
    fill("#D9D9D9");
    text(
      " TO START NEW GAME",
      this.x + textWidth("PRESS SPACE") + 140,
      this.y + 160
    );
  }
}
