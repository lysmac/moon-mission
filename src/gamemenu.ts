class GameMenu {
  x: number = 0;
  y: number = 0;
  color: string;
  width: number = 100;
  height: number = 100;
  //textSize: number = 20;
  //titleText: string = "MOON MISSION";
  //textPlay: string = 'PRESS "SPACE" TO PLAY';
  //textHowToPlay: string = "USE ARROW LEFT AND RIGHT TO MOVE";
  game: IStartGame;
  background: Background; 

  constructor(
    game: IStartGame,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ) {
    this.game = game;
    this.x = x;
    this.y = y;
    // this.position = createVector(0, 0)
    this.width = width;
    this.height = height;
    this.color = color;
    this.background = new Background(true);
  }

  public update() {
    // 32 is keycode for space
    if (keyIsDown(32)) {
      this.game.startNewGame();
    }

    this.background.update();
  }
  
  public draw() {
    this.background.draw();
    //background(255, 204, 0);
    
    fill(this.color);
    stroke("#D9D9D9");
    strokeWeight(2);
    rect(this.x, this.y, this.width, this.height, 20);
    //noStroke();

    
    // fill("#FDCA51");
    // textSize(70);
     
    // textFont("sofia sans");
    
    
   let textPlayY = this.y + 40;
   //let textHowToPlayY = this.y + 120;
    
    // text(this.titleText, this.x + (this.width / 2), this.y - 90);

    //MENU TEXT
    fill("#D9D9D9");
    textFont("secular one");
    textSize(21);
    // textAlign(CENTER);
    noStroke();
    text("PRESS ", this.x +53, this.y+70);
    fill("#FDCA51");
    text("SPACE", this.x + textWidth("PRESS ")+60, this.y + 70);
    fill("#D9D9D9");
    text(" TO START GAME", this.x +textWidth("PRESS SPACE")+67, this.y + 70);
    text("HOW TO PLAY", this.x+ 130, textPlayY  + 100);
    
    //Spaceschip
    angleMode(DEGREES);
    rotate(25);
    image(raket3, 330, 350, 80, 250, 0, 0, raket3.width, raket3.height, CONTAIN, LEFT);
    
  }




  }


// font-family: 'Kanit', sans-serif;
// font-family: 'Secular One', sans-serif;
// font-family: 'Sofia Sans', sans-serif;
