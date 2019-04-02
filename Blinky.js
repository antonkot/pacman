class Blinky extends Ghost {
    constructor(maze_, x_, y_, r_) {
        super(maze_, x_, y_, r_);
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.ellipse(
            this.x + CELL_SIZE / 2, this.y + CELL_SIZE / 2,
            this.r, this.r, 0, 0, Math.PI * 2
        );
        ctx.fill();
    }
}