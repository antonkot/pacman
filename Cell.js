class Cell {
    constructor(char) {
        this.isWall = false;
        switch (char) {
            case '#':
                this.isWall = true;
                break;
            case '.':
                this.hasDot = true;
                break;
            case '*':
                this.hasEnergizer = true;
                break;
        }
    }

    draw(ctx, x, y) {
        ctx.fillStyle = this.isWall ? 'blue' : 'black';
        ctx.fillRect(x * 20, y * 20, 20, 20);
    }
}