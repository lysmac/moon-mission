class GameEngine {
  private background: Background;
  private isPaused: boolean;
  private wasEscapeKeyDown: boolean;
  private pauseMenu: PauseMenu;

  constructor() {
    this.background = new Background();
    this.isPaused = false;
    this.wasEscapeKeyDown = false;
    this.pauseMenu = new PauseMenu(100, 300, 800, 600, "#566E93");
  }

  public update() {
    this.togglePause();
    if (this.isPaused) return;

    this.background.update();
  }

  public draw() {
    this.background.draw();
    if (this.isPaused) {
      this.pauseMenu.draw();
    }
  }

  public togglePause() {
    const espaceWasPressed = !this.wasEscapeKeyDown && keyIsDown(ESCAPE);
    // const espaceWasReleased = this.wasEscapeKeyDown && !keyIsDown(ESCAPE);

    if (espaceWasPressed) {
      // Show pause menu and pause game
      this.isPaused = !this.isPaused;
    }

    this.wasEscapeKeyDown = keyIsDown(ESCAPE);
  }
}
