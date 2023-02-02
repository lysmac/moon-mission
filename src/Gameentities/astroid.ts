class Astroid extends GameEntity {

  constructor(position: p5.Vector) {
    const size = createVector(125, 125);
    const hp = 2;
    super(position, size, asteroid, hp); 
  }

  public getHitBox() {
    return {
      x: this.position.x + 10,
      y: this.position.y + 10,
      width: this.size.x - 20,
      height: this.size.y - 20,
    }
  }
}