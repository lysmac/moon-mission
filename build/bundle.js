"use strict";
class Game {
    constructor() {
        this.gameEngine = new GameEngine();
    }
    update() {
        this.gameEngine.update();
    }
    draw() {
        this.gameEngine.draw();
    }
}
class GameEngine {
    constructor() {
        this.background = new Background();
    }
    update() {
        this.background.update();
    }
    draw() {
        this.background.draw();
    }
}
class GameMenu {
    constructor() { }
    update() { }
    draw() { }
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
function preload() {
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
class Atmosphere {
    constructor() {
        this.y = 0;
        this.speed = 2;
        this.alphaValue = 255;
        this.isDisplayed = false;
    }
    display() {
        noStroke();
        fill(135, 206, 235, this.alphaValue);
        ellipse(width / 2, this.y + height / 2, width * 2.3, height * 2);
        this.isDisplayed = true;
    }
    move() {
        this.y += this.speed;
        this.alphaValue -= .4;
        if (!this.isDisplayed) {
            this.y += this.speed;
            this.alphaValue -= .5;
        }
    }
}
class Earth {
    constructor() {
        this.y = 0;
        this.speed = 2;
        this.isDisplayed = false;
    }
    display() {
        noStroke();
        fill(34, 139, 34);
        ellipse(width / 2, this.y + height / 1.2, width * 2.3, height * 0.8);
        this.isDisplayed = true;
    }
    move() {
        this.y += this.speed;
        if (!this.isDisplayed) {
            this.y += this.speed;
        }
    }
}
class Star {
    constructor() {
        this.x = random(width);
        this.y = random(-height, 0);
        this.speed = random(1, 5);
    }
    show() {
        stroke(255);
        point(this.x, this.y);
    }
    fall() {
        this.y += this.speed;
        if (this.y > height) {
            this.y = random(-height, 0);
        }
    }
}
class Background {
    constructor() {
        this.stars = [];
        for (let i = 0; i < 1000; i++) {
            this.stars[i] = new Star();
        }
        this.atmosphere = new Atmosphere();
        this.earth = new Earth();
    }
    update() {
        for (let i = 0; i < this.stars.length; i++) {
            this.stars[i].fall();
        }
        this.atmosphere.move();
        this.atmosphere.display();
        this.earth.move();
        this.earth.display();
    }
    draw() {
        background(0);
        for (let i = 0; i < this.stars.length; i++) {
            this.stars[i].show();
        }
        this.atmosphere.move();
        this.atmosphere.display();
        this.earth.move();
        this.earth.display();
    }
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