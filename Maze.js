/*

Class for maze. Takes text config and fills cells 2D-grid.

*/

class Maze {
    constructor(config, characters) {
        this.cells = [];

        config.split("\n").forEach((line, cellY) => {
            let arr = [];
            line.split('').forEach((cell, cellX) => {
                arr.push(new Cell(cell));

                switch (cell) {
                    case "P":
                        characters.pacman = new Pacman(
                            CELL_SIZE * (cellX + 1 / 2),
                            CELL_SIZE * (cellY + 1 / 2),
                            CELL_SIZE / 2 - 2
                        );
                        break;
                }
            });
            this.cells.push(arr);
        });
    }

    // Draw maze on a given context
    draw(ctx) {
        for (var y = 0; y < this.cells.length; y++) {
            let line = this.cells[y];
            for (var x = 0; x < line.length; x++) {
                let cell = this.cells[y][x];
                cell.draw(ctx, x, y);
            }
        }
    }

    // Check collision between bounding sphere and box
    isCollide(cx, cy, ax, ay, ar) {
        let d = CELL_SIZE / 2 + ar;
        if (Math.abs(cx - ax) > 0 || Math.abs(xy - ay) > 0) {
            return false;
        } else {
            return true;
        }
    }
}