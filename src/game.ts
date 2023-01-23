// Is this right or should it be in a separate file?
interface IStartGame {
  startNewGame(): void
  resumeGame(): void
}

class Game implements IStartGame {
  private gameEngine: GameEngine
  private gameMenu: GameMenu
  private pauseMenu: PauseMenu
  // private playerScore: Score;

  private currentScene: "start" | "play" | "pause" | "end"

  constructor() {
    this.gameMenu = new GameMenu(this, 100, 300, 400, 300, "#566E93")
    this.pauseMenu = new PauseMenu(100, 300, 400, 300, "#566E93")
    this.gameEngine = new GameEngine()
    this.currentScene = "start"
  }
  // new GameMenu(this)
  // Stod i klassschemat, vet inte exakt hur den ska användas?

  public update(): void {
    switch (this.currentScene) {
      case "start":
        this.gameMenu.update()
        break
      case "play":
        this.gameEngine.update()
        break
      case "pause":
        this.pauseMenu.update()
        break
    }
  }

  public draw(): void {
    switch (this.currentScene) {
      case "start":
        this.gameMenu.draw()
        break
      case "play":
        this.gameEngine.draw()
        break
      case "pause":
        this.pauseMenu.draw()
        break
    }
  }

  public startNewGame(): void {}

  public resumeGame(): void {}
}
