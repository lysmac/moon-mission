"use strict";
class AmmunitionDisplay {
    constructor() {
        this.position = createVector(60, height - 50);
        this.size = createVector(100, 10);
        this.color = "white";
        this.maxAmmo = 15;
        this.currentAmmo = 15;
        this.cooldownBar = 1;
        this.timer = 0;
        this.delay = 3;
    }
    update() {
        if (this.currentAmmo < 6) {
            this.color = "red";
        }
        else {
            this.color = "white";
        }
        if (this.timer % this.delay === 0) {
            this.cooldownBar += 1;
            this.timer = 0;
        }
        this.timer++;
    }
    draw() {
        push();
        textSize(20);
        fill(this.color);
        text(`${this.currentAmmo} / ${this.maxAmmo}`, this.position.x, this.position.y);
        pop();
        if (this.currentAmmo == 0) {
            push();
            fill(255);
            rect(this.position.x - 50, this.position.y + 15, this.size.x, this.size.y);
            fill(140);
            rect(this.position.x - 50, this.position.y + 15, this.cooldownBar, this.size.y);
            pop();
        }
    }
}
class Game {
    constructor() {
        this.allPlayerScores = [];
        this.gameMenu = new GameMenu(this);
        this.pauseMenu = new PauseMenu(this);
        this.gameOver = new GameOver(this);
        this.scoreboard = new ScoreBoard(this);
        this.gameEngine = new GameEngine();
        this.menuMusic = menumusic;
        this.gamePlayMusic = gameplaymusic;
        this.currentScene = "start";
        this.currentPlayerScore = 0;
        this.wasEscapeKeyDown = false;
        this.wasMKeyDown = false;
        this.wasHKeyDown = false;
        this.addedScoreToList = false;
        this.mute = true;
    }
    update() {
        this.getScoresFromLS();
        this.muteSounds();
        this.togglePause();
        this.toggleHighScore();
        switch (this.currentScene) {
            case "start":
                this.gameMenu.update();
                break;
            case "score":
                this.scoreboard.update();
                break;
            case "play":
                this.gameEngine.update();
                break;
            case "pause":
                this.pauseMenu.update();
                break;
            case "end":
                this.gameOver.update();
                break;
        }
    }
    draw() {
        switch (this.currentScene) {
            case "start":
                this.gameMenu.draw();
                break;
            case "score":
                this.scoreboard.draw();
                break;
            case "play":
                this.gameEngine.draw();
                break;
            case "pause":
                this.gameEngine.draw();
                this.pauseMenu.draw();
                break;
            case "end":
                this.gameEngine.draw();
                this.gameOver.draw();
                break;
        }
    }
    startNewGame() {
        this.gamePlayMusic.stop();
        this.scoreCheckSet(false);
        this.changeCurrentScene("play");
        this.gameEngine = new GameEngine();
    }
    muteSounds() {
        const mWasPressed = !this.wasMKeyDown && keyIsDown(77);
        if (mWasPressed && this.mute === true) {
            this.mute = false;
            outputVolume(0.2);
            if (this.currentScene === "start" || this.currentScene === "score") {
                if (!this.menuMusic.isPlaying()) {
                    this.menuMusic.play();
                }
            }
        }
        else if (mWasPressed && this.mute === false) {
            this.mute = true;
            outputVolume(0);
        }
        this.wasMKeyDown = keyIsDown(77);
    }
    readAllPlayerScores() {
        return this.allPlayerScores;
    }
    pushToAllPlayerScores(playerScore) {
        this.allPlayerScores.push(playerScore);
    }
    changeCurrentScene(scene) {
        this.currentScene = scene;
        if (scene === "start" || scene === "score") {
            if (!this.menuMusic.isPlaying()) {
                this.menuMusic.play();
            }
        }
        if (scene === "play") {
            this.menuMusic.stop();
            this.gamePlayMusic.play();
        }
        if (scene === "end") {
            this.gamePlayMusic.stop();
        }
    }
    readCurrentPlayerScore() {
        return this.currentPlayerScore;
    }
    changeCurrentPlayerScore(input) {
        this.currentPlayerScore = input;
    }
    togglePause() {
        const espaceWasPressed = !this.wasEscapeKeyDown && keyIsDown(ESCAPE);
        if (espaceWasPressed && this.currentScene === "play") {
            this.currentScene = "pause";
            this.gamePlayMusic.pause();
            this.gameEngine.oxygenDisplay.pause();
        }
        else if (espaceWasPressed && this.currentScene === "pause") {
            this.currentScene = "play";
            this.gamePlayMusic.play();
            this.gameEngine.oxygenDisplay.resume();
        }
        else if (espaceWasPressed && this.currentScene === "end") {
            this.changeCurrentScene("start");
        }
        this.wasEscapeKeyDown = keyIsDown(ESCAPE);
    }
    toggleHighScore() {
        const hWasPressed = !this.wasHKeyDown && keyIsDown(72);
        if (hWasPressed && this.currentScene === "start") {
            this.currentScene = "score";
        }
        else if (hWasPressed && this.currentScene === "score") {
            this.currentScene = "start";
        }
        this.wasHKeyDown = keyIsDown(72);
    }
    scoreCheckSet(anything) {
        this.addedScoreToList = anything;
    }
    scoreCheckGet() {
        return this.addedScoreToList;
    }
    getScoresFromLS() {
        const scores = localStorage.getItem("playerScores");
        const scoresParsed = JSON.parse(scores);
        if (scoresParsed === null) {
            return;
        }
        else {
            this.allPlayerScores = scoresParsed;
            return;
        }
    }
}
class GameEntity {
    constructor(position, size, image, hp) {
        this.position = position;
        this.size = size;
        this.image = image;
        this.hp = hp;
        this.defaultSpeed = createVector(0, random(2, 10));
        this.currentSpeed = this.defaultSpeed;
        this.boostedSpeed = createVector(0, 30);
    }
    update() {
        this.position.add(this.currentSpeed);
    }
    draw() {
        image(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
    }
    drawHitBox() {
        const { x, y, width, height } = this.getHitBox();
        push();
        stroke('red');
        noFill();
        rect(x, y, width, height);
        pop();
    }
    getHitBox() {
        return {
            x: this.position.x,
            y: this.position.y,
            width: this.size.x,
            height: this.size.y,
        };
    }
    boostCurrentSpeed(endTime) {
        this.currentSpeed = this.boostedSpeed;
        const remainingTime = endTime - Date.now();
        setTimeout(() => {
            this.currentSpeed = this.defaultSpeed;
        }, remainingTime);
    }
}
class GameEngine {
    constructor() {
        this.clonedGameEntitiy = [];
        this.game = game;
        this.background = new Background();
        this.oxygenDisplay = new OxygenDisplay();
        this.spaceship = new SpaceShip();
        this.ammunitionDisplay = new AmmunitionDisplay();
        this.gameEntities = [];
        this.asteroidSpawnTimout = 1000;
        this.alienSpawnTimout = 5000;
        this.oxygenSpawnTimout = 10000;
        this.speedBoostSpawnTimout = 20000;
        this.dead = false;
        this.score = 0;
        this.isScoreBlinking = false;
        this.enemyDeathSound = enemyDeathSound;
        this.shipCrashSound = shipCrashSound;
        this.isSpeedBoostActive = false;
        this.speedBoostEndTime = 0;
    }
    update() {
        if (this.spaceship.dead) {
            this.dead = true;
            this.game.changeCurrentScene("end");
            this.oxygenDisplay.pause();
            game.changeCurrentPlayerScore(this.score);
        }
        if (this.oxygenDisplay.oxygenLevel <= 0) {
            game.changeCurrentPlayerScore(this.score);
            this.dead = true;
            this.game.changeCurrentScene("end");
        }
        this.background.update();
        this.spaceship.update();
        this.ammunitionDisplay.update();
        this.incrementScore();
        this.checkLaserFired();
        setTimeout(() => {
            this.spawnAsteroid();
            if (this.score > 1500) {
                this.spawnAlien();
            }
            this.spawnOxygenTank();
            this.spawnSpeedboost();
        }, 5000);
        this.clonedGameEntitiy = [...this.gameEntities];
        for (let i = 0; i < this.gameEntities.length; i++) {
            this.checkCollision(this.gameEntities[i], i);
            this.checkHitEnemy(this.gameEntities[i], i);
            this.moveEntities(this.gameEntities[i]);
        }
        this.gameEntities = this.clonedGameEntitiy;
    }
    draw() {
        this.background.draw();
        this.rechargeAmmo();
        for (const gameEntity of this.gameEntities) {
            gameEntity.draw();
        }
        this.displayScore();
        this.oxygenDisplay.draw();
        this.ammunitionDisplay.draw();
        this.spaceship.draw();
    }
    moveEntities(entity) {
        entity.update();
    }
    displayScore() {
        textFont("secular one");
        textSize(24);
        if (this.isScoreBlinking) {
            fill(255, 255, 0);
        }
        else {
            fill(255);
        }
        text("Score:", 60, 40);
        text(this.score, 60, 70);
    }
    incrementScore() {
        if (this.dead) {
            return;
        }
        this.score += 1;
        if (this.score % 500 === 0 && !this.isScoreBlinking) {
            this.isScoreBlinking = true;
            setTimeout(() => {
                this.isScoreBlinking = false;
            }, 500);
        }
    }
    checkCollision(entity, index) {
        if (this.spaceship.getHitBox().x < entity.getHitBox().x + entity.getHitBox().width &&
            this.spaceship.getHitBox().x + this.spaceship.getHitBox().width > entity.getHitBox().x &&
            this.spaceship.getHitBox().y < entity.getHitBox().y + entity.getHitBox().height &&
            this.spaceship.getHitBox().height + this.spaceship.getHitBox().y > entity.getHitBox().y) {
            if (!(entity instanceof OxygenTank) && !(entity instanceof SpeedBoost)) {
                this.collidingWithEnemy(entity, index);
            }
            if (entity instanceof OxygenTank) {
                this.collidingWithOxygenTank(index);
            }
            if (entity instanceof SpeedBoost) {
                this.collidingWithSpeedBoost(index);
            }
        }
    }
    collidingWithEnemy(entity, index) {
        if (this.isSpeedBoostActive) {
            this.clonedGameEntitiy.splice(index, 1);
            this.gainScoreFromKills(entity);
            this.enemyDeathSound.play();
        }
        else {
            this.spaceship.explode();
            if (entity instanceof Alien) {
                entity.velocity = createVector(0, 0);
            }
            entity.currentSpeed = createVector(0, 0);
            if (!this.shipCrashSound.isPlaying()) {
                this.shipCrashSound.play();
            }
        }
    }
    collidingWithOxygenTank(index) {
        this.clonedGameEntitiy.splice(index, 1);
        if (this.oxygenDisplay.oxygenLevel > 90) {
            this.oxygenDisplay.oxygenLevel +=
                this.oxygenDisplay.maxOxygenLevel - this.oxygenDisplay.oxygenLevel;
        }
        else {
            this.oxygenDisplay.oxygenLevel += 10;
        }
    }
    collidingWithSpeedBoost(index) {
        this.clonedGameEntitiy.splice(index, 1);
        this.spaceship.immortal = true;
        this.isSpeedBoostActive = true;
        this.spaceship.boostedSpaceship();
        this.speedBoostEndTime = Date.now() + 5000;
        for (let i = 0; i < this.clonedGameEntitiy.length; i++) {
            this.clonedGameEntitiy[i].boostCurrentSpeed(this.speedBoostEndTime);
        }
        setTimeout(() => {
            this.spaceship.immortal = false;
            this.isSpeedBoostActive = false;
            this.spaceship.regularSpaceship();
        }, 5000);
    }
    checkLaserFired() {
        if (this.spaceship.hasLaserFired) {
            this.ammunitionDisplay.currentAmmo -= 1;
            this.spaceship.hasLaserFired = false;
            if (this.ammunitionDisplay.currentAmmo == 0) {
                this.spaceship.haveAmmo = false;
                this.ammunitionDisplay.cooldownBar = 1;
            }
        }
    }
    rechargeAmmo() {
        if (this.ammunitionDisplay.currentAmmo == 0 &&
            this.ammunitionDisplay.cooldownBar == 100) {
            this.ammunitionDisplay.currentAmmo = 15;
            this.spaceship.haveAmmo = true;
        }
    }
    checkHitEnemy(entity, index) {
        if (!this.spaceship.laserBeams)
            return;
        if (entity instanceof OxygenTank)
            return;
        if (entity instanceof SpeedBoost)
            return;
        for (let i = 0; i < this.spaceship.laserBeams.length; i++) {
            const laserBullet = this.spaceship.laserBeams[i];
            if (laserBullet.position.x < entity.getHitBox().x + entity.getHitBox().width &&
                laserBullet.position.x + laserBullet.size.x > entity.getHitBox().x &&
                laserBullet.position.y < entity.getHitBox().y + entity.getHitBox().height &&
                laserBullet.size.y + laserBullet.position.y > entity.getHitBox().y) {
                if (entity.hp > 1) {
                    entity.hp -= 1;
                    this.spaceship.laserBeams.splice(i, 1);
                    if (entity instanceof Astroid) {
                        entity.image = asteroidHit;
                        setTimeout(() => {
                            entity.image = asteroid;
                        }, 150);
                    }
                    if (entity instanceof Alien) {
                        entity.image = alienHit;
                        setTimeout(() => {
                            entity.image = alien;
                        }, 150);
                    }
                }
                else {
                    this.clonedGameEntitiy.splice(index, 1);
                    this.enemyDeathSound.play();
                    this.spaceship.laserBeams.splice(i, 1);
                    const lootRNG = Math.floor(random(1, 100));
                    const lootDropPosition = createVector(entity.position.x + entity.size.x / 2, entity.position.y + entity.size.y / 2);
                    if (lootRNG < 10) {
                        this.clonedGameEntitiy.push(new OxygenTank(lootDropPosition));
                    }
                    this.gainScoreFromKills(entity);
                }
            }
        }
    }
    gainScoreFromKills(entity) {
        if (entity instanceof Astroid) {
            this.score += 10;
            const scoreVisual = "+10";
            const scorePosition = createVector(entity.position.x + entity.size.x / 2, entity.position.y + entity.size.y / 2);
            const scoreEntity = new KillScore(scorePosition, scoreVisual);
            this.clonedGameEntitiy.push(scoreEntity);
        }
        if (entity instanceof Alien) {
            this.score += 50;
            const scoreVisual = "+50";
            const scorePosition = createVector(entity.position.x + entity.size.x / 2, entity.position.y + entity.size.y / 2);
            const scoreEntity = new KillScore(scorePosition, scoreVisual);
            this.clonedGameEntitiy.push(scoreEntity);
        }
    }
    spawnAsteroid() {
        this.asteroidSpawnTimout -= deltaTime;
        if (this.asteroidSpawnTimout < 0) {
            const x = random(0, width);
            const y = random(-125, -130);
            const position = createVector(x, y);
            const asteroid = new Astroid(position);
            this.gameEntities.push(asteroid);
            if (this.isSpeedBoostActive) {
                asteroid.boostCurrentSpeed(this.speedBoostEndTime);
            }
            this.asteroidSpawnTimout = random(1000, 2000);
        }
    }
    spawnAlien() {
        this.alienSpawnTimout -= deltaTime;
        if (this.alienSpawnTimout < 0) {
            const x = random(0, width);
            const y = random(-125, -130);
            const position = createVector(x, y);
            const alien = new Alien(position);
            this.gameEntities.push(alien);
            if (this.isSpeedBoostActive) {
                alien.boostCurrentSpeed(this.speedBoostEndTime);
            }
            this.alienSpawnTimout = random(1000, 5000);
        }
    }
    spawnOxygenTank() {
        this.oxygenSpawnTimout -= deltaTime;
        if (this.oxygenSpawnTimout < 0) {
            const x = random(0, width);
            const y = random(-125, -130);
            const position = createVector(x, y);
            const oxygenTank = new OxygenTank(position);
            this.gameEntities.push(oxygenTank);
            if (this.isSpeedBoostActive) {
                oxygenTank.boostCurrentSpeed(this.speedBoostEndTime);
            }
            this.oxygenSpawnTimout = random(1000, 20000);
        }
    }
    spawnSpeedboost() {
        this.speedBoostSpawnTimout -= deltaTime;
        if (this.speedBoostSpawnTimout < 0) {
            const x = random(0, width);
            const y = random(-125, -130);
            const position = createVector(x, y);
            const speedboost = new SpeedBoost(position);
            this.gameEntities.push(speedboost);
            if (this.isSpeedBoostActive) {
                speedboost.boostCurrentSpeed(this.speedBoostEndTime);
            }
            this.speedBoostSpawnTimout = random(1000, 20000);
        }
    }
}
class GameMenu {
    constructor(game) {
        this.game = game;
        this.position = createVector(100, 300);
        this.size = createVector(400, 370);
        this.background = new Background(true);
    }
    update() {
        if (keyIsDown(BACKSPACE)) {
            this.game.startNewGame();
        }
        this.background.update();
    }
    draw() {
        this.background.draw();
        fill("rgba(255, 0, 0, 0.4)");
        stroke("#D9D9D9");
        rect(this.position.x, this.position.y, this.size.x, this.size.y, 20);
        noStroke();
        fill("#FDCA51");
        textSize(70);
        textAlign(CENTER);
        image(header, 0, 0);
        textFont("secular one");
        fill("#D9D9D9");
        textSize(19);
        text("PRESS", this.position.x + 50, this.position.y + 70);
        fill("#FDCA51");
        text("BACKSPACE", this.position.x + textWidth("PRESS ") + 78, this.position.y + 70);
        fill("#D9D9D9");
        text(" TO START NEW GAME", this.position.x + textWidth("PRESS BACKSPACE") + 126, this.position.y + 70);
        fill("#D9D9D9");
        textSize(21);
        text("HOW TO PLAY", this.position.x + 200, this.position.y + 150);
        image(interactionKeys, 180, 470, 300, 70);
        fill("#D9D9D9");
        textSize(15);
        text("PAUSE", this.position.x + 100, this.position.y + 260);
        text("SHOOT", this.position.x + 200, this.position.y + 260);
        text("MOVE", this.position.x + 330, this.position.y + 260);
        textSize(13);
        text("PRESS ", this.position.x + 140, this.position.y + 320);
        fill("#FDCA51");
        text("M", this.position.x + 166, this.position.y + 320);
        fill("#D9D9D9");
        text("TO TOGGLE MUSIC", this.position.x + 230, this.position.y + 320);
        text("PRESS ", this.position.x + 134, this.position.y + 340);
        fill("#FDCA51");
        text("H", this.position.x + 159, this.position.y + 340);
        fill("#D9D9D9");
        text("TO VIEW HIGH SCORE", this.position.x + 231, this.position.y + 340);
        angleMode(DEGREES);
        rotate(25);
        image(raket3, 310, 350, 65, 250, 0, 0, raket3.width, raket3.height);
    }
}
class GameOver {
    constructor(game) {
        this.position = createVector(100, 300);
        this.size = createVector(400, 200);
        this.game = game;
    }
    update() {
        if (!this.game.scoreCheckGet()) {
            let score = this.game.readCurrentPlayerScore();
            this.game.pushToAllPlayerScores(score);
            const allScores = this.game.readAllPlayerScores();
            localStorage.setItem("playerScores", JSON.stringify(allScores));
            this.game.scoreCheckSet(true);
        }
        if (keyIsDown(BACKSPACE)) {
            this.game.startNewGame();
        }
    }
    draw() {
        fill("rgba(255, 0, 0, 0.3)");
        stroke("#D9D9D9");
        rect(this.position.x, this.position.y, 400, 200, 20);
        noStroke();
        textFont("sofia sans");
        fill(frameCount % 60 < 30 ? "#D9D9D900" : "#c90a0a");
        textSize(70);
        textAlign(CENTER);
        text("GAME OVER", this.position.x + this.size.x / 2, this.position.y - 60);
        let score = this.game.readCurrentPlayerScore();
        let highscore = this.getHighestScore();
        if (score >= highscore) {
            textSize(55);
            textAlign(CENTER);
            fill("#FDCA51");
            text("HIGH SCORE!", this.position.x + this.size.x / 2, this.position.y - 10);
            fill("#D9D9D9");
            textSize(26);
            textAlign(CENTER);
            text(`YOU SET A NEW HIGH SCORE! `, this.position.x + this.size.x / 2, this.position.y + 60);
            textSize(40);
            fill("#FDCA51");
            text(score, this.position.x + this.size.x / 2, this.position.y + 100);
        }
        else {
            fill("#D9D9D9");
            textSize(26);
            textAlign(CENTER);
            text(`YOUR SCORE: ${score}`, this.position.x + this.size.x / 2, this.position.y + 60);
            text(`CURRENT HIGH SCORE: ${highscore}`, this.position.x + this.size.x / 2, this.position.y + 90);
        }
        fill("#D9D9D9");
        textSize(20);
        text("PRESS", this.position.x + 47, this.position.y + 140);
        fill("#FDCA51");
        text("BACKSPACE", this.position.x + textWidth("PRESS ") + 75, this.position.y + 140);
        fill("#D9D9D9");
        text(" TO START NEW GAME", this.position.x + textWidth("PRESS BACKSPACE") + 120, this.position.y + 140);
        fill("#D9D9D9");
        textSize(20);
        text("PRESS", this.position.x + 82, this.position.y + 173);
        fill("#FDCA51");
        text("ESC", this.position.x + textWidth("PRESS ") + 73, this.position.y + 173);
        fill("#D9D9D9");
        text("TO RETURN TO MENU", this.position.x + textWidth("PRESS ESC") + 152, this.position.y + 173);
    }
    getHighestScore() {
        let highscores = this.game.readAllPlayerScores();
        let highestNumber = Math.max(...highscores);
        return highestNumber;
    }
}
class OxygenDisplay {
    constructor() {
        this.position = createVector(50, 100);
        this.size = createVector(20, 600);
        this.oxygenLevel = 100;
        this.maxOxygenLevel = 100;
        this.color = '#7DE96C';
        this.isPaused = false;
        this.intervalId = setInterval(() => {
            if (this.isPaused) {
                return;
            }
            this.update();
        }, 1000);
    }
    update() {
        this.oxygenLevel -= 2;
        if (this.oxygenLevel < this.maxOxygenLevel / 2) {
            this.color = 'yellow';
        }
        if (this.oxygenLevel < this.maxOxygenLevel / 4) {
            this.color = 'red';
        }
        if (this.oxygenLevel <= 0) {
            clearInterval(this.intervalId);
        }
    }
    draw() {
        stroke(255);
        fill(this.color);
        let barHeight = this.size.y * (this.oxygenLevel / this.maxOxygenLevel);
        rect(this.position.x, this.position.y + (this.size.y - barHeight), this.size.x, barHeight, 20);
        textSize(15);
        noStroke();
        text(`Oxygen: ${this.oxygenLevel}`, this.position.x, this.position.y - 10);
        this.flashScreen();
    }
    pause() {
        this.isPaused = true;
    }
    resume() {
        this.isPaused = false;
    }
    flashScreen() {
        if (this.color === 'red') {
            let opacity = 50 + 50 * sin(frameCount * 5);
            let startColor = color(255, 0, 0, opacity);
            let endColor = color(255, 0, 0, 0);
            let rectHeight = 80 / 10;
            for (let i = 0; i < 10; i++) {
                let color = lerpColor(startColor, endColor, i / 10);
                noStroke();
                fill(color);
                rect(0, i * rectHeight, width, rectHeight);
                rect(0, height - (i + 1) * rectHeight, width, rectHeight);
            }
        }
    }
}
class PauseMenu {
    constructor(game) {
        this.position = createVector(100, 300);
        this.size = createVector(400, 200);
        this.game = game;
    }
    update() {
        if (keyIsDown(BACKSPACE)) {
            this.game.startNewGame();
        }
    }
    draw() {
        fill("rgba(255, 0, 0, 0.4)");
        stroke("#D9D9D9");
        rect(this.position.x, this.position.y, this.size.x, this.size.y, 20);
        noStroke();
        fill("#FDCA51");
        textSize(30);
        textAlign(CENTER);
        textFont("sofia sans");
        text("PAUSED", this.position.x + this.size.x / 2, this.position.y + 40);
        fill("#D9D9D9");
        tint(255, 100);
        image(header, 100, 100, 400, 200);
        tint(255, 255);
        textFont("secular one");
        textSize(21);
        text("PRESS", this.position.x + 123, this.position.y + 100);
        fill("#FDCA51");
        text("ESC", this.position.x + textWidth("PRESS ") + 113, this.position.y + 100);
        fill("#D9D9D9");
        text("TO RESUME", this.position.x + textWidth("PRESS SPACE") + 132, this.position.y + 100);
        textSize(18);
        text("PRESS", this.position.x + 62, this.position.y + 160);
        fill("#FDCA51");
        text("BACKSPACE", this.position.x + textWidth("PRESS ") + 85, this.position.y + 160);
        fill("#D9D9D9");
        text(" TO START NEW GAME", this.position.x + textWidth("PRESS SPACE") + 172, this.position.y + 160);
    }
}
class ScoreBoard {
    constructor(game) {
        this.game = game;
        this.position = createVector(100, 300);
        this.size = createVector(400, 300);
        this.background = new Background(true);
    }
    update() {
        this.background.update();
    }
    draw() {
        this.background.draw();
        fill("rgba(255, 0, 0, 0.4)");
        stroke("#D9D9D9");
        rect(this.position.x, this.position.y, this.size.x, this.size.y, 20);
        noStroke();
        image(header, 0, 0);
        fill("#FDCA51");
        textSize(40);
        textAlign(CENTER);
        text("SCOREBOARD", this.position.x + this.size.x / 2, this.position.y - 10);
        let highscores = this.getTopFiveScores();
        fill("#D9D9D9");
        textSize(30);
        if (highscores.length === 0) {
            text("NO SCORES YET", this.position.x + 200, this.position.y + 80);
        }
        for (let i = 0; i < highscores.length; i++) {
            text(i + 1 + ". " + highscores[i], this.position.x + 200, this.position.y + 55 + i * 40);
        }
        textSize(25);
        text("PRESS", this.position.x + 65, this.position.y + 270);
        fill("#FDCA51");
        text("H", this.position.x + 117, this.position.y + 270);
        fill("#D9D9D9");
        text("TO RETURN TO MENU", this.position.x + 255, this.position.y + 270);
    }
    getTopFiveScores() {
        let highscores = this.game.readAllPlayerScores();
        highscores.sort((a, b) => b - a);
        return highscores.length >= 5 ? highscores.slice(0, 5) : highscores;
    }
}
let game;
let asteroid;
let asteroidHit;
let alien;
let alienHit;
let raket3;
let raket4;
let raket5;
let oxygenTank;
let interactionKeys;
let header;
let menumusic;
let gameplaymusic;
let laserSoundeffect;
let enemyDeathSound;
let shipCrashSound;
let speedboost;
let sbraket1;
let sbraket2;
let sbraket3;
let deadraket1;
let deadraket2;
let deadraket3;
function preload() {
    menumusic = loadSound("assets/bgm/menu.mp3");
    gameplaymusic = loadSound("assets/bgm/play.mp3");
    laserSoundeffect = loadSound("assets/soundeffects/laserBullet.mp3");
    enemyDeathSound = loadSound("assets/soundeffects/enemyDeathSound.mp3");
    shipCrashSound = loadSound("assets/soundeffects/shipCrash.mp3");
    alien = loadImage("/assets/Alien.png");
    alienHit = loadImage("/assets/Alien-Hit.png");
    asteroid = loadImage("/assets/Astroid.png");
    asteroidHit = loadImage("/assets/Astroid-Hit.png");
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
function setup() {
    createCanvas(600, 800);
    frameRate(60);
    game = new Game();
    outputVolume(0);
    shipCrashSound.setVolume(0.5);
}
function draw() {
    game.update();
    game.draw();
}
class Atmosphere {
    constructor() {
        this.y = 0;
        this.speed = 2;
        this.alphaValue = 255;
        this.isDisplayed = false;
    }
    draw() {
        noStroke();
        fill(135, 206, 235, this.alphaValue);
        ellipse(width / 2, this.y + height / 2, width * 2.3, height * 2);
        this.isDisplayed = true;
    }
    update() {
        this.y += this.speed;
        this.alphaValue -= 0.4;
        if (!this.isDisplayed) {
            this.y += this.speed;
            this.alphaValue -= 0.5;
        }
    }
}
class Background {
    constructor(onlyStars = false) {
        this.onlyStars = onlyStars;
        this.stars = [];
        for (let i = 0; i < 300; i++) {
            this.stars[i] = new Star();
        }
        this.atmosphere = new Atmosphere();
        this.earth = new Earth();
    }
    update() {
        for (let i = 0; i < this.stars.length; i++) {
            this.stars[i].fall();
        }
        this.atmosphere.update();
        this.earth.update();
    }
    draw() {
        background(0);
        for (let i = 0; i < this.stars.length; i++) {
            this.stars[i].show();
        }
        if (!this.onlyStars) {
            this.atmosphere.draw();
            this.earth.draw();
        }
    }
}
class Earth {
    constructor() {
        this.y = 0;
        this.speed = 2;
        this.isDisplayed = false;
    }
    update() {
        this.y += this.speed;
    }
    draw() {
        noStroke();
        fill(34, 139, 34);
        ellipse(width / 2, this.y + height / 1.2, width * 2.3, height * 0.8);
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
class LaserBeam {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.speed = 15;
        this.size = createVector(5, 30);
        this.color = color(124, 252, 0);
    }
    update() {
        this.position.y -= this.speed;
    }
    draw() {
        fill(this.color);
        rect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
}
class Alien extends GameEntity {
    constructor(position) {
        const size = createVector(130, 100);
        const hp = 3;
        super(position, size, alien, hp);
        this.velocity = createVector(0.5, 1);
    }
    update() {
        this.position.x += this.velocity.x * deltaTime;
        if (this.position.x < -width / 6 || this.position.x > width) {
            this.velocity.x = -this.velocity.x;
        }
        super.update();
    }
    getHitBox() {
        return {
            x: this.position.x + 10,
            y: this.position.y + 10,
            width: this.size.x - 20,
            height: this.size.y - 20,
        };
    }
}
class Astroid extends GameEntity {
    constructor(position) {
        const size = createVector(125, 125);
        const hp = 2;
        super(position, size, asteroid, hp);
    }
    getHitBox() {
        return {
            x: this.position.x + 10,
            y: this.position.y + 10,
            width: this.size.x - 20,
            height: this.size.y - 20,
        };
    }
}
class KillScore extends GameEntity {
    constructor(position, score) {
        super(position, 0);
        this.speed = 1;
        this.score = score;
        this.color = color(255, 255, 0);
        this.alpha = 1;
        this.delay = 500;
        this.fadeTimeMax = 500;
        this.fadeTime = this.fadeTimeMax;
    }
    update() {
        this.position.y -= this.speed;
        this.delay -= deltaTime;
        if (this.delay < 0) {
            this.fadeTime -= deltaTime;
            this.alpha = norm(this.fadeTime, 0, 1);
            this.color.setAlpha(this.alpha);
        }
    }
    draw() {
        textSize(24);
        fill(this.color);
        text(this.score, this.position.x, this.position.y);
    }
}
class OxygenTank extends GameEntity {
    constructor(position) {
        const size = createVector(20, 55);
        super(position, size, oxygenTank);
    }
}
class SpaceShip extends GameEntity {
    constructor() {
        const size = createVector(40, 160);
        const position = createVector(width / 2 - 20, height - 210);
        super(position, size, raket3);
        this.images = [raket3, raket4, raket5];
        this.currentImageIndex = 0;
        this.timer = 0;
        this.delay = 20;
        this.laserBeams = [];
        this.laserBeamDelay = 20;
        this.laserBeamTimer = 0;
        this.laserSoundeffect = laserSoundeffect;
        this.immortal = false;
        this.dead = false;
        this.exploding = false;
        this.explodeTimer = 600;
        this.hasLaserFired = false;
        this.haveAmmo = true;
    }
    update() {
        this.moveSpaceship();
        this.shootLaserBeam();
        this.timer++;
        if (this.timer % this.delay === 0) {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        }
        for (const laserBeam of this.laserBeams) {
            laserBeam.update();
        }
        this.explodingSpaceship();
    }
    draw() {
        image(this.images[this.currentImageIndex], this.position.x, this.position.y, this.size.x, this.size.y);
        for (const laserBeam of this.laserBeams) {
            laserBeam.draw();
        }
    }
    getHitBox() {
        return {
            x: this.position.x + 5,
            y: this.position.y + 10,
            width: this.size.x - 10,
            height: this.size.y - 50,
        };
    }
    moveSpaceship() {
        if (keyIsDown(UP_ARROW) && this.position.y > 0 && !this.exploding) {
            this.position.y -= 10;
        }
        if (keyIsDown(LEFT_ARROW) && this.position.x > 0 - this.size.x / 2 && !this.exploding) {
            this.position.x -= 10;
        }
        if (keyIsDown(RIGHT_ARROW) && this.position.x < width - this.size.x / 2 && !this.exploding) {
            this.position.x += 10;
        }
        if (keyIsDown(DOWN_ARROW) && this.position.y < height - this.size.y && !this.exploding) {
            this.position.y += 10;
        }
    }
    shootLaserBeam() {
        if (keyIsDown(32) && this.haveAmmo && this.laserBeamTimer > this.laserBeamDelay) {
            const laserBeam = new LaserBeam(this.position.x + this.size.x / 2 - 2, this.position.y - 15);
            this.laserBeams.push(laserBeam);
            this.laserSoundeffect.play();
            this.laserBeamTimer = 0;
            this.hasLaserFired = true;
        }
        this.laserBeamTimer++;
    }
    boostedSpaceship() {
        this.images = [sbraket1, sbraket2, sbraket3];
    }
    regularSpaceship() {
        this.images = [raket3, raket4, raket5];
    }
    explode() {
        this.images = [deadraket1, deadraket2, deadraket3];
        this.exploding = true;
    }
    explodingSpaceship() {
        if (this.exploding) {
            this.explodeTimer -= deltaTime;
            if (this.explodeTimer < 0) {
                this.currentImageIndex = 2;
                this.dead = true;
            }
        }
    }
}
class SpeedBoost extends GameEntity {
    constructor(position) {
        const size = createVector(40, 40);
        super(position, size, speedboost);
    }
}
//# sourceMappingURL=bundle.js.map