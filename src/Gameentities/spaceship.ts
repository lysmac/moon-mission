class SpaceShip extends GameEntity {
  private images: p5.Image[];
  private deadImages: p5.Image[];
  private currentImageIndex: number;
  private timer: number;
  private delay: number;
  private laserBeams: LaserBeam[];
  private laserBeamDelay: number;
  private laserBeamTimer: number;
  private dead: boolean;
  

  constructor(position: p5.Vector) {
    const size = createVector(50, 200);
    super(position, size, raket3);
    this.images = [raket3, raket4, raket5];
    this.deadImages = [deadraket1, deadraket2, deadraket3];
    this.currentImageIndex = 0;
    this.timer = 0;
    this.delay = 20;
    this.laserBeams = [];
    this.laserBeamDelay = 20;
    this.laserBeamTimer = 0;
    this.dead = false;
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

  public handleCollision() {
    if (!this.dead) {
      this.dead = true;
      for (let i = 0; i < this.deadImages.length; i++) {
        this.currentImageIndex = i;
        // delay the loop to show each image for a certain amount of time
      }
    }
  }

  public update() {
    if(this.dead){
        this.timer++;
        if (this.timer % this.deadDelay === 0) {
          this.currentImageIndex = (this.currentImageIndex + 1) % this.deadImages.length;
        }
        if(this.currentImageIndex === this.deadImages.length-1){
          this.dead = true;
        }
    }
    else{
        this.moveSpaceship();
        this.shootLaserBeam();
        this.timer++;
        if (this.timer % this.delay === 0) {
          this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        }
    }
    for (const laserBeam of this.laserBeams) {
      laserBeam.update();
    }
  }

  public draw() {
    if(this.dead){
        image(this.deadImages[this.currentImageIndex], this.position.x, this.position.y, this.size.x, this.size.y);
    }
    else{
        image(this.images[this.currentImageIndex], this.position.x, this.position.y, this.size.x, this.size.y);
    }
    for (const laserBeam of this.laserBeams) {
      laserBeam.draw();
    }
  }
}
