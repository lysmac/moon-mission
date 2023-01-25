class GameOver {
  x: number = 0;
  y: number = 0;
  color: string;
  width: number = 100;
  height: number = 100;
  textSize: number = 20;
  titleText: string = "GAME OVER";
  textPlay: string = "PRESS SPACE TO PLAY AGAIN";
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
    fill(this.color);
    rect(this.x, this.y, this.width, this.height, 20);
    noStroke();

    fill("#FDCA51");
    textSize(70);
    textAlign(CENTER);

    textFont("sofia sans");

    // let resumeY = this.y + 60;
    let restartY = this.y + 130;

    // Title
    text(this.titleText, this.x + this.width / 2, this.y - 90);
    fill("#D9D9D9");

    textFont("secular one");
    textSize(this.textSize);
    text(this.textPlay, this.x + this.width / 2, restartY + 30);

    // let score = this.gameengine.scoreForBoard;
    // text(score, this.x + this.width / 2, restartY + 60);
    this.gameengine.scoreForBoard();

    // this.gameengine.displayScore();
  }
}
