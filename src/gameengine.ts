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
  private ammunitionDisplay: AmmunitionDisplay;

  constructor() {
    this.game = game;
    this.background = new Background();
    this.oxygenDisplay = new OxygenDisplay();
    this.spaceship = new SpaceShip();
    this.ammunitionDisplay = new AmmunitionDisplay();
    this.gameEntities = [];
    this.asteroidSpawnTimout = 1000;
    this.alienSpawnTimout = 5000;
    this.oxygenSpawnTimout = 10000;
    this.speedBoostSpawnTimout = 20000;
    this.dead = false;
    this.score = 0;
    this.isScoreBlinking = false;
    this.enemyDeathSound = enemyDeathSound;
    this.shipCrashSound = shipCrashSound;
    this.isSpeedBoostActive = false;
    this.speedBoostEndTime = 0;
  }

  public update() {
    //Death
    if (this.spaceship.dead) {
      game.changeCurrentPlayerScore(this.score);
      this.game.changeCurrentScene("end");
      this.oxygenDisplay.pause();
    }
    // if oxygen level reaches 0 the game is over
    if (this.oxygenDisplay.oxygenLevel <= 0) {
      game.changeCurrentPlayerScore(this.score);

      this.dead = true;
      this.game.changeCurrentScene("end");
    }

    this.background.update();
    this.spaceship.update();
    this.ammunitionDisplay.update();
    this.incrementScore();
    this.checkLaserFired();

    // enemies start to spawn with delay after the game has started
    // aliens spawn after certain score is reached
    setTimeout(() => {
      this.spawnAsteroid();
      if (this.score > 1500) {
        this.spawnAlien();
      }
      this.spawnOxygenTank();
      this.spawnSpeedboost();
    }, 5000);
    this.clonedGameEntitiy = [...this.gameEntities];

    // loops through entities, any changes of array are made in a clone
    // when the loop is complete, original array copies clone
    for (let i = 0; i < this.gameEntities.length; i++) {
      this.checkCollision(this.gameEntities[i], i);
      this.checkHitEnemy(this.gameEntities[i], i);
      this.moveEntities(this.gameEntities[i]);
    }
    this.gameEntities = this.clonedGameEntitiy;
  }

  public draw() {
    this.background.draw();

    this.rechargeAmmo();

    for (const gameEntity of this.gameEntities) {
      gameEntity.draw();
    }
    this.displayScore();
    this.oxygenDisplay.draw();
    this.ammunitionDisplay.draw();
    this.spaceship.draw();
  }

  // regulates the animation of entities
  private moveEntities(entity: GameEntity) {
    entity.update();
  }

  //Displays score in top left corner
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

  // Dont know why this was here, it was not used anywhere
  // public scoreForBoard() {
  //   if (this.dead) {
  //     return this.score;
  //   } else {
  //     return;
  //   }
  // }

  // score +1 evey frame, score blinks yellow every 500 points
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

  // Checks collision between the spaceship entity and if it has collided with another entity
  //by comparing the position and size of entities to see if they overlap
  private checkCollision(entity: GameEntity, index: number) {
    if (
      this.spaceship.position.x < entity.position.x + entity.size.x &&
      this.spaceship.position.x + this.spaceship.size.x > entity.position.x &&
      this.spaceship.position.y < entity.position.y + entity.size.y &&
      this.spaceship.size.y + this.spaceship.position.y > entity.position.y
    ) {
      if (!(entity instanceof OxygenTank) && !(entity instanceof SpeedBoost)) {
        this.collidingWithEnemy(entity, index);
      }

      if (entity instanceof OxygenTank) {
        this.collidingWithOxygenTank(index);
      }

      if (entity instanceof SpeedBoost) {
        this.collidingWithSpeedBoost(index);
      }
    }
  }

  //Determines behavior when colliding with enemy with or without speedboost
  private collidingWithEnemy(entity: GameEntity, index: number) {
    if (this.isSpeedBoostActive) {
      this.clonedGameEntitiy.splice(index, 1);
      this.gainScoreFromKills(entity);
      this.enemyDeathSound.play();
    } else {
      this.spaceship.explode();
      if (entity instanceof Alien) {
        entity.velocity = createVector(0, 0);
      }
      entity.currentSpeed = createVector(0, 0);
      if (!this.shipCrashSound.isPlaying()) {
        this.shipCrashSound.play();
      }
    }
  }

  // fills up oxygen level with 10, if level is > 90 fills up to max 100
  private collidingWithOxygenTank(index: number) {
    this.clonedGameEntitiy.splice(index, 1);

    if (this.oxygenDisplay.oxygenLevel > 90) {
      this.oxygenDisplay.oxygenLevel +=
        this.oxygenDisplay.maxOxygenLevel - this.oxygenDisplay.oxygenLevel;
    } else {
      this.oxygenDisplay.oxygenLevel += 10;
    }
  }

  //Increases speed and score, regulates spaceship behavior and limits it to 5 seconds
  private collidingWithSpeedBoost(index: number) {
    this.clonedGameEntitiy.splice(index, 1);
    this.spaceship.immortal = true;
    this.isSpeedBoostActive = true;
    this.spaceship.boostedSpaceship();
    this.speedBoostEndTime = Date.now() + 5000;

    for (let i = 0; i < this.clonedGameEntitiy.length; i++) {
      this.clonedGameEntitiy[i].boostCurrentSpeed(this.speedBoostEndTime);
    }

    setTimeout(() => {
      this.spaceship.immortal = false;
      this.isSpeedBoostActive = false;
      this.spaceship.regularSpaceship();
    }, 5000);
  }

  // if a laserbullet is fired, removes 1 from ammunition
  // if ammunition is 0, reset the values to prepare recharge
  private checkLaserFired() {
    if (this.spaceship.hasLaserFired) {
      this.ammunitionDisplay.currentAmmo -= 1;
      this.spaceship.hasLaserFired = false;

      if (this.ammunitionDisplay.currentAmmo == 0) {
        this.spaceship.haveAmmo = false;
        this.ammunitionDisplay.cooldownBar = 1;
      }
    }
  }

  // when ammunition is 0 and the cooldown is complete, reset ammunition
  private rechargeAmmo() {
    if (
      this.ammunitionDisplay.currentAmmo == 0 &&
      this.ammunitionDisplay.cooldownBar == 100
    ) {
      this.ammunitionDisplay.currentAmmo = 15;
      this.spaceship.haveAmmo = true;
    }
  }

  // dictaes behaviour of laserbullets and entites upon collision
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
          entity.hp -= 1;
          this.spaceship.laserBeams.splice(i, 1);

          if (entity instanceof Astroid) {
            entity.image = asteroidHit;
            setTimeout(() => {
              entity.image = asteroid;
            }, 150);
          }

          if (entity instanceof Alien) {
            entity.image = alienHit;
            setTimeout(() => {
              entity.image = alien;
            }, 150);
          }
        } else {
          this.clonedGameEntitiy.splice(index, 1);
          this.enemyDeathSound.play();
          this.spaceship.laserBeams.splice(i, 1);

          const lootRNG = Math.floor(random(1, 100));
          const lootDropPosition = createVector(
            entity.position.x + entity.size.x / 2,
            entity.position.y + entity.size.y / 2
          );

          if (lootRNG < 10) {
            this.clonedGameEntitiy.push(new OxygenTank(lootDropPosition));
          }

          this.gainScoreFromKills(entity);
        }
      }
    }
  }

  // when enemy is killed, respective gained score from kill appears with animation
  private gainScoreFromKills(entity: GameEntity) {
    if (entity instanceof Astroid) {
      this.score += 10;

      const scoreVisual = "+10";
      const scorePosition = createVector(
        entity.position.x + entity.size.x / 2,
        entity.position.y + entity.size.y / 2
      );

      const scoreEntity = new KillScore(scorePosition, scoreVisual);
      this.clonedGameEntitiy.push(scoreEntity);
    }
    if (entity instanceof Alien) {
      this.score += 50;

      const scoreVisual = "+50";
      const scorePosition = createVector(
        entity.position.x + entity.size.x / 2,
        entity.position.y + entity.size.y / 2
      );

      const scoreEntity = new KillScore(scorePosition, scoreVisual);
      this.clonedGameEntitiy.push(scoreEntity);
    }
  }
  
  //Spawns asteroids randomly every 1-2 seconds
  private spawnAsteroid() {
    this.asteroidSpawnTimout -= deltaTime;
    if (this.asteroidSpawnTimout < 0) {
      const x = random(0, width);
      const y = random(-125, -130);
      const position = createVector(x, y);
      const asteroid = new Astroid(position);
      this.gameEntities.push(asteroid);

      if (this.isSpeedBoostActive) {
        asteroid.boostCurrentSpeed(this.speedBoostEndTime);
      }
      this.asteroidSpawnTimout = random(1000, 2000);
    }
  }

  //Spawns aliens randomly every 1-5 seconds
  private spawnAlien() {
    this.alienSpawnTimout -= deltaTime;
    if (this.alienSpawnTimout < 0) {
      const x = random(0, width);
      const y = random(-125, -130);
      const position = createVector(x, y);
      const alien = new Alien(position);
      this.gameEntities.push(alien);

      if (this.isSpeedBoostActive) {
        alien.boostCurrentSpeed(this.speedBoostEndTime);
      }
      this.alienSpawnTimout = random(1000, 5000);
    }
  }

  //Spawns oxygen tanks randomly every 1-20 seconds
  private spawnOxygenTank() {
    this.oxygenSpawnTimout -= deltaTime;
    if (this.oxygenSpawnTimout < 0) {
      const x = random(0, width);
      const y = random(-125, -130);
      const position = createVector(x, y);
      const oxygenTank = new OxygenTank(position);
      this.gameEntities.push(oxygenTank);

      if (this.isSpeedBoostActive) {
        oxygenTank.boostCurrentSpeed(this.speedBoostEndTime);
      }
      this.oxygenSpawnTimout = random(1000, 20000);
    }
  }

  //Spawns speed boosts randomly every 1-20 seconds
  private spawnSpeedboost() {
    this.speedBoostSpawnTimout -= deltaTime;
    if (this.speedBoostSpawnTimout < 0) {
      const x = random(0, width);
      const y = random(-125, -130);
      const position = createVector(x, y);
      const speedboost = new SpeedBoost(position);
      this.gameEntities.push(speedboost);

      if (this.isSpeedBoostActive) {
        speedboost.boostCurrentSpeed(this.speedBoostEndTime);
      }
      this.speedBoostSpawnTimout = random(1000, 20000);
    }
  }
}
