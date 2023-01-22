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
    this.spawnAsteroid();
    this.spawnAlien();
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

  private spawnAsteroid() {
    this.spawnTimout -= deltaTime;
    if (this.spawnTimout < 0) {
      const x = random(-width, width);
      const y = random(-height, -500)
      const position = createVector(x, y);
      this.gameEntities.push(new Astroid(position));
      this.spawnTimout = random(1000, 5000);
    }
  }
  private spawnAlien() {
    this.spawnTimout -= deltaTime;
    if (this.spawnTimout < 0) {
      const x = random(-width, width);
      const y = random(-height, -500)
      const position = createVector(x, y);
      this.gameEntities.push(new Alien(position));
      this.spawnTimout = random(1000, 8000);
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
