// Skall score ärva från GameEntity? Kommer vi åt score från GameEntity 
// till scoreBoard? ScoreBoard är ihop med Game.

class Score extends GameEntity {
  private speed: number;
  private score: string;
  private color: p5.Color;

  constructor(position: p5.Vector, score: string) {

    super(position, 0)

    this.speed = 1;
    this.score = score;
    this.color = color(255, 255, 0);
  }

  public update() {
    this.position.y -= this.speed;
  }

  public draw() {
    textSize(24);
    text(this.score, this.position.x, this.position.y);
    fill(this.color)
  }
}
