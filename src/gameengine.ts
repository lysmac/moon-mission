class GameEngine {
  private background: Background;
  private isPaused: boolean = false;

  constructor() {
    this.background = new Background();
    this.isPaused = false;
  }

  public update() {
    this.background.update();
  }

  public draw() {
    // this.togglePause();
    this.background.draw();
  }

  public togglePause() {
    if (keyCode === ESCAPE) {
      // Hide pause menu and resume game
      this.isPaused = false;
    } else {
      // Show pause menu and pause game
      this.isPaused = true;
      this.pauseMenu.draw();
    }
  }
}

// class PauseMenu {
//   private isPaused: boolean = false;

//   public togglePause(): void {
//       if (event.keyCode === 27) { // 27 is the key code for the Escape key
//           if (this.isPaused) {
//               // Hide pause menu and resume game
//               this.isPaused = false;
//           } else {
//               // Show pause menu and pause game
//               this.isPaused = true;
//               this.pauseMenu.draw();
//           }
//       }
//   }
// }
