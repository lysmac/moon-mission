/// <reference path="./Gameentities/gameEntity.ts"/> 
class GameEngine {
  private background: Background;
  private gameEntities: GameEntity[];
  private spawnTimout: number;
  private isPaused: boolean;
  private wasEscapeKeyDown: boolean;
  private pauseMenu: PauseMenu;

  constructor() {
    this.background = new Background();
    this.gameEntities = [];
    this.spawnTimout = 2000;
    this.isPaused = false;
    this.wasEscapeKeyDown = false;
    this.pauseMenu = new PauseMenu(100, 300, 800, 600, "#566E93");
  }

  public update() {
    this.togglePause();
    if (this.isPaused) return;

    this.background.update();
    this.moveEntities();
    this.spawnEnemy();
    this.displaySpaceship();
  }

  public draw() {
    this.background.draw();
    if (this.isPaused) {
      this.pauseMenu.draw();
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
    this.spawnTimout -= deltaTime;
    if (this.spawnTimout < 0) {
      const x = random(-width, width);
      const y = random(-height, -500)
      const position = createVector(x, y);
      this.gameEntities.push(new Astroid(position));
      this.spawnTimout = random(1000, 2000);
    }
  }

  private displaySpaceship() {
    for(let i=0; i<this.gameEntities.length; i++) {
      if(this.gameEntities[i] instanceof SpaceShip) {
        return
      }
    }
    const position = createVector(width/2-25, height-200)
    this.gameEntities.push(new SpaceShip(position));
  }
}
