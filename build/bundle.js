"use strict";
class Background {
    constructor() { }
    update() { }
    draw() { }
}
class Game {
    constructor() {
        this.gameMenu = new GameMenu(100, 300, 400, 300, "#566E93");
        this.gameEngine = new GameEngine();
    }
    update() {
        this.gameMenu.update();
    }
    draw() {
        this.gameMenu.draw();
    }
    startNewGame() { }
    resumeGame() { }
}
class GameEngine {
    constructor() { }
    update() { }
    draw() { }
}
class GameMenu {
    constructor(x, y, width, height, color) {
        this.x = 0;
        this.y = 0;
        this.width = 100;
        this.height = 100;
        this.textSize = 20;
        this.text = "GAME MENU";
        this.textPlay = "PLAY";
        this.textHowToPlay = "HOW TO PLAY";
        this.textColor = "black";
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    update() { }
    draw() {
        background(255, 204, 0);
        fill(this.color);
        rect(this.x, this.y, this.width, this.height, 20);
        noStroke();
        textSize(this.textSize);
        textAlign(CENTER - textWidth(this.text));
        fill(this.textColor);
        textFont("times new roman");
        text(this.text, this.x + 140, this.y + 30);
        textAlign(CENTER - textWidth(this.textPlay));
        text(this.textPlay, this.x + 160, this.y + 60);
        textAlign(CENTER - textWidth(this.textHowToPlay));
        text(this.textHowToPlay, this.x + 130, this.y + 90);
        image(img, 0, 0);
    }
}
class GameOverScreen {
    constructor() { }
    update() { }
    draw() { }
}
class PauseMenu {
    constructor() { }
    update() { }
    draw() { }
}
class ScoreBoard {
    constructor() { }
    update() { }
    draw() { }
}
let game;
let img;
function preload() {
    img = loadImage('assets/testpil.png');
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    game = new Game();
}
function draw() {
    game.update();
    game.draw();
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
class Alien extends Enemy {
    constructor() {
        super();
    }
    update() { }
    draw() { }
}
class Astroid extends Enemy {
    constructor() {
        super();
    }
    update() { }
    draw() { }
}
class Enemy extends GameEntity {
    constructor() {
        super();
    }
    update() { }
    draw() { }
}
class GameEntity {
    constructor() { }
    update() { }
    draw() { }
}
class OxygenDisplay extends GameEntity {
    constructor() {
        super();
    }
    update() { }
    draw() { }
}
class OxygenTank extends GameEntity {
    constructor() {
        super();
    }
    update() { }
    draw() { }
}
class Score extends GameEntity {
    constructor() {
        super();
    }
    update() { }
    draw() { }
}
class SpaceShip extends GameEntity {
    constructor() {
        super();
    }
    update() { }
    draw() { }
}
class SpeedBoost extends GameEntity {
    constructor() {
        super();
    }
    update() { }
    draw() { }
}
//# sourceMappingURL=bundle.js.map