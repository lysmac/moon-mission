class OxygenTank extends GameEntity {
  constructor(position: p5.Vector) {

    const size = createVector(20, 55);
    super(position, size, oxygenTank,0); 
  }
}
