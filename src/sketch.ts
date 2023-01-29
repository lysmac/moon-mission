

//---- GLOBAL VARIABLES ----//

let game: Game
let asteroid: p5.Image
let asteroidHit: p5.Image
let alien: p5.Image
let alienHit: p5.Image
let raket3: p5.Image
let raket4: p5.Image
let raket5: p5.Image
let oxygenTank: p5.Image;
let interactionKeys: p5.Image
let header: p5.Image
let menumusic: p5.SoundFile
let gameplaymusic: p5.SoundFile
let laserSoundeffect: p5.SoundFile
let enemyDeathSound: p5.SoundFile
// let endmusic: p5.SoundFile
// let gameplaymusic: p5.SoundFile
// let endmusic: p5.SoundFile

/**
 * Built in preload function in P5
 * This is a good place to load assets such as
 * sound files, images etc...
 */
function preload() {
  // sound: p5.SoundFile = loadSound('../assets/mySound.wav');
  // Här a´skall alla filer i form av bilder och ljud laddas in.

  // Music
  menumusic = loadSound("assets/bgm/menu.mp3")
  gameplaymusic = loadSound("assets/bgm/play.mp3")
  laserSoundeffect = loadSound("assets/soundeffects/laserBullet.mp3")
  enemyDeathSound = loadSound("assets/soundeffects/enemyDeathSound.mp3")

  
  alien = loadImage("/assets/Alien.png")
  alienHit = loadImage("/assets/Alien-Hit.png")
  asteroid = loadImage("/assets/Astroid.png")
  asteroidHit = loadImage("/assets/Astroid-Hit.png")
  raket3 = loadImage("assets/Raket3.png")
  raket4 = loadImage("assets/Raket4.png")
  raket5 = loadImage("assets/Raket5.png")
  oxygenTank = loadImage('assets/OxygenTank.png')
  interactionKeys = loadImage ("assets/InteractionKeys.png")
  header = loadImage("assets/HeaderMoonMission.png")
  
}

/**
 * Built in setup function in P5
 * This is a good place to create your first class object
 * and save it as a global variable so it can be used
 * in the draw function below
 */
function setup() {
  createCanvas(600, 800)
  frameRate(60)
  game = new Game()
}

/**
 * Built in draw function in P5
 * This is a good place to call public methods of the object
 * you created in the setup function above
 */
function draw() {
  game.update()
  game.draw()
}

/**
 *  Built in windowResize listener function in P5
 */
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }


