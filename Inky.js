class Inky extends Ghost {
    constructor(maze_, x_, y_, r_) {
        super(maze_, x_, y_, r_);
    }

    draw(ctx) {
        ctx.fillStyle = 'cyan';
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
        let mazeHeight = this.maze.cells.length - 1; //30
        switch (this.mode) {
            case this.MODES.scatter:
                console.log(mazeHeight);
                this.target = this.maze.cells[mazeHeight - 1][mazeWidth - 1];
                break;
            case this.MODES.chase:
                let pacmanCell = this.maze.getCurrentCell(characters.pacman);
                let x = pacmanCell.x + Math.sign(characters.pacman.speed.x) * 2;
                let y = pacmanCell.y + Math.sign(characters.pacman.speed.y) * 2;
                x = x.clamp(1, mazeWidth - 1);
                y = y.clamp(1, mazeHeight - 1);

                let centerCell = this.maze.cells[y][x];
                let blinkyCell = this.maze.getCurrentCell(characters.blinky);

                let dx = centerCell.x - blinkyCell.x;
                let dy = centerCell.y - blinkyCell.y;

                let nx = x + dx;
                let ny = y + dy;

                nx = nx.clamp(1, mazeWidth - 1);
                ny = ny.clamp(1, mazeHeight - 1);

                let target = this.maze.cells[ny][nx];

                if (target.isWall) {
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            if (i == 0 && j == 0) {
                                continue;
                            }

                            let newTarget = this.maze.cells[ny + i][nx + j];
                            if (!newTarget.isWall) {
                                this.target = newTarget;
                                break;
                            }
                        }
                    }
                } else {
                    this.target = target;
                }
                break;
            default:

        }
        super.update(characters);
    }
}