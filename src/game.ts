// Is this right or should it be in a separate file?
// interface IstartGame {
//   startNewGame(): void
//   resumeGame(): void
// }
class Game {
  private gameMenu: GameMenu

  // playerScore är nu kopplad till GameEntity i klassschemat, kan behöva flyttas/ändras
  private playerScore: Score
  private gameEngine: GameEngine
  private currentScene: string

  constructor() {
    this.gameMenu = new GameMenu(50, 50, 600, 600, 'red')

    // new GameMenu(this)
    // Stod i klassschemat, vet inte exakt hur den ska användas?
    

  }

  public update(): void {
    this.gameMenu.update()
  }


  public draw(): void {

    this.gameMenu.draw()
  }

  public startNewGame(): void {}

  public resumeGame(): void {}
}
