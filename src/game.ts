interface IStartGame {
  startNewGame(): void;
  resumeGame(): void;
  readAllPlayerScores(): number[];
  changeCurrentScene(scene: string): void;
  readCurrentPlayerScore(): number;
  changeCurrentPlayerScore(input: number): void;
  pushToAllPlayerScores(playerScore: number): void;
  scoreCheckSet(anything: boolean): void;
  scoreCheckGet(): boolean;
}

class Game implements IStartGame {
  private gameEngine: GameEngine;
  private gameMenu: GameMenu;
  private pauseMenu: PauseMenu;
  private gameOver: GameOver;
  private scoreboard: ScoreBoard;
  private menumusic: p5.SoundFile;
  private gameplaymusic: p5.SoundFile;
  private allPlayerScores: number[] = [];
  private currentPlayerScore: number;
  private currentScene: string;
  private wasEscapeKeyDown: boolean;
  private wasSKeyDown: boolean;
  private wasHKeyDown: boolean;
  public addedScoreToList: boolean;
  private mute: boolean;

  constructor() {
    this.gameMenu = new GameMenu(this);
    this.pauseMenu = new PauseMenu(this);
    this.gameOver = new GameOver(this);
    this.scoreboard = new ScoreBoard(this);
    this.gameEngine = new GameEngine();
    this.menumusic = menumusic;
    this.gameplaymusic = gameplaymusic;
    this.currentScene = "start";
    this.currentPlayerScore = 0;
    this.wasEscapeKeyDown = false;
    this.wasSKeyDown = false;
    this.wasHKeyDown = false;
    this.addedScoreToList = false;
    this.mute = true;
  }

  public update(): void {
    this.getScoresFromLS();
    this.muteSounds();
    this.togglePause();
    this.toggleHighScore();

    switch (this.currentScene) {
      case "start":
        // if (keyIsDown(72)) {
        //   this.changeCurrentScene("score");
        // }
        this.gameMenu.update();
        break;
      case "score":
        this.scoreboard.update();
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
      case "score":
        this.scoreboard.draw();
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
    this.gameplaymusic.stop();
    this.scoreCheckSet(false);
    this.changeCurrentScene("play");
    this.gameEngine = new GameEngine();
  }

  public resumeGame(): void {}

  private muteSounds() {
    const pWasPressed = !this.wasSKeyDown && keyIsDown(83);
    if (pWasPressed && this.mute === true) {
      this.mute = false;
      outputVolume(0.2);
      if (this.currentScene === "start" || this.currentScene === "score") {
        if (!this.menumusic.isPlaying()) {
          this.menumusic.play();
        }
      }
    } else if (pWasPressed && this.mute === false) {
      this.mute = true;
      outputVolume(0);
    }
    this.wasSKeyDown = keyIsDown(83);
  }

  public readAllPlayerScores() {
    return this.allPlayerScores;
  }

  public pushToAllPlayerScores(playerScore: number) {
    this.allPlayerScores.push(playerScore);
  }

  public changeCurrentScene(scene: string): void {
    this.currentScene = scene;

    if (scene === "start" || scene === "score") {
      if (!this.menumusic.isPlaying()) {
        this.menumusic.play();
      }
    }
    if (scene === "play") {
      this.menumusic.stop();
      this.gameplaymusic.play();
    }
    if (scene === "end") {
      this.gameplaymusic.stop();
    }
  }

  public readCurrentPlayerScore(): number {
    return this.currentPlayerScore;
  }

  public changeCurrentPlayerScore(input: number) {
    this.currentPlayerScore = input;
  }

  public togglePause() {
    const espaceWasPressed = !this.wasEscapeKeyDown && keyIsDown(ESCAPE);
    if (espaceWasPressed && this.currentScene === "play") {
      this.currentScene = "pause";
      this.gameplaymusic.pause();
      this.gameEngine.oxygenDisplay.pause();
    } else if (espaceWasPressed && this.currentScene === "pause") {
      this.currentScene = "play";
      this.gameplaymusic.play();
      this.gameEngine.oxygenDisplay.resume();
    }

    this.wasEscapeKeyDown = keyIsDown(ESCAPE);
  }
  public toggleHighScore() {
    const hWasPressed = !this.wasHKeyDown && keyIsDown(72);
    if (hWasPressed && this.currentScene === "start") {
      this.currentScene = "score";
    } else if (hWasPressed && this.currentScene === "score") {
      this.currentScene = "start";
    }

    this.wasHKeyDown = keyIsDown(72);
  }

  public scoreCheckSet(anything: boolean): void {
    this.addedScoreToList = anything;
  }
  public scoreCheckGet() {
    return this.addedScoreToList;
  }

  private getScoresFromLS() {
    const scores = localStorage.getItem("playerScores");
    const scoresParsed = JSON.parse(scores!);

    if (scoresParsed === null) {
      return;
    } else {
      this.allPlayerScores = scoresParsed;
      return;
    }
  }
}
