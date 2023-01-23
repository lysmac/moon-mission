class PauseMenu {
  x: number = 0;
  y: number = 0;
  color: string;
  width: number = 100;
  height: number = 100;
  textSize: number = 20;
  titleText: string = "MOON MISSION";
  textPlay: string = "PRESS SPACE TO RESTART GAME";
  textResume: string = "PRESS ESC TO RESUME GAME";
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
    // console.log(game);
    if (keyIsDown(32)) {
      console.log("update from pausemenu");

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
    // fill("#D9D9D9");

    textFont("sofia sans");

    let resumeY = this.y + 60;
    let restartY = this.y + 130;

    // Title
    text(this.titleText, this.x + this.width / 2, this.y - 90);
    fill("#D9D9D9");

    textFont("secular one");
    textSize(this.textSize);
    text(this.textResume, this.x + this.width / 2, resumeY + 30);
    text(this.textPlay, this.x + this.width / 2, restartY + 30);

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
