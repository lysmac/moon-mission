/// <reference path="./Gameentities/gameentity.ts"/> 

class GameEngine {
  private background: Background;
  private gameEntities: GameEntity[];
  private spawnTimout: number;
  private isPaused: boolean;
  private wasEscapeKeyDown: boolean;
  private pauseMenu: PauseMenu;
  private score: number;
  private isScoreBlinking: boolean;
  private gameOver: GameOver;
  private dead: boolean;
  private oxygenDisplay: OxygenDisplay;

  constructor() {
    this.background = new Background();
    this.oxygenDisplay = new OxygenDisplay();
    this.gameEntities = [];
    this.spawnTimout = 2000;
    this.isPaused = false;
    this.wasEscapeKeyDown = false;
    this.dead = false;
    this.gameOver = new GameOver(
      game,
      100,
      300,
      400,
      300,
      "rgba(255, 0, 0, 0.3)"
    );

    this.pauseMenu = new PauseMenu(
      game,
      100,
      300,
      400,
      300,
      "rgba(255, 0, 0, 0.3)"
    );

    this.score = 0;
    this.isScoreBlinking = false;
  }

  public update() {
    this.togglePause();
    // if (this.isPaused) return;
    if (this.isPaused) {
      this.pauseMenu.update();
      return;
    }
    if (this.dead) {
      this.gameOver.update();
      return;
    }
    if (this.oxygenDisplay.oxygenLevel <= 0) {
      this.dead = true;
      this.gameOver.update();
      return;
    }
    
    this.background.update();
    this.checkCollision();
    this.incrementScore();
    this.displaySpaceship();
    this.moveEntities();

    this.spawnAsteroid();
    this.spawnAlien();
    this.spawnOxygenTank();
  }

  public draw() {
    this.background.draw();
    this.oxygenDisplay.draw();

    this.displayScore();

    for (const gameEntity of this.gameEntities) {
      gameEntity.draw();
    }
    if (this.isPaused && !this.dead) {
      this.pauseMenu.draw();
    }

    if (this.dead) {
      this.gameOver.draw();
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
    for (const gameEntity of this.gameEntities) {
      gameEntity.update();
    }
  }

  private displayScore() {
    textSize(24);
    if (this.isScoreBlinking) {
      fill(255, 255, 0);
    } else {
      fill(255);
    }
    text(`Score: ${this.score}`, 20, 40);
  }

  private incrementScore() {
    this.score += 1;
    if (this.score % 500 === 0 && !this.isScoreBlinking) {
      this.isScoreBlinking = true;
      setTimeout(() => {
        this.isScoreBlinking = false;
      }, 500);
    }
  }

  private checkCollision() {
    const spaceship = this.gameEntities.find((e) => e instanceof SpaceShip);
    const oxygenTank = this.gameEntities.find((e) => e instanceof OxygenTank);
    if (!spaceship) return;

    for (let i = 0; i < this.gameEntities.length; i++) {
      const entity = this.gameEntities[i];
      if (entity === spaceship) continue;

      if (
        spaceship.position.x < entity.position.x + entity.size.x &&
        spaceship.position.x + spaceship.size.x > entity.position.x &&
        spaceship.position.y < entity.position.y + entity.size.y &&
        spaceship.size.y + spaceship.position.y > entity.position.y
      ) {
        if (entity !== oxygenTank) {
          this.dead = true;
        } else {
          this.gameEntities.splice(i, 1);
          if (this.oxygenDisplay.oxygenLevel > 90) {
            this.oxygenDisplay.oxygenLevel += this.oxygenDisplay.maxOxygenLevel - this.oxygenDisplay.oxygenLevel
          } else {
            this.oxygenDisplay.oxygenLevel += 10;
          }
        }
      }
    }
  }

  private spawnAsteroid() {
    this.spawnTimout -= deltaTime;
    if (this.spawnTimout < 0) {
      const x = random(-width, width);
      const y = random(-height, -500);
      const position = createVector(x, y);
      this.gameEntities.push(new Astroid(position));
      this.spawnTimout = random(1000, 5000);
    }
  }

  private spawnAlien() {
    this.spawnTimout -= deltaTime;
    if (this.spawnTimout < 0) {
      const x = random(-width, width);
      const y = random(-height, -500);
      const position = createVector(x, y);
      this.gameEntities.push(new Alien(position));
      this.spawnTimout = random(1000, 8000);
    }
  }

  private spawnOxygenTank() {
    this.spawnTimout -= deltaTime;
    if (this.spawnTimout < 0) {
      const x = random(-width, width);
      const y = random(-height, -500);
      const position = createVector(x, y);
      this.gameEntities.push(new OxygenTank(position));
      this.spawnTimout = random(1000, 8000);
    }
  }

  private displaySpaceship() {
    for (let i = 0; i < this.gameEntities.length; i++) {
      if (this.gameEntities[i] instanceof SpaceShip) {
        return;
      }
    }
    const position = createVector(width / 2 - 25, height - 210);
    this.gameEntities.push(new SpaceShip(position));
  }
}
