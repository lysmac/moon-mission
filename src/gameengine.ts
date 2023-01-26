/// <reference path="./Gameentities/gameentity.ts"/>

class GameEngine {
  private background: Background;
  private gameEntities: GameEntity[];
  private spawnTimout: number;
  private score: number;
  private isScoreBlinking: boolean;
  private dead: boolean;
  private game: Game;

  constructor() {
    this.game = game;
    this.background = new Background();
    this.gameEntities = [];
    this.spawnTimout = 2000;
    this.dead = false;
    // this.gameOver = new GameOver(
    //   game,
    //   100,
    //   300,
    //   400,
    //   300,
    //   "rgba(255, 0, 0, 0.3)",
    //   this
    // );

    this.score = 0;
    this.isScoreBlinking = false;
  }

  public update() {
    if (this.dead) {
      game.changeCurrentPlayerScore(this.score);
      this.game.changeCurrentScene("end");
      return;
    }

    this.checkCollision();
    this.incrementScore();
    this.background.update();
    this.moveEntities();
    this.spawnAsteroid();
    this.spawnAlien();

    this.displaySpaceship();
  }

  public draw() {
    this.background.draw();

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
        // this.isPaused = true;
        this.dead = true;
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
