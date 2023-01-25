// Is this right or should it be in a separate file?
interface IStartGame {
  startNewGame(): void;
  resumeGame(): void;
  readAllPlayerScores(): number[];
  changeCurrentScene(scene: string): void;
  readCurrentPlayerScore(): number;
  changeCurrentPlayerScore(input: number): void;
  pushToAllPlayerScores(playerScore: number): void;
}

class Game implements IStartGame {
  private gameEngine: GameEngine;
  private gameMenu: GameMenu;
  private pauseMenu: PauseMenu;
  private gameOver: GameOver;
  // private playerScore: Score;
  private allPlayerScores: number[] = [1, 2, 3, 4, 5];
  private currentPlayerScore: number;
  private currentScene: string;
  // private currentScene: "start" | "play" | "pause" | "end";

  constructor() {
    this.gameMenu = new GameMenu(
      this,
      100,
      300,
      400,
      300,
      "rgba(255, 0, 0, 0.4)"
    );
    this.pauseMenu = new PauseMenu(
      this,
      100,
      300,
      400,
      300,
      "rgba(255, 0, 0, 0.4)"
    );
    this.gameEngine = new GameEngine();
    this.gameOver = new GameOver(
      this,
      100,
      300,
      400,
      300,
      "rgba(255, 0, 0, 0.4)"
    );
    // "start" | "play" | "pause" | "end"
    // Can't pause when starting from play. But Everything works with "start"
    this.currentScene = "start";
    this.currentPlayerScore = 0;
  }
  // new GameMenu(this)
  // Stod i klassschemat, vet inte exakt hur den ska användas?

  public update(): void {
    console.log(this.currentScene);

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
        this.gameEngine.draw();
        this.pauseMenu.draw();
        break;
      case "end":
        this.gameEngine.draw();
        this.gameOver.draw();
        break;
    }
  }

  public startNewGame(): void {
    // Denna behövs bara när man börjar på currentScene "Pause"
    this.currentScene = "play";

    this.gameEngine = new GameEngine();
  }

  public resumeGame(): void {}

  public readAllPlayerScores() {
    return this.allPlayerScores;
  }

  public pushToAllPlayerScores(playerScore: number) {
    this.allPlayerScores.push(playerScore);
  }

  public changeCurrentScene(scene: string): void {
    this.currentScene = scene;
  }

  public readCurrentPlayerScore(): number {
    return this.currentPlayerScore;
  }

  public changeCurrentPlayerScore(input: number) {
    this.currentPlayerScore = input;
  }
}
