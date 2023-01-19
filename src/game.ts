// Is this right or should it be in a separate file?
// interface IstartGame {
//   startNewGame(): void
//   resumeGame(): void
// }
class Game {
  private gameEngine: GameEngine;
  private gameMenu: GameMenu;
  private pauseMenu: PauseMenu;
  private playerScore: Score;

  private currentScene: string;

  constructor() {
    this.gameMenu = new GameMenu(100, 300, 400, 300, "#566E93");
    this.pauseMenu = new PauseMenu(100, 300, 400, 300, "#566E93");
    this.gameEngine = new GameEngine();
  }
  // new GameMenu(this)
  // Stod i klassschemat, vet inte exakt hur den ska användas?

  public update(): void {
    this.gameEngine.update();
    this.gameMenu.update();
    this.pauseMenu.update();
  }

  public draw(): void {
    this.gameMenu.draw();
    this.pauseMenu.draw();

    this.gameEngine.draw();
  }

  public startNewGame(): void {}

  public resumeGame(): void {}
}
