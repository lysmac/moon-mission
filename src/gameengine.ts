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
    this.pauseMenu = new PauseMenu(this, 100, 300, 400, 300, "rgba(255, 0, 0, 0.3)");
  }

  public update() {
    this.togglePause();
    // if (this.isPaused) return;
    if (this.isPaused) {
      this.pauseMenu.update();
      return;
    }

    this.background.update();
    this.moveEntities();

    this.spawnAsteroid();
    this.spawnAlien();

    
    this.displaySpaceship();

  }

  public draw() {
    this.background.draw();

    
    for(const gameEntity of this.gameEntities) {
      gameEntity.draw();
    }
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
