class Game {
  private gameEngine: GameEngine;

  constructor() {
    this.gameEngine = new GameEngine();
  }

  public update() {
    this.gameEngine.update();
  }

  public draw() {
    this.gameEngine.draw();
  }
}
