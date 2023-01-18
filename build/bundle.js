"use strict";
class Background {
    constructor() { }
    update() { }
    draw() { }
}
class Game {
    constructor() {
        this.gameMenu = new GameMenu(50, 50, 600, 600, 'red');
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
        this.color = 'red';
        this.width = 100;
        this.height = 100;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    update() {
        this.x = 1;
        this.y = 0;
    }
    draw() {
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);
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