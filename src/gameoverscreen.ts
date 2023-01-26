class GameOver {
  position: p5.Vector;
  size: p5.Vector;
  game: IStartGame;
  gameengine: GameEngine;

  constructor(
  game: IStartGame,
  gameengine: GameEngine
  ) {
    this.position = createVector(100,300);
    this.size = createVector(400,200);
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
    fill("rgba(255, 0, 0, 0.4)");
    stroke("#D9D9D9");
    rect(this.position.x, this.position.y, this.size.x, this.size.y, 20);
    noStroke();

    textFont("sofia sans");

    // let resumeY = this.y + 60;
    // let restartY = this.y + 130;

    // TITLE
    fill(frameCount % 60 < 30 ? "#c90a0a" : "#D9D9D900");
    textSize(70);
    textAlign(CENTER);
    text("GAME OVER", this.position.x + this.size.x/ 2, this.position.y - 60);

    // MENU TEXT
    // This variable taked the score from gameengine, so it can be displayed here
    let score = this.gameengine.scoreForBoard();
    fill("#D9D9D9");
    textSize(26);
    textAlign(CENTER);
    text(`YOUR SCORE: ${score}`, this.position.x + this.size.x / 2, this.position.y + 60);

    fill("#D9D9D9");
    textSize(21);
    text("PRESS", this.position.x + 65, this.position.y + 140);
    fill("#FDCA51");

    text("SPACE", this.position.x + textWidth("PRESS ") + 72, this.position.y + 140);
    fill("#D9D9D9");
    text(
      " TO START NEW GAME",
      this.position.x + textWidth("PRESS SPACE") + 145,
      this.position.y + 140
    );

    // textFont("secular one");
    // textSize(this.textSize);
    // text(this.textPlay, this.x + this.width / 2, restartY + 30);
  }
}