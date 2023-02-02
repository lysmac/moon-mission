interface IStartGame {
  startNewGame(): void
  readAllPlayerScores(): number[]
  changeCurrentScene(scene: string): void
  readCurrentPlayerScore(): number
  changeCurrentPlayerScore(input: number): void
  pushToAllPlayerScores(playerScore: number): void
  scoreCheckSet(anything: boolean): void
  scoreCheckGet(): boolean
}

class Game implements IStartGame {
  private gameEngine: GameEngine
  private gameMenu: GameMenu
  private pauseMenu: PauseMenu
  private gameOver: GameOver
  private scoreboard: ScoreBoard
  private menumusic: p5.SoundFile
  private gameplaymusic: p5.SoundFile
  private allPlayerScores: number[] = []
  private currentPlayerScore: number
  private currentScene: string
  private wasEscapeKeyDown: boolean
  private wasMKeyDown: boolean
  private wasHKeyDown: boolean
  public addedScoreToList: boolean
  private mute: boolean

  constructor() {
    this.gameMenu = new GameMenu(this)
    this.pauseMenu = new PauseMenu(this)
    this.gameOver = new GameOver(this)
    this.scoreboard = new ScoreBoard(this)
    this.gameEngine = new GameEngine()
    this.menumusic = menumusic
    this.gameplaymusic = gameplaymusic
    this.currentScene = "start"
    this.currentPlayerScore = 0
    this.wasEscapeKeyDown = false
    this.wasMKeyDown = false
    this.wasHKeyDown = false
    this.addedScoreToList = false
    this.mute = true
  }

  public update(): void {
    this.getScoresFromLS()
    this.muteSounds()
    this.togglePause()
    this.toggleHighScore()

    // This keep track of which scene is active
    switch (this.currentScene) {
      case "start":
        this.gameMenu.update()
        break
      case "score":
        this.scoreboard.update()
        break
      case "play":
        this.gameEngine.update()
        break
      case "pause":
        this.pauseMenu.update()
        break
      case "end":
        this.gameOver.update()
        break
    }
  }
// This displays the active scene
  public draw(): void {
    switch (this.currentScene) {
      case "start":
        this.gameMenu.draw()
        break
      case "score":
        this.scoreboard.draw()
        break
      case "play":
        this.gameEngine.draw()
        break
      case "pause":
        this.gameEngine.draw()
        this.pauseMenu.draw()
        break
      case "end":
        this.gameEngine.draw()
        this.gameOver.draw()
        break
    }
  }
// Starts the game and resets the gameEngine
  public startNewGame(): void {
    this.gameplaymusic.stop()
    this.scoreCheckSet(false)
    this.changeCurrentScene("play")
    this.gameEngine = new GameEngine()
  }

// Method that mutes all sound and music in the game
  private muteSounds() {
    const mWasPressed = !this.wasMKeyDown && keyIsDown(77);
    if (mWasPressed && this.mute === true) {
      this.mute = false;
      outputVolume(0.2);
      if (this.currentScene === "start" || this.currentScene === "score") {
        if (!this.menumusic.isPlaying()) {
          this.menumusic.play()
        }
      }
    } else if (mWasPressed && this.mute === false) {
      this.mute = true;
      outputVolume(0);
    }
    this.wasMKeyDown = keyIsDown(77);
  }
  
// Reads all playerscore from the gameEngine
  public readAllPlayerScores() {
    return this.allPlayerScores
  }
// Push the current score to the variable allPlayerScores array
  public pushToAllPlayerScores(playerScore: number) {
    this.allPlayerScores.push(playerScore)
  }
// Change the current scene and stops the current music and starts the new music for active scene
  public changeCurrentScene(scene: string): void {
    this.currentScene = scene

    if (scene === "start" || scene === "score") {
      if (!this.menumusic.isPlaying()) {
        this.menumusic.play()
      }
    }
    if (scene === "play") {
      this.menumusic.stop()
      this.gameplaymusic.play()
    }
    if (scene === "end") {
      this.gameplaymusic.stop()
    }
  }
// Reads the current score from the gameEngine
  public readCurrentPlayerScore(): number {
    return this.currentPlayerScore
  }
// 
  public changeCurrentPlayerScore(input: number) {
    this.currentPlayerScore = input
  }
// Pauses the game and stops the music and the oxygen display
  public togglePause() {
    const espaceWasPressed = !this.wasEscapeKeyDown && keyIsDown(ESCAPE)
    if (espaceWasPressed && this.currentScene === "play") {
      this.currentScene = "pause"
      this.gameplaymusic.pause()
      this.gameEngine.oxygenDisplay.pause()
    } else if (espaceWasPressed && this.currentScene === "pause") {
      this.currentScene = "play";
      this.gameplaymusic.play();
      this.gameEngine.oxygenDisplay.resume();
    } else if (espaceWasPressed && this.currentScene === "end") {
      this.changeCurrentScene("start");
    }

    this.wasEscapeKeyDown = keyIsDown(ESCAPE)
  }
  // Use the H key to toggle between the start and score scene
  public toggleHighScore() {
    const hWasPressed = !this.wasHKeyDown && keyIsDown(72)
    if (hWasPressed && this.currentScene === "start") {
      this.currentScene = "score"
    } else if (hWasPressed && this.currentScene === "score") {
      this.currentScene = "start"
    }

    this.wasHKeyDown = keyIsDown(72)
  }

  public scoreCheckSet(anything: boolean): void {
    this.addedScoreToList = anything
  }
  public scoreCheckGet() {
    return this.addedScoreToList
  }
// Loads the playerscore from the local storage
  private getScoresFromLS() {
    const scores = localStorage.getItem("playerScores")
    const scoresParsed = JSON.parse(scores!)

    if (scoresParsed === null) {
      return
    } else {
      this.allPlayerScores = scoresParsed
      return
    }
  }
}
