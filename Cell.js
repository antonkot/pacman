/*

Class for maze cell. Takes char from maze text config
and sets the cell properties.
Cell can be wall or not. If not wall, it can have dot or not,
or have energizer or not.
Default is empty cell.

*/

class Cell {
    constructor(char, x_, y_) {
        this.x = x_;
        this.y = y_;
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
            default:
                this.isWall = false;
                this.hasDot = false;
                this.hasEnergizer = false;
                break;
        }
    }

    /*
    Draw current cell on given context at given coordinates
    */
    draw(ctx, x, y) {
        ctx.fillStyle = this.isWall ? 'blue' : 'black';
        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

        if (!this.isWall) {
            if (this.hasDot) {
                ctx.fillStyle = 'white';
                ctx.fillRect(
                    (x * CELL_SIZE) + (CELL_SIZE / 2 - 1),
                    (y * CELL_SIZE) + (CELL_SIZE / 2 - 1),
                    2, 2
                );
            }

            if (this.hasEnergizer) {
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.ellipse(
                    (x * CELL_SIZE) + CELL_SIZE / 2,
                    (y * CELL_SIZE) + CELL_SIZE / 2,
                    4, 4, 0, 0, Math.PI * 2
                );
                ctx.fill();
            }
        }
    }
}