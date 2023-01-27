/// <reference path="./Gameentities/gameentity.ts"/>

class GameEngine {
  private background: Background;
  private gameEntities: GameEntity[];
  private spawnTimout: number;
  private score: number;
  private isScoreBlinking: boolean;
  private dead: boolean;
  private game: Game;
  public oxygenDisplay: OxygenDisplay;

  constructor() {
    this.game = game;
    this.background = new Background();
    this.oxygenDisplay = new OxygenDisplay();
    this.gameEntities = [];
    this.spawnTimout = 2000;
    this.dead = false;
    this.score = 0;
    this.isScoreBlinking = false;
  }

  public update() {
    if (this.dead) {
      game.changeCurrentPlayerScore(this.score);
      this.game.changeCurrentScene("end");
      this.oxygenDisplay.pause();
      return;
    }
    if (this.oxygenDisplay.oxygenLevel <= 0) {
      this.dead = true;
      return;
    }

    this.background.update();
    this.checkCollision();
    this.incrementScore();
    this.displaySpaceship();
    this.moveEntities();
    this.spawnAsteroid();
    this.spawnAlien();
    this.spawnAsteroid();
    this.spawnAlien();
    this.spawnOxygenTank();
  }

  public draw() {
    this.background.draw();
    this.oxygenDisplay.draw();

    for (const gameEntity of this.gameEntities) {
      gameEntity.draw();
    }
    this.displayScore();
  }

  private moveEntities() {
    for (const gameEntity of this.gameEntities) {
      gameEntity.update();
    }
  }

  private displayScore() {
    textFont("secular one");
    textSize(24);
    if (this.isScoreBlinking) {
      fill(255, 255, 0);
    } else {
      fill(255);
    }
    text("Score:", 60, 40);
    text(this.score, 60, 70);
  }

  public scoreForBoard() {
    if (this.dead) {
      return this.score;
    } else {
      return;
    }
  }

  private incrementScore() {
    if (this.dead) {
      return;
    }
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
    const clonedGameEntities = [...this.gameEntities];
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
        if (!(entity instanceof OxygenTank)) {
          this.dead = true;
          return;
        } else {
          clonedGameEntities.splice(i, 1);
          if (this.oxygenDisplay.oxygenLevel > 90) {
            this.oxygenDisplay.oxygenLevel +=
              this.oxygenDisplay.maxOxygenLevel -
              this.oxygenDisplay.oxygenLevel;
          } else {
            this.oxygenDisplay.oxygenLevel += 10;
          }
        }
      }
    }
    this.gameEntities = clonedGameEntities;
  }

  private spawnAsteroid() {
    this.spawnTimout -= deltaTime;
    if (this.spawnTimout < 0) {
      const x = random(0, width);
      const y = random(-height, -500);
      const position = createVector(x, y);
      this.gameEntities.push(new Astroid(position));
      this.spawnTimout = random(3000, 8000);
    }
  }

  private spawnAlien() {
    this.spawnTimout -= deltaTime;
    if (this.spawnTimout < 0) {
      const x = random(0, width);
      const y = random(-height, -500);
      const position = createVector(x, y);
      this.gameEntities.push(new Alien(position));
      this.spawnTimout = random(1000, 5000);
    }
  }

  private spawnOxygenTank() {
    this.spawnTimout -= deltaTime;
    if (this.spawnTimout < 0) {
      const x = random(0, width);
      const y = random(0, -500);
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
