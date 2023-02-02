class GameOver {
  private position: p5.Vector
  private size: p5.Vector
  private game: IStartGame

  constructor(game: IStartGame) {
    this.position = createVector(100, 300)
    this.size = createVector(400, 200)
    this.game = game
  }

  public update(): void {
    // Checks if scores has been set, pushes into Game and local storage
    if (!this.game.scoreCheckGet()) {
      let score = this.game.readCurrentPlayerScore()
      this.game.pushToAllPlayerScores(score)
      const allScores = this.game.readAllPlayerScores()
      localStorage.setItem("playerScores", JSON.stringify(allScores))

      this.game.scoreCheckSet(true)
    }

    if (keyIsDown(BACKSPACE)) {
      this.game.startNewGame()
    }
  }

  public draw(): void {
    //BACKGROUND SQUARE MENU
    fill("rgba(255, 0, 0, 0.3)")
    stroke("#D9D9D9")
    rect(this.position.x, this.position.y, 400, 200, 20)
    noStroke()
    textFont("sofia sans")

    // TITLE
    fill(frameCount % 60 < 30 ? "#D9D9D900" : "#c90a0a")
    textSize(70)
    textAlign(CENTER)
    text("GAME OVER", this.position.x + this.size.x / 2, this.position.y - 60)

    // MENU TEXT
    // This variable takes the score from Game, so it can be displayed here
    let score = this.game.readCurrentPlayerScore()
    let highscore = this.getHighestScore()

    if (score >= highscore) {
      textSize(55)
      textAlign(CENTER)
      fill("#FDCA51")
      text("HIGH SCORE!", this.position.x + this.size.x / 2, this.position.y - 10)

      fill("#D9D9D9")
      textSize(26)
      textAlign(CENTER)
      text(`YOU SET A NEW HIGH SCORE! `, this.position.x + this.size.x / 2, this.position.y + 60)
      textSize(40)
      fill("#FDCA51")

      text(score, this.position.x + this.size.x / 2, this.position.y + 100)
    } else {
      fill("#D9D9D9")
      textSize(26)
      textAlign(CENTER)
      text(`YOUR SCORE: ${score}`, this.position.x + this.size.x / 2, this.position.y + 60)

      text(
        `CURRENT HIGH SCORE: ${highscore}`,
        this.position.x + this.size.x / 2,
        this.position.y + 90
      )
    }
    fill("#D9D9D9");
    textSize(20);
    text("PRESS", this.position.x + 47, this.position.y + 140);
    fill("#FDCA51");

    text(
      "BACKSPACE",
      this.position.x + textWidth("PRESS ") + 75,
      this.position.y + 140
    );
    fill("#D9D9D9");

    text(
      " TO START NEW GAME",
      this.position.x + textWidth("PRESS BACKSPACE") + 120,
      this.position.y + 140
    );

    fill("#D9D9D9");
    textSize(20);
    text("PRESS", this.position.x + 82, this.position.y + 173);
    fill("#FDCA51");

    text(
      "ESC",
      this.position.x + textWidth("PRESS ") + 73,
      this.position.y + 173
    );
    fill("#D9D9D9");
    text(
      "TO RETURN TO MENU",
      this.position.x + textWidth("PRESS ESC") + 152,
      this.position.y + 173
    );

  }
  // Get the highest score from the the array in Game
  private getHighestScore(): number {
    let highscores = this.game.readAllPlayerScores()
    let highestNumber = Math.max(...highscores)
    return highestNumber
  }
}
