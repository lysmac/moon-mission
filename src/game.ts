// Is this right or should it be in a separate file?
interface IstartGame {
  startNewGame(): void
  resumeGame(): void
}
class Game {
  private gameMenu: GameMenu

  // playerScore är nu kopplad till GameEntity i klassschemat, kan behöva flyttas/ändras
  private playerScore: Score
  private gameEngine: GameEngine
  private currentScene: string

  constructor() {
    this.gameMenu = new GameMenu()

    // new GameMenu(this)
    // Stod i klassschemat, vet inte exakt hur den ska användas?
    

  }

  public update(): void {}

  public draw(): void {}

  public startNewGame(): void {}

  public resumeGame(): void {}
}
