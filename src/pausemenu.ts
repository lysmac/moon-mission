class PauseMenu {
  private position: p5.Vector;
  private size: p5.Vector;
  game: IStartGame;

  constructor(game: IStartGame) {
    this.position = createVector(100, 300);
    this.size = createVector(400, 200);

    this.game = game;
  }

  public update() {
    if (keyIsDown(BACKSPACE)) {
      game.startNewGame();
    }
  }

  public draw() {
    //BACKGROUND SQUARE MENU
    fill("rgba(255, 0, 0, 0.4)");
    stroke("#D9D9D9");
    rect(this.position.x, this.position.y, this.size.x, this.size.y, 20);
    noStroke();

    // HEADER AND TITLE
    fill("#FDCA51");
    textSize(30);
    textAlign(CENTER);
    textFont("sofia sans");

    text("PAUSED", this.position.x + this.size.x / 2, this.position.y + 40);

    fill("#D9D9D9");
    tint(255, 100);
    image(header, 100, 100, 400, 200);
    tint(255, 255);

    // MENU TEXT
    textFont("secular one");
    textSize(21);
    text("PRESS", this.position.x + 123, this.position.y + 100);
    fill("#FDCA51");
    text(
      "ESC",
      this.position.x + textWidth("PRESS ") + 113,
      this.position.y + 100
    );
    fill("#D9D9D9");
    text(
      "TO RESUME",
      this.position.x + textWidth("PRESS SPACE") + 132,
      this.position.y + 100
    );

    textSize(18);
    text("PRESS", this.position.x + 62, this.position.y + 160);
    fill("#FDCA51");
    text(
      "BACKSPACE",
      this.position.x + textWidth("PRESS ") + 85,
      this.position.y + 160
    );
    fill("#D9D9D9");
    text(
      " TO START NEW GAME",
      this.position.x + textWidth("PRESS SPACE") + 172,
      this.position.y + 160
    );
  }
}
