class GameOver {
  x: number = 0;
  y: number = 0;
  color: string;
  width: number = 100;
  height: number = 100;

  game: IStartGame;
  gameengine: GameEngine;

  constructor(
    game: IStartGame,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    gameengine: GameEngine
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.game = game;
    this.gameengine = gameengine;
  }

  public update() {
    if (keyIsDown(32)) {
      game.startNewGame();
    }
  }

  public draw() {
    //BACKGROUND SQUARE MENU
    fill(this.color);
    stroke("#D9D9D9");
    rect(this.x, this.y, 400, 200, 20);
    noStroke();

    textFont("sofia sans");

    // let resumeY = this.y + 60;
    // let restartY = this.y + 130;

    // TITLE
    fill(frameCount % 60 < 30 ? "#c90a0a" : "#D9D9D900");
    textSize(70);
    textAlign(CENTER);
    text("GAME OVER", this.x + this.width / 2, this.y - 60);
    this.gameengine.scoreForBoard();

    // MENU TEXT

    fill("#D9D9D9");
    textSize(26);
    textAlign(CENTER);
    text("YOUR SCORE:", this.x + this.width / 2, this.y + 60);

    fill("#D9D9D9");
    textSize(21);
    text("PRESS", this.x + 65, this.y + 140);
    fill("#FDCA51");

    text("SPACE", this.x + textWidth("PRESS ") + 72, this.y + 140);
    fill("#D9D9D9");
    text(
      " TO START NEW GAME",
      this.x + textWidth("PRESS SPACE") + 145,
      this.y + 140
    );

    // textFont("secular one");
    // textSize(this.textSize);
    // text(this.textPlay, this.x + this.width / 2, restartY + 30);
  }
}
