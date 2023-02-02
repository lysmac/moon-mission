interface IStartGame {
  startNewGame(): void;
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
  private menuMusic: p5.SoundFile;
  private gamePlayMusic: p5.SoundFile;
  private allPlayerScores: number[] = [];
  private currentPlayerScore: number;
  private currentScene: string;
  private wasEscapeKeyDown: boolean;
  private wasMKeyDown: boolean;
  private wasHKeyDown: boolean;
  private addedScoreToList: boolean;
  private mute: boolean;

  constructor() {
    this.gameMenu = new GameMenu(this);
    this.pauseMenu = new PauseMenu(this);
    this.gameOver = new GameOver(this);
    this.scoreboard = new ScoreBoard(this);
    this.gameEngine = new GameEngine();
    this.menuMusic = menumusic;
    this.gamePlayMusic = gameplaymusic;
    this.currentScene = "start";
    this.currentPlayerScore = 0;
    this.wasEscapeKeyDown = false;
    this.wasMKeyDown = false;
    this.wasHKeyDown = false;
    this.addedScoreToList = false;
    this.mute = true;
  }

  public update(): void {
    this.getScoresFromLS();
    this.muteSounds();
    this.togglePause();
    this.toggleHighScore();

    // This keep track of which scene is active
    switch (this.currentScene) {
      case "start":
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
  // This displays the active scene
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
  // Starts the game and resets the gameEngine
  public startNewGame(): void {
    this.gamePlayMusic.stop();
    this.scoreCheckSet(false);
    this.changeCurrentScene("play");
    this.gameEngine = new GameEngine();
  }

  // Method that mutes all sound and music in the game
  private muteSounds(): void {
    const mWasPressed = !this.wasMKeyDown && keyIsDown(77);
    if (mWasPressed && this.mute === true) {
      this.mute = false;
      outputVolume(0.2);
      if (this.currentScene === "start" || this.currentScene === "score") {
        if (!this.menuMusic.isPlaying()) {
          this.menuMusic.play();
        }
      }
    } else if (mWasPressed && this.mute === false) {
      this.mute = true;
      outputVolume(0);
    }
    this.wasMKeyDown = keyIsDown(77);
  }

  // Reads all playerscore from Game
  public readAllPlayerScores(): number[] {
    return this.allPlayerScores;
  }
  // Push the current score to the variable allPlayerScores array
  public pushToAllPlayerScores(playerScore: number): void {
    this.allPlayerScores.push(playerScore);
  }
  // Change the current scene and stops the current music and starts the new music for active scene
  public changeCurrentScene(scene: string): void {
    this.currentScene = scene;

    if (scene === "start" || scene === "score") {
      if (!this.menuMusic.isPlaying()) {
        this.menuMusic.play();
      }
    }
    if (scene === "play") {
      this.menuMusic.stop();
      this.gamePlayMusic.play();
    }
    if (scene === "end") {
      this.gamePlayMusic.stop();
    }
  }
  // Reads the current score from Game
  public readCurrentPlayerScore(): number {
    return this.currentPlayerScore;
  }
  // A setter for GameEngine to use to set the player score in the Game class
  public changeCurrentPlayerScore(input: number): void {
    this.currentPlayerScore = input;
  }
  // Pauses the game and stops the music and the oxygen display. Also brings player back to main menu when on game over
  public togglePause(): void {
    const espaceWasPressed = !this.wasEscapeKeyDown && keyIsDown(ESCAPE);
    if (espaceWasPressed && this.currentScene === "play") {
      this.currentScene = "pause";
      this.gamePlayMusic.pause();
      this.gameEngine.oxygenDisplay.pause();
    } else if (espaceWasPressed && this.currentScene === "pause") {
      this.currentScene = "play";
      this.gamePlayMusic.play();
      this.gameEngine.oxygenDisplay.resume();
    } else if (espaceWasPressed && this.currentScene === "end") {
      this.changeCurrentScene("start");
    }

    this.wasEscapeKeyDown = keyIsDown(ESCAPE);
  }
  // Use the H key to toggle between the start and score scene
  public toggleHighScore(): void {
    const hWasPressed = !this.wasHKeyDown && keyIsDown(72);
    if (hWasPressed && this.currentScene === "start") {
      this.currentScene = "score";
    } else if (hWasPressed && this.currentScene === "score") {
      this.currentScene = "start";
    }

    this.wasHKeyDown = keyIsDown(72);
  }
  // Sets a boolean value to addedScoreToList
  public scoreCheckSet(anything: boolean): void {
    this.addedScoreToList = anything;
  }
  // Checks if addedScoreToList is true or false
  public scoreCheckGet(): boolean {
    return this.addedScoreToList;
  }
  // Loads the playerscore from the local storage. Does nothing if empty
  private getScoresFromLS(): void | number[] {
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
