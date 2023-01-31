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
  public addedScoreToList: boolean;

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
    this.addedScoreToList = false;
  }

  public update(): void {
    this.getScoresFromLS();
    this.togglePause();
    this.toggleMusic();
    console.log(this.currentScene);
    switch (this.currentScene) {
      case "start":
        if (keyIsDown(72)) {
          console.log("pressed h");
          this.changeCurrentScene("score");
        }
        this.gameMenu.update();

        break;
      case "score":
        this.scoreboard.update();
        // this.playMusic()
        break;

      case "play":
        this.gameEngine.update();
        // this.playMusic();
        // this.stopMusic();

        break;
      case "pause":
        this.pauseMenu.update();
        break;
      case "end":
        this.gameOver.update();
        this.stopMusic();
        break;
    }
  }

  public draw(): void {
    // this.toggleMusic();
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
    // Denna behövs bara när man börjar på currentScene "Pause"
    // this.addedScoreToList = false;
    this.scoreCheckSet(false);

    this.currentScene = "play";
    this.gameEngine = new GameEngine();
    
    
  }

  public resumeGame(): void {}

  // This function is used to play the right music at the right scene
  public playMusic(): void {
   
  }
  // This function is used to stop music from playing in the wrong scene
  public stopMusic(): void {
    
  }

  // This function is used to toggle the music on and off
  public toggleMusic(): void {
    // check if s key is pressed
    if (keyIsDown(83) && !this.wasSKeyDown) {
      // check if current scene is start and menu music is playing
      if (this.wasSKeyDown === false) {
        outputVolume(0);
        this.wasSKeyDown = true       }
        
      if (this.wasSKeyDown === true) {
        outputVolume(0.8);
        this.wasSKeyDown = false;
      }
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
    

    if (scene === "start") {
      // if (!this.menumusic.isPlaying()) {
        outputVolume(0.1);
        this.gameplaymusic.stop()
        this.menumusic.play();
      // }
    } else if (scene === "play") {
      // if (!this.gameplaymusic.isPlaying()) {
        outputVolume(0.1);
        this.menumusic.stop();
        this.gameplaymusic.play();
      // }
    }
    

    // if (scene !== "start" && this.menumusic.isPlaying()) {
    //   this.menumusic.stop();
    // }
    // if (scene !== "play" && this.gameplaymusic.isPlaying()) {
    //   this.gameplaymusic.stop();
    // }


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
