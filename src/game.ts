// Is this right or should it be in a separate file?
interface IStartGame {
  startNewGame(): void;
  resumeGame(): void;
}

class Game implements IStartGame {
  private gameEngine: GameEngine;
  private gameMenu: GameMenu;
  private pauseMenu: PauseMenu;
  private gameOver: GameOver;
  // private playerScore: Score;

  private currentScene: "start" | "play" | "pause" | "end";

  constructor() {
    this.gameMenu = new GameMenu(
      this,
      100,
      300,
      400,
      300,
      "rgba(255, 0, 0, 0.3)"
    );
    this.pauseMenu = new PauseMenu(
      this,
      100,
      300,
      400,
      300,
      "rgba(255, 0, 0, 0.3)"
    );
    this.gameOver = new GameOver(
      this,
      100,
      300,
      400,
      300,
      "rgba(255, 0, 0, 0.3)"
    );
    this.gameEngine = new GameEngine();
    this.currentScene = "play";
  }
  // new GameMenu(this)
  // Stod i klassschemat, vet inte exakt hur den ska användas?

  public update(): void {
    switch (this.currentScene) {
      case "start":
        this.gameMenu.update();
        break;
      case "play":
        this.gameEngine.update();
        break;
      case "pause":
        this.pauseMenu.update();
        break;
      case "end":
        this.gameOver.update();
        break;
    }
  }

  public draw(): void {
    switch (this.currentScene) {
      case "start":
        this.gameMenu.draw();
        break;
      case "play":
        this.gameEngine.draw();
        break;
      case "pause":
        this.pauseMenu.draw();
        break;
      case "end":
        this.gameOver.draw();
        break;
    }
  }

  public startNewGame(): void {
    this.currentScene = "play";
  }

  public resumeGame(): void {}
}
