/// <reference path="./Gameentities/gameentity.ts"/>

class GameEngine {
  private background: Background;
  private gameEntities: GameEntity[];
  public clonedGameEntitiy: GameEntity[] = [];
  private asteroidSpawnTimout: number;
  private alienSpawnTimout: number;
  private oxygenSpawnTimout: number;
  private speedBoostSpawnTimout: number;
  private score: number;
  private isScoreBlinking: boolean;
  private dead: boolean;
  private game: Game;
  public spaceship: SpaceShip;
  private enemyDeathSound: p5.SoundFile;
  private shipCrashSound: p5.SoundFile;
  private speedBoostEndTime: number;
  private isSpeedBoostActive: boolean;
  public oxygenDisplay: OxygenDisplay;

  constructor() {
    this.game = game;
    this.background = new Background();
    this.oxygenDisplay = new OxygenDisplay();
    this.spaceship = new SpaceShip();
    this.gameEntities = [];
    this.asteroidSpawnTimout = 1000;
    this.alienSpawnTimout = 5000;
    this.oxygenSpawnTimout = 10000;
    this.speedBoostSpawnTimout = 500;
    this.dead = false;
    this.score = 0;
    this.isScoreBlinking = false;
    this.enemyDeathSound = enemyDeathSound;
    this.shipCrashSound = shipCrashSound;
    this.isSpeedBoostActive = false;
    this.speedBoostEndTime = 0;
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
    this.spawnSpeedboost();
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
      if (!(entity instanceof OxygenTank ) && 
      !(entity instanceof SpeedBoost)) {

        this.collidingWithEnemy(index);
      } 

      if (entity instanceof OxygenTank) {

        this.collidingWithOxygenTank(index);
      }

      if (entity instanceof SpeedBoost) {

        this.collidingWithSpeedBoost(index);
      }
    }
  }

  private collidingWithEnemy(index: number) {
    if (this.isSpeedBoostActive) {
      this.clonedGameEntitiy.splice(index, 1);
    } else {
      // this.spaceship.explode();
      this.dead = true;
    }
    this.shipCrashSound.play();
  }

  private collidingWithOxygenTank(index: number) {
    this.clonedGameEntitiy.splice(index, 1);

    if (this.oxygenDisplay.oxygenLevel > 90) {
      this.oxygenDisplay.oxygenLevel +=
      this.oxygenDisplay.maxOxygenLevel - 
      this.oxygenDisplay.oxygenLevel;
    } else {
        this.oxygenDisplay.oxygenLevel += 10;
      }
  }

  private collidingWithSpeedBoost(index: number) {
    this.clonedGameEntitiy.splice(index, 1);
    this.spaceship.immortal = true;
    this.isSpeedBoostActive = true;
    this.speedBoostEndTime = Date.now() + 5000;

    for(let i = 0; i < this.clonedGameEntitiy.length; i++ ) {
      this.clonedGameEntitiy[i].boostCurrentSpeed(this.speedBoostEndTime);
    }
        //loop through sbraket1,2,3
    setTimeout(() => {
      this.spaceship.immortal = false;
      this.isSpeedBoostActive = false;

    }, 5000);
  }

  private checkHitEnemy(entity: GameEntity, index: number) {
    if (!this.spaceship.laserBeams) return;
    if (entity instanceof OxygenTank) return;
    if (entity instanceof SpeedBoost) return;

    for (let i = 0; i < this.spaceship.laserBeams.length; i++) {
      const laserBullet = this.spaceship.laserBeams[i];

      if (
        laserBullet.position.x < entity.position.x + entity.size.x &&
        laserBullet.position.x + laserBullet.size.x > entity.position.x &&
        laserBullet.position.y < entity.position.y + entity.size.y &&
        laserBullet.size.y + laserBullet.position.y > entity.position.y
      ) {
        if (entity.hp > 1) {
          entity.hp -= 1
          this.spaceship.laserBeams.splice(i, 1);

          if (entity instanceof Astroid) {
            entity.image = asteroidHit;
            setTimeout (() => {
              entity.image = asteroid
            }, 150);
          }

          if (entity instanceof Alien) {
            entity.image = alienHit;
            setTimeout (() => {
              entity.image = alien
            }, 150);
          }
        } else {
          this.clonedGameEntitiy.splice(index, 1);
          this.enemyDeathSound.play();
          this.spaceship.laserBeams.splice(i, 1);
  
          const lootRNG = Math.floor(random(1, 100));
          const lootDropPosition = createVector(
            entity.position.x + entity.size.x / 2, 
            entity.position.y + entity.size.y / 2);
          
          if (lootRNG < 7) {
            this.clonedGameEntitiy.push(new OxygenTank(lootDropPosition));
          }
        }

      }
    }
  }

  private spawnAsteroid() {
    this.asteroidSpawnTimout -= deltaTime;
    if (this.asteroidSpawnTimout < 0) {
      const x = random(0, width);
      const y = random(-125, -130);
      const position = createVector(x, y);
      const asteroid = new Astroid(position);
      this.gameEntities.push(asteroid);

      if(this.isSpeedBoostActive) {
        asteroid.boostCurrentSpeed(this.speedBoostEndTime);
      }
      this.asteroidSpawnTimout = random(1000, 2000);
    }
  }

  private spawnAlien() {
    this.alienSpawnTimout -= deltaTime;
    if (this.alienSpawnTimout < 0) {
      const x = random(0, width);
      const y = random(-125, -130);
      const position = createVector(x, y);
      const alien = new Alien(position);
      this.gameEntities.push(alien);

      if(this.isSpeedBoostActive) {
        alien.boostCurrentSpeed(this.speedBoostEndTime);
      }
      this.alienSpawnTimout = random(1000, 5000);
    }
  }

  private spawnOxygenTank() {
    this.oxygenSpawnTimout -= deltaTime;
    if (this.oxygenSpawnTimout < 0) {
      const x = random(0, width);
      const y = random(-125, -130);
      const position = createVector(x, y);
      const oxygenTank = new OxygenTank(position);
      this.gameEntities.push(oxygenTank);

      if(this.isSpeedBoostActive) {
        oxygenTank.boostCurrentSpeed(this.speedBoostEndTime);
      }
      this.oxygenSpawnTimout = random(1000, 20000);
    }
  }
  
  private spawnSpeedboost() {
    this.speedBoostSpawnTimout -= deltaTime;
    if (this.speedBoostSpawnTimout < 0) {
      const x = random(0, width);
      const y = random(-125, -130);
      const position = createVector(x, y);
      const speedboost = new SpeedBoost(position);
      this.gameEntities.push(speedboost);

      if(this.isSpeedBoostActive) {
        speedboost.boostCurrentSpeed(this.speedBoostEndTime);
      }
      this.speedBoostSpawnTimout = random(1000, 2000);
    }
  }
}