class KillScore extends GameEntity {
  private speed: number;
  private score: string;
  private color: p5.Color;
  private alpha: number;
  private delay: number;
  private fadeTime: number;
  private readonly fadeTimeMax;

  constructor(position: p5.Vector, score: string) {

    super(position, 0)

    this.speed = 1;
    this.score = score;
    this.color = color(255, 255, 0);
    this.alpha = 1;
    this.delay = 500;
    this.fadeTimeMax = 500;
    this.fadeTime = this.fadeTimeMax;
  }

  public update() {
    this.position.y -= this.speed;
    this.delay -= deltaTime;
    // score fades away after delay
    if (this.delay < 0) {
      this.fadeTime -= deltaTime;
      this.alpha = norm(this.fadeTime, 0, 1);
      this.color.setAlpha(this.alpha);
    }
  }

  public draw() {
    textSize(24);
    fill(this.color)
    text(this.score, this.position.x, this.position.y);
  }
}
