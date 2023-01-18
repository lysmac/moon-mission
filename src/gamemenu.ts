class GameMenu {

  x: number = 0
  y: number = 0 
  color: string = 'red'
  width: number = 100
  height: number = 100

    constructor(x: number, y: number, width: number, height: number, color: string) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
      this.color = color
    }
  
    public update() {
      this.x = 1
      this.y = 0 
    }


    public draw() {
      fill (this.color)
      rect(this.x, this.y, this.width, this.height)
      
      
    }

    
  }