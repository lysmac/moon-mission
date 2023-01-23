//---- GLOBAL VARIABLES ----//
let game: Game;
let img: p5.Image;
let asteroid: p5.Image;
// let sound: p5.SoundFile

/**
 * Built in preload function in P5
 * This is a good place to load assets such as
 * sound files, images etc...
 */
function preload() {
  // sound: p5.SoundFile = loadSound('../assets/mySound.wav');
  // Här a´skall alla filer i form av bilder och ljud laddas in.
  img = loadImage("assets/testpil.png");
  asteroid = loadImage('/assets/Astroid.png')
}

/**
 * Built in setup function in P5
 * This is a good place to create your first class object
 * and save it as a global variable so it can be used
 * in the draw function below
 */
function setup() {
  createCanvas(600, 800);
  background(255, 204, 0);
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
