// Is this right or should it be in a separate file?
interface IstartGame {
  startNewGame(): void
  resumeGame(): void
}
class Game {

  private gameEngine: GameEngine;
  private gameMenu: GameMenu
   private playerScore: Score
 
  private currentScene: string
  
  constructor() {
    this.gameEngine = new GameEngine();
    this.gameMenu = new GameMenu()
  }
   // new GameMenu(this)
    // Stod i klassschemat, vet inte exakt hur den ska användas?

  public update(): void {
    this.gameEngine.update();
  }

  public draw(): void {
    this.gameEngine.draw();
  }

    public startNewGame(): void {}

  public resumeGame(): void {}

}
