/// <reference path="./Gameentities/gameEntity.ts"/> 
class GameEngine {
  private background: Background; 
  private gameEntities: GameEntity[];
  private spawnTimout: number;

  public constructor() {
    this.background = new Background();
    this.gameEntities = [];
    this.spawnTimout = 2000;
  }

  public update() {
    this.background.update();
    this.moveEntities();
    this.spawnEnemy();
  }

  public draw() {
    this.background.draw();
    for(const gameEntity of this.gameEntities) {
      gameEntity.draw();
    }
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