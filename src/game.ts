// Is this right or should it be in a separate file?
interface IStartGame {
  startNewGame(): void
  resumeGame(): void
}

class Game implements IStartGame {
  private gameEngine: GameEngine
  private gameMenu: GameMenu
  private pauseMenu: PauseMenu
  private gameOver: GameOver
  private menumusic: p5.SoundFile
  private gameplaymusic: p5.SoundFile
  // private endmusic: p5.SoundFile
  private bgmIsPlaying: boolean
  // private playerScore: Score;

  private currentScene: "start" | "play" | "pause" | "end"

  constructor() {
    this.gameMenu = new GameMenu(this, 100, 300, 400, 300, "rgba(255, 0, 0, 0.4)")
    this.pauseMenu = new PauseMenu(this, 100, 300, 400, 300, "rgba(255, 0, 0, 0.4)")
    this.gameOver = new GameOver(this, 100, 300, 400, 300, "rgba(255, 0, 0, 0.4)")
    this.gameEngine = new GameEngine()
    this.currentScene = "start"
    this.menumusic = menumusic
    this.gameplaymusic = gameplaymusic
    this.bgmIsPlaying = false
  }
  // new GameMenu(this)
  // Stod i klassschemat, vet inte exakt hur den ska användas?

  public update(): void {
    switch (this.currentScene) {
      case "start":
        this.gameMenu.update()
        this.playMusic()
        
        break
      case "play":
        this.gameEngine.update()
        this.stopMusic()
        // this.playMusic()
        
        
        break
      case "pause":
        this.pauseMenu.update()
        break
      case "end":
        this.gameOver.update()
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
      case "end":
        this.gameOver.draw()
        break
    }
  }

  public startNewGame(): void {
    // Denna behövs bara när man börjar på currentScene "Pause"
    this.currentScene = "play"

    this.gameEngine = new GameEngine()
  }

  public resumeGame(): void {}

  public playMusic(): void {
    if(this.currentScene == "start" && !this.bgmIsPlaying) {
      this.bgmIsPlaying = true
      this.menumusic.play()
    } else if (this.currentScene == "play" && this.bgmIsPlaying) {
      this.bgmIsPlaying = false
      this.gameplaymusic.play()
    }
  }
  public stopMusic(): void {
    if (this.currentScene == "play" && this.bgmIsPlaying) 
    console.log(bgmIsPlaying){
      this.bgmIsPlaying = false
      this.menumusic.stop()
    } else if (this.currentScene == "start" && this.bgmIsPlaying) {
      this.bgmIsPlaying = true
      this.gameplaymusic.stop()
    }
  }
}
