class PauseMenu {
  private position: p5.Vector;
  private size: p5.Vector;
  game: IStartGame;

  constructor(game: IStartGame) {
    this.position = createVector(100, 300);
    this.size = createVector(400, 240);
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
    fill("rgba(255, 0, 0, 0.4)");
    stroke("#D9D9D9");
    rect(this.position.x, this.position.y, this.size.x, this.size.y, 20);
    noStroke();

    //let resumeY = this.y + 60;
    //let restartY = this.y + 130;

    // Title
    fill("#FDCA51");
    textSize(70);
    textAlign(CENTER);

    textFont("sofia sans");
    text(
      "MOON MISSION",
      this.position.x + this.size.x / 2,
      this.position.y - 90
    );
    fill("#D9D9D9");

    // MENU TEXT
    textFont("secular one");
    textSize(21);
    text("PRESS", this.position.x + 123, this.position.y + 90);
    fill("#FDCA51");
    text(
      "ESC",
      this.position.x + textWidth("PRESS ") + 113,
      this.position.y + 90
    );
    fill("#D9D9D9");
    text(
      "TO RESUME",
      this.position.x + textWidth("PRESS SPACE") + 132,
      this.position.y + 90
    );

    text("PRESS", this.position.x + 60, this.position.y + 160);
    fill("#FDCA51");
    text(
      "SPACE",
      this.position.x + textWidth("PRESS ") + 63,
      this.position.y + 160
    );
    fill("#D9D9D9");
    text(
      " TO START NEW GAME",
      this.position.x + textWidth("PRESS SPACE") + 140,
      this.position.y + 160
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
}
