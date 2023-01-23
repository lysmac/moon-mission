class PauseMenu {
  x: number = 0;
  y: number = 0;
  color: string;
  width: number = 100;
  height: number = 100;
  textSize: number = 20;
  text: string = "PAUSE MENU";
  textPlay: string = "PLAY";
  textHowToPlay: string = "HOW TO PLAY";
  textColor: string = "black";

  constructor(
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
  }

  public update() {}

  public draw() {
    //background(255, 204, 0);

    fill(this.color);
    rect(this.x, this.y, this.width, this.height, 20);
    noStroke();

    textSize(this.textSize);
    textAlign(CENTER - textWidth(this.text));
    fill(this.textColor);
    textFont("times new roman");
    text(this.text, this.x + 140, this.y + 30);
    textAlign(CENTER - textWidth(this.textPlay));
    text(this.textPlay, this.x + 160, this.y + 60);
    textAlign(CENTER - textWidth(this.textHowToPlay));
    text(this.textHowToPlay, this.x + 130, this.y + 90);

  }
}
