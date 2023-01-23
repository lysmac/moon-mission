class Background {
  private stars: Star[];
  private atmosphere: Atmosphere;
  private earth: Earth;
  private onlyStars: boolean;

  constructor(onlyStars: boolean = false) {
    this.onlyStars = onlyStars;
    this.stars = [];
    for (let i = 0; i < 300; i++) {
      this.stars[i] = new Star();
    }

    this.atmosphere = new Atmosphere();
    this.earth = new Earth();
  }

  public update() {
    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i].fall();
    }

    this.atmosphere.update();
    this.earth.update();
  }

  public draw() {
    background(0);
    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i].show();
    }
    
    if (!this.onlyStars) {
      this.atmosphere.draw();
      this.earth.draw();
    }
  }
}
