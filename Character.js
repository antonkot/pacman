class Character {
    constructor(x_, y_, r_) {
        this.x = x_;
        this.y = y_;
        this.r = r_;
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