class SpaceShip extends GameEntity {
  private images: p5.Image[];
  private currentImageIndex: number;
  private timer: number;
  private delay: number;
  private laserBeams: LaserBeam[];
  private laserBeamDelay: number;
  private laserBeamTimer: number;

  constructor(position: p5.Vector) {
    const size = createVector(50, 200);
    super(position, size, raket3);
    this.images = [raket3, raket4, raket5];
    this.currentImageIndex = 0;
    this.timer = 0;
    this.delay = 20;
    this.laserBeams = [];
    this.laserBeamDelay = 20;
    this.laserBeamTimer = 0;
  }

  private moveSpaceship() {
    if (keyIsDown(UP_ARROW) && this.position.y > 0) {
      this.position.y -= 10;
    }
    if (keyIsDown(LEFT_ARROW) && this.position.x > 0) {
      this.position.x -= 10;
    }
    if (keyIsDown(RIGHT_ARROW) && this.position.x < width - this.size.x) {
      this.position.x += 10;
    }
    if (keyIsDown(DOWN_ARROW) && this.position.y < height - this.size.y) {
      this.position.y += 10;
    }
  }

  private shootLaserBeam() {
    if (keyIsDown(32) && this.laserBeamTimer % this.laserBeamDelay === 0) {
      const laserBeam = new LaserBeam(this.position.x + this.size.x / 2 - 2, this.position.y-15);
      this.laserBeams.push(laserBeam);
      this.laserBeamTimer = 0;
    }
    this.laserBeamTimer++;
  }

  public update() {
    this.moveSpaceship();
    this.shootLaserBeam();
    this.timer++;
    if (this.timer % this.delay === 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }
    for (const laserBeam of this.laserBeams) {
      laserBeam.update();
    }
  }

  public draw() {
    image(this.images[this.currentImageIndex], this.position.x, this.position.y, this.size.x, this.size.y);
    for (const laserBeam of this.laserBeams) {
      laserBeam.draw();
    }
  }
}