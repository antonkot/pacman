/*

Class for maze cell. Takes char from maze text config
and sets the cell properties.
Cell can be wall or not. If not wall, it can have dot or not,
or have energizer or not.
Default is empty cell.

*/

class Cell {
    constructor(char) {
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
        ctx.fillRect(x * 20, y * 20, 20, 20);
    }
}