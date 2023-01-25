class PauseMenu {
  x: number = 0;
  y: number = 0;
  color: string;
  width: number = 100;
  height: number = 100;
  game: IStartGame;
  private wasEscapeKeyDown: boolean;

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
    this.wasEscapeKeyDown = false;
  }

  public update() {
    this.unpauseGame();

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

    // text("PRESS ESC TO RESUME", this.x + this.width / 2, resumeY + 30);
    // text("PRESS SPACE TO START NEW GAME", this.x + this.width / 2, restartY + 30);

    // fill(this.color);
    // rect(this.x, this.y, this.width, this.height, 20);
    // noStroke();

    // textSize(this.textSize);
    // textAlign(CENTER - textWidth(this.text));
    // fill(this.textColor);
    // textFont("times new roman");
    // text(this.text, this.x + 140, this.y + 30);
    // textAlign(CENTER - textWidth(this.textPlay));
    // text(this.textPlay, this.x + 160, this.y + 60);
    // textAlign(CENTER - textWidth(this.textHowToPlay));
    // text(this.textHowToPlay, this.x + 130, this.y + 90);
  }
  public unpauseGame() {
    const espaceWasPressed = !this.wasEscapeKeyDown && keyIsDown(RETURN);
    // const espaceWasReleased = this.wasEscapeKeyDown && !keyIsDown(ESCAPE);
    if (espaceWasPressed) {
      // Show pause menu and pause game
      this.game.changeCurrentScene("play");
    }

    // this.wasEscapeKeyDown = keyIsDown(ESCAPE);
  }
}
