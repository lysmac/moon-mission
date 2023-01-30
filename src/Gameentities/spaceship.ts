class SpaceShip extends GameEntity {
  private images: p5.Image[];
  private deadImages: p5.Image[];
  private currentImageIndex: number;
  private currentDeadImageIndex: number;
  private timer: number;
  private delay: number;
  private laserBeamDelay: number;
  private laserBeamTimer: number;
  private laserSoundeffect: p5.SoundFile;
  public laserBeams: LaserBeam[];
  private dead: boolean;

  constructor() {
    const size = createVector(50, 200);
    const position = createVector(width / 2 - 25, height - 210);
    super(position, size, raket3);
    this.images = [raket3, raket4, raket5];
    this.deadImages = [deadraket1, deadraket2, deadraket3];
    this.currentImageIndex = 0;
    this.currentDeadImageIndex = 0;
    this.timer = 0;
    this.delay = 20;
    this.laserBeams = [];
    this.laserBeamDelay = 20;
    this.laserBeamTimer = 0;
    this.laserSoundeffect = laserSoundeffect
    this.dead = false;
  }

  private moveSpaceship() {
    if (keyIsDown(UP_ARROW) && this.position.y > 0) {
      this.position.y -= 10;
    }
    if (keyIsDown(LEFT_ARROW) && this.position.x > 0 - this.size.x / 2) {
      this.position.x -= 10;
    }
    if (keyIsDown(RIGHT_ARROW) && this.position.x < width - this.size.x / 2) {
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
      this.laserSoundeffect.play();
      this.laserBeamTimer = 0;
    }
    this.laserBeamTimer++;
  }

  public handleCollision(game: any) {
    if (!this.dead) {
      let i = 0;
      const loop = setInterval(() => {
        this.currentDeadImageIndex = i;
        i++;
        if (i === this.deadImages.length) {
          clearInterval(loop);
          setTimeout(() => {
            game.changeCurrentScene("end");
          }, 2000);
        }
      }, 200);
      this.dead = true;
    }
  }

  /*
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
  */

  public update() {
    this.moveSpaceship();
    this.shootLaserBeam();
    
    if (this.dead) {
    this.timer++;
    if (this.timer % this.delay === 0) {
    this.currentDeadImageIndex = (this.currentDeadImageIndex + 1) % this.deadImages.length;
    }
    } else {
    this.timer++;
    if (this.timer % this.delay === 0) {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }
    }
    
    for (const laserBeam of this.laserBeams) {
    laserBeam.update();
    }
    }

/*
  public draw() { 
    image(this.images[this.currentImageIndex], this.position.x, this.position.y, this.size.x, this.size.y);
    for (const laserBeam of this.laserBeams) {
      laserBeam.draw();
    }
  }
  */
  public draw() { 
    if (this.dead) {
        image(this.deadImages[this.currentDeadImageIndex], this.position.x, this.position.y, this.size.x, this.size.y);
    } else {
        image(this.images[this.currentImageIndex], this.position.x, this.position.y, this.size.x, this.size.y);
    }
    for (const laserBeam of this.laserBeams) {
      laserBeam.draw();
    }
}

}
