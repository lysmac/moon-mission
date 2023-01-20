class GameMenu {
  x: number = 0;
  y: number = 0;
  color: string;
  width: number = 100;
  height: number = 100;
  textSize: number = 20;
  text: string = "GAME MENU";
  textPlay: string = "PLAY";
  textHowToPlay: string = "HOW TO PLAY";
  textColor: string = "black";
  game: IStartGame;

  constructor(
    game: IStartGame,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  public update() {
    if (true) {
      this.game.startNewGame();
    }
  }

  public draw() {
    //background(255, 204, 0);

    fill(this.color);
    rect(this.x, this.y, this.width, this.height, 20);
    noStroke();

    textSize(this.textSize);
    textAlign(CENTER);
    fill(this.textColor);
    textFont("times new roman");

    let textPlayY = this.y + 60;
    let textHowToPlayY = this.y + 90;

    text(this.text, this.x + (this.width / 2), this.y + 70);
    text(this.textPlay, this.x + (this.width / 2), textPlayY);
    text(this.textHowToPlay, this.x + (this.width / 2), textHowToPlayY);

    image(img, 0, 0);
  }
}
