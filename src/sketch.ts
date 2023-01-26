

//---- GLOBAL VARIABLES ----//
let game: Game;

let asteroid: p5.Image;
let alien: p5.Image;

let raket3: p5.Image;
let raket4: p5.Image;
let raket5: p5.Image;

let oxygenTank: p5.Image;


// let sound: p5.SoundFile

/**
 * Built in preload function in P5
 * This is a good place to load assets such as
 * sound files, images etc...
 */
function preload() {
  // sound: p5.SoundFile = loadSound('../assets/mySound.wav');
  // Här a´skall alla filer i form av bilder och ljud laddas in.

  alien = loadImage('/assets/Alien.png');
  asteroid = loadImage('/assets/Astroid.png')
  raket3 = loadImage('assets/Raket3.png');
  raket4 = loadImage('assets/Raket4.png');
  raket5 = loadImage('assets/Raket5.png');
  oxygenTank = loadImage('assets/OxygenTank.png')
}

/**
 * Built in setup function in P5
 * This is a good place to create your first class object
 * and save it as a global variable so it can be used
 * in the draw function below
 */
function setup() {
  createCanvas(600, 800);
  //background(255, 204, 0);
  frameRate(60);
  game = new Game();
}

/**
 * Built in draw function in P5
 * This is a good place to call public methods of the object
 * you created in the setup function above
 */
function draw() {
  game.update();
  game.draw();
}

/**
 *  Built in windowResize listener function in P5
 */
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
