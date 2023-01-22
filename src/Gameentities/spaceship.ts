class SpaceShip extends GameEntity {
    constructor(position: p5.Vector) {
        const size = createVector(100, 400);
        super(position, size, raket3);
    }

    private moveSpaceship() {
        if (keyIsDown(LEFT_ARROW) && this.position.x > 0) {
            this.position.x -= 5;
        }
        if (keyIsDown(RIGHT_ARROW) && this.position.x < width - this.size.x) {
            this.position.x += 5;
        }
      }
  
    public update() {
        this.moveSpaceship();
    }
  
    // public draw() {}
  }