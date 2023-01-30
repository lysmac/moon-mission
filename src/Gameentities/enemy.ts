/// <reference path="gameentity.ts" />

class Enemy extends GameEntity {
  protected isAlive: boolean;
  public hp: number;

  constructor(position: p5.Vector, size: p5.Vector, image: p5.Image, hp: number) {
    super(position, size, image, hp)
    
    this.isAlive = true;
    this.hp = hp;
  }


  // public draw() {
  //   super.draw();
  //   // rita ut mer saker....
  // }
}
