class AmmunitionDisplay {
    private position: p5.Vector;
    private size: p5.Vector;
    private color: string;
    private speed: number;
    public currentAmmo: number;
    private maxAmmo: number;

    constructor()  {
        this.position = createVector(60, height - 50)
        this.size = createVector(100, 10,)
        this.color = 'white'
        this.maxAmmo = 15;
        this.currentAmmo = 15;
    }

    public update() {
        if (this.currentAmmo < 6) {
            this.color = 'red';
        } else {
            this.color = 'white';
        }
    }
    
    public draw() {
        textSize(20)
        fill(this.color)
        text(`${this.currentAmmo} / ${this.maxAmmo}`, this.position.x, this.position.y);
        
        if (this.currentAmmo == 0) {
            fill(255)
            rect(this.position.x - 50, this.position.y + 15, 1, this.size.y);
        }
    }
}