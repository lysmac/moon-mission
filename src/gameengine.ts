/// <reference path="./Gameentities/gameentity.ts"/>

class GameEngine {
  private background: Background;
  private gameEntities: GameEntity[];
  private clonedGameEntitiy: GameEntity[] = [];
  private spawnTimout: number;
  private score: number;
  private isScoreBlinking: boolean;
  private dead: boolean;
  private game: Game;
  private spaceship: SpaceShip;
  public oxygenDisplay: OxygenDisplay;

  constructor() {
    this.game = game;
    this.background = new Background();
    this.oxygenDisplay = new OxygenDisplay();
    this.spaceship = new SpaceShip();
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
    this.spaceship.update();
    this.incrementScore();
    this.spawnAlien();
    this.spawnAsteroid();
    this.spawnOxygenTank();
    this.clonedGameEntitiy = [...this.gameEntities];

    for (let i = 0; i < this.gameEntities.length; i++) {
      this.checkCollision(this.gameEntities[i], i);
      this.checkHitEnemy(this.gameEntities[i], i);
      this.moveEntities(this.gameEntities[i]);
    }
    this.gameEntities = this.clonedGameEntitiy;
  }

  public draw() {
    this.background.draw();
    this.oxygenDisplay.draw();
    this.spaceship.draw();

    for (const gameEntity of this.gameEntities) {
      debugger;
      gameEntity.draw();
    }
    this.displayScore();
  }

  private moveEntities(entity: GameEntity) {
    entity.update();
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

  private checkCollision(entity: GameEntity, index: number) {
    if (
      this.spaceship.position.x < entity.position.x + entity.size.x &&
      this.spaceship.position.x + this.spaceship.size.x > entity.position.x &&
      this.spaceship.position.y < entity.position.y + entity.size.y &&
      this.spaceship.size.y + this.spaceship.position.y > entity.position.y
    ) {
      if (!(entity instanceof OxygenTank)) {
        this.dead = true;
        return;
      } else {
        this.clonedGameEntitiy.splice(index, 1);
        if (this.oxygenDisplay.oxygenLevel > 90) {
          this.oxygenDisplay.oxygenLevel +=
            this.oxygenDisplay.maxOxygenLevel - this.oxygenDisplay.oxygenLevel;
        } else {
          this.oxygenDisplay.oxygenLevel += 10;
        }
      }
    }
  }

  private checkHitEnemy(entity: GameEntity, index: number) {
    if (!this.spaceship.laserBeams) return;
    if (entity instanceof OxygenTank) return;
    // const clonedLaserBeam = [...this.spaceship.laserBeams];

    for (let i = 0; i < this.spaceship.laserBeams.length; i++) {
      const laserBullet = this.spaceship.laserBeams[i];
      if (
        laserBullet.position.x < entity.position.x + entity.size.x &&
        laserBullet.position.x + laserBullet.size.x > entity.position.x &&
        laserBullet.position.y < entity.position.y + entity.size.y &&
        laserBullet.size.y + laserBullet.position.y > entity.position.y
      ) {
        this.clonedGameEntitiy.splice(index, 1);
        this.spaceship.laserBeams.splice(i, 1);
        return;
      }
    }
    // this.spaceship.laserBeams = clonedLaserBeam;
  }

  private spawnAsteroid() {
    this.spawnTimout -= deltaTime;
    if (this.spawnTimout < 0) {
      const x = random(0, width);
      const y = random(-20, -height);
      const position = createVector(x, y);
      this.gameEntities.push(new Astroid(position));
      this.spawnTimout = random(3000, 8000);
    }
  }

  private spawnAlien() {
    this.spawnTimout -= deltaTime;
    if (this.spawnTimout < 0) {
      const x = random(0, width);
      const y = random(-20, -height);
      const position = createVector(x, y);
      this.gameEntities.push(new Alien(position));
      this.spawnTimout = random(1000, 5000);
    }
  }

  private spawnOxygenTank() {
    this.spawnTimout -= deltaTime;
    if (this.spawnTimout < 0) {
      const x = random(0, width);
      const y = random(0, -height);
      const position = createVector(x, y);
      this.gameEntities.push(new OxygenTank(position));
      this.spawnTimout = random(1000, 8000);
    }
  }
}
