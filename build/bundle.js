"use strict";
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
    }
    update() {
        for (let i = 0; i < this.stars.length; i++) {
            this.stars[i].fall();
        }
    }
    draw() {
        background(0);
        for (let i = 0; i < this.stars.length; i++) {
            this.stars[i].show();
        }
    }
}
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