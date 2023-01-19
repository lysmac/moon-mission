/// <reference path="./Gameentities/gameEntity.ts"/> 
class GameEngine {
  private background: Background;
  private gameEntities: GameEntity[];
  private spawnTimout: number;
  private isPaused: boolean;
  private wasEscapeKeyDown: boolean;

  constructor() {
    this.background = new Background();
    this.gameEntities = [];
    this.spawnTimout = 2000;
    this.isPaused = false;
    this.wasEscapeKeyDown = false;
  }

  public update() {
    this.togglePause();
    if (this.isPaused) return;

    this.background.update();
    this.moveEntities();
    this.spawnEnemy();
  }

  public draw() {
    this.background.draw();
    if (this.isPaused) {
      text("PAUSE!!", 0, 0);
    }
    
    for(const gameEntity of this.gameEntities) {
      gameEntity.draw();
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
  
  private moveEntities() {
    for(const gameEntity of this.gameEntities) {
      gameEntity.update();
    }
  }

  private spawnEnemy() {
    // this.spawnTimout -= deltaTime; // Denna rad är osäker.
    if (this.spawnTimout < 0) {
      const randomX = width / 2;
      const position = createVector(randomX, 0);
      this.gameEntities.push(new Enemy(position));
      this.spawnTimout = 2000;
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
