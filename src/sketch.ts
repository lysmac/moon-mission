//---- GLOBAL VARIABLES ----//

let game: Game;
let asteroid: p5.Image;
let asteroidHit: p5.Image;
let alien: p5.Image;
let alienHit: p5.Image;
let raket3: p5.Image;
let raket4: p5.Image;
let raket5: p5.Image;
let oxygenTank: p5.Image;
let interactionKeys: p5.Image;
let header: p5.Image;
let menumusic: p5.SoundFile;
let gameplaymusic: p5.SoundFile;
let laserSoundeffect: p5.SoundFile;
let enemyDeathSound: p5.SoundFile;
let shipCrashSound: p5.SoundFile;
let speedboost: p5.Image;
let sbraket1: p5.Image;
let sbraket2: p5.Image;
let sbraket3: p5.Image;
let deadraket1: p5.Image;
let deadraket2: p5.Image;
let deadraket3: p5.Image;

// Sound and images files
function preload() {
  // Music
  menumusic = loadSound("assets/bgm/menu.mp3");
  gameplaymusic = loadSound("assets/bgm/play.mp3");
  laserSoundeffect = loadSound("assets/soundeffects/laserBullet.mp3");
  enemyDeathSound = loadSound("assets/soundeffects/enemyDeathSound.mp3");
  shipCrashSound = loadSound("assets/soundeffects/shipCrash.mp3");
  // Images
  alien = loadImage("assets/Alien.png");
  alienHit = loadImage("assets/Alien-Hit.png");
  asteroid = loadImage("assets/Astroid.png");
  asteroidHit = loadImage("assets/Astroid-Hit.png");
  raket3 = loadImage("assets/Raket3.png");
  raket4 = loadImage("assets/Raket4.png");
  raket5 = loadImage("assets/Raket5.png");
  oxygenTank = loadImage("assets/OxygenTank.png");
  interactionKeys = loadImage("assets/InteractionKeys.png");
  header = loadImage("assets/HeaderMoonMission.png");
  sbraket1 = loadImage("assets/sbraket1.png");
  sbraket2 = loadImage("assets/sbraket2.png");
  sbraket3 = loadImage("assets/sbraket3.png");
  deadraket1 = loadImage("assets/deadraket1.png");
  deadraket2 = loadImage("assets/deadraket2.png");
  deadraket3 = loadImage("assets/deadraket3.png");
  speedboost = loadImage("assets/speedboost.png");
}

/**
 * Built in setup function in P5
 * This is a good place to create your first class object
 * and save it as a global variable so it can be used
 * in the draw function below
 */
function setup() {
  createCanvas(600, 800);
  frameRate(60);
  game = new Game();
  outputVolume(0);
  shipCrashSound.setVolume(0.5);
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
