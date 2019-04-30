class Pinky extends Ghost {
    constructor(maze_, x_, y_, r_) {
        super(maze_, x_, y_, r_);
    }

    draw(ctx) {
        ctx.fillStyle = 'pink';
        ctx.beginPath();
        ctx.ellipse(
            this.x + CELL_SIZE / 2, this.y + CELL_SIZE / 2,
            this.r, this.r, 0, 0, Math.PI * 2
        );
        ctx.fill();

        super.draw(ctx);
    }

    update(characters) {
        let mazeWidth = this.maze.cells[0].length - 1;
        let mazeHeight = this.maze.cells.length - 1;
        switch (this.mode) {
            case this.MODES.scatter:
                this.target = this.maze.cells[1][mazeWidth - 1];
                break;
            case this.MODES.chase:
                let pacmanCell = this.maze.getCurrentCell(characters.pacman);
                let x = pacmanCell.x + Math.sign(characters.pacman.speed.x) * 4;
                x = x.clamp(0, mazeWidth - 1);
                let y = pacmanCell.y + Math.sign(characters.pacman.speed.y) * 4;
                y = y.clamp(0, mazeHeight - 1);
                let target = this.maze.cells[y][x];
                if (target.isWall) {
                    this.target = pacmanCell;
                } else {
                    this.target = target;
                }
                break;
            default:

        }
        super.update(characters);
    }
}