class Ghost extends Character {
    constructor(maze_, x_, y_, r_) {
        super(maze_, x_, y_, r_);

        this.MODES = {
            chase: 1,
            scatter: 2,
            fear: 3,
            respawn: 4
        };

        this.mode = this.MODES.scatter;
        this.target = null;

        this.path = [];
        this.lastTurn = null;

        this.scatterTime = null;
    }

    changeMode(mode_) {
        this.mode = mode_;
        switch (mode_) {
            case this.MODES.scatter:
                this.scatterTime = (new Date()).getTime();
                break;
            default:

        }
    }

    update(pacman) {
        let cell = this.maze.getCurrentCell(this);

        if (cell != this.target) {
            if (cell.isTurn && cell != this.lastTurn) {
                this.path = this.maze.astar(
                    cell,
                    this.maze.cells[this.target.y][this.target.x],
                );
                this.lastTurn = cell;
            }

            if (this.path.length > 0) {
                let next = this.path[this.path.length - 1];
                if (next == cell) {
                    this.path.pop();
                    next = this.path[this.path.length - 1];
                }
                if (next) {
                    this.speed.x = next.x - cell.x;
                    this.speed.y = next.y - cell.y;
                }
            }
        }

        let time = (new Date()).getTime();
        if (time - this.scatterTime >= SCATTER_TIME) {
            this.changeMode(this.MODES.chase);
        }

        super.update(pacman);
    }

    draw(ctx) {
        if (DEBUG) {
            ctx.beginPath();
            let first = true;
            for (let cell of this.path) {
                let point = [
                    CELL_SIZE * (cell.x + 0.5),
                    CELL_SIZE * (cell.y + 0.5)
                ];
                if (first) {
                    first = false;
                    ctx.moveTo(point[0], point[1]);
                }
                ctx.lineTo(point[0], point[1]);
            }
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'yellow';
            ctx.stroke();
        }
    }
}