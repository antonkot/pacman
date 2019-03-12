class Character {
    constructor(maze_, x_, y_, r_) {
        this.x = x_;
        this.y = y_;
        this.r = r_;
        this.maze = maze_;

        this.speed = {
            x: 0,
            y: 0
        }
    }

    update() {
        this.x += this.speed.x;
        this.y += this.speed.y;
    }

    draw(ctx) {
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.ellipse(
            this.x, this.y,
            this.r, this.r, 0, 0, Math.PI * 2
        );
        ctx.fill();
    }
}