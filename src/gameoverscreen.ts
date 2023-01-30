class GameOver {
  position: p5.Vector;
  size: p5.Vector;
  game: IStartGame;

  constructor(game: IStartGame) {
    this.position = createVector(100, 300);
    this.size = createVector(400, 200);
    this.game = game;
  }

  public update() {
    // this.game.changeCurrentScene("end");
    // let score = this.game.readCurrentPlayerScore();
    // this.game.pushToAllPlayerScores(score);
    let isScorePushedOnce = this.game.scoreCheckGet();

    console.log(!isScorePushedOnce);
    if (!this.game.scoreCheckGet()) {
      let score = this.game.readCurrentPlayerScore();
      this.game.pushToAllPlayerScores(score);

      const allScores = this.game.readAllPlayerScores();

      localStorage.setItem("PlayerScores", JSON.stringify(allScores));

      this.game.scoreCheckSet(true);
    }

    if (keyIsDown(32)) {
      game.startNewGame();
    }
  }

  public draw() {
    //BACKGROUND SQUARE MENU
    fill("rgba(255, 0, 0, 0.3)");
    stroke("#D9D9D9");
    rect(this.position.x, this.position.y, 400, 200, 20);
    noStroke();
    textFont("sofia sans");

    // TITLE
    fill(frameCount % 60 < 30 ? "#D9D9D900" : "#c90a0a");
    textSize(70);
    textAlign(CENTER);
    text("GAME OVER", this.position.x + this.size.x / 2, this.position.y - 60);

    // MENU TEXT
    // This variable takes the score from gameengine, so it can be displayed here
    let score = this.game.readCurrentPlayerScore();
    let highscore = this.getHighestScore();

    if (score >= highscore) {
      textSize(55);
      textAlign(CENTER);
      fill("#FDCA51");
      text(
        "HIGH SCORE!",
        this.position.x + this.size.x / 2,
        this.position.y - 10
      );

      fill("#D9D9D9");
      textSize(26);
      textAlign(CENTER);
      text(
        `YOU SET A NEW HIGH SCORE! `,
        this.position.x + this.size.x / 2,
        this.position.y + 60
      );
      textSize(40);
      fill("#FDCA51");

      text(score, this.position.x + this.size.x / 2, this.position.y + 100);
    } else {
      fill("#D9D9D9");
      textSize(26);
      textAlign(CENTER);
      text(
        `YOUR SCORE: ${score}`,
        this.position.x + this.size.x / 2,
        this.position.y + 60
      );

      text(
        `CURRENT HIGH SCORE: ${highscore}`,
        this.position.x + this.size.x / 2,
        this.position.y + 90
      );
    }
    fill("#D9D9D9");
    textSize(21);
    text("PRESS", this.position.x + 65, this.position.y + 140);
    fill("#FDCA51");

    text(
      "SPACE",
      this.position.x + textWidth("PRESS ") + 72,
      this.position.y + 140
    );
    fill("#D9D9D9");
    text(
      " TO START NEW GAME",
      this.position.x + textWidth("PRESS SPACE") + 145,
      this.position.y + 140
    );
  }

  private getHighestScore() {
    let highscores = this.game.readAllPlayerScores();
    let highestNumber = Math.max(...highscores);
    return highestNumber;
  }
}
