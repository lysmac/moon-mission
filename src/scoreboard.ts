class ScoreBoard {
  private position: p5.Vector;
  private size: p5.Vector;
  private game: IStartGame;
  background: Background;

  constructor(
    //position: p5.Vector,
    //size: p5.Vector,
    game: IStartGame
  ) {
    this.game = game;
    this.position = createVector(100, 300);
    this.size = createVector(400, 300);
    this.background = new Background(true);
  }

  public update() {
    // 32 is keycode for space
    if (keyIsDown(77)) {
      console.log("pressed m");
      this.game.changeCurrentScene("start");
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

    textFont("sofia sans");
    text(
      "MOON MISSION",
      this.position.x + this.size.x / 2,
      this.position.y - 90
    );

    // SCOREBOARD - SUBTITLE
    textSize(55);
    textAlign(CENTER);
    text("SCOREBOARD", this.position.x + this.size.x / 2, this.position.y - 10);

    // SCORE LIST
    let highscores = this.getTopThreeScores();

    fill("#D9D9D9");
    textSize(30);
    for (let i = 0; i < 5; i++) {
      text(
        i + 1 + ". " + highscores[i],
        this.position.x + 200,
        this.position.y + 80 + i * 40
      );
    }
    textSize(25);
    text(
      "PRESS M TO RETURN TO MENU",
      this.position.x + this.size.x / 2,
      this.position.y + 280
    );
  }

  public getTopThreeScores() {
    let highscores = this.game.readAllPlayerScores();
    highscores.sort((a, b) => b - a); // sort in descending order
    return highscores.slice(0, 5); // return the first 5 elements
  }
}
