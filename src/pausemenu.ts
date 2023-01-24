class PauseMenu {
  x: number = 0;
  y: number = 0;
  color: string;
  width: number = 100;
  height: number = 100;
  textSize: number = 20;
  titleText: string = "MOON MISSION";
  //textPlay: string = "PRESS SPACE TO RESTART GAME";
  //textResume: string = "PRESS ESC TO RESUME GAME";
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
      game.startNewGame();
    }
  }

  public draw() {
    fill(this.color);
    stroke("#D9D9D9");
    strokeWeight(3);
    rect(this.x, this.y, 400, 250, 20);
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
    textSize(21);

    text("PRESS", this.x +130, this.y+90);
    fill("#FDCA51");
    text("ESC", this.x + textWidth("PRESS ")+120, this.y + 90);
    fill("#D9D9D9");
    text("TO RESUME", this.x +textWidth("PRESS SPACE")+140, this.y + 90);

    text("PRESS", this.x +65, this.y+160);
    fill("#FDCA51");
    text("SPACE", this.x + textWidth("PRESS ")+70, this.y + 160);
    fill("#D9D9D9");
    text(" TO START NEW GAME", this.x +textWidth("PRESS SPACE")+145, this.y + 160);
    

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
