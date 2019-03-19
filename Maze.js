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
                            this,
                            CELL_SIZE * cellX,
                            CELL_SIZE * cellY,
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

    worldToGrid(x, y) {
        return [
            Math.round(x / CELL_SIZE),
            Math.round(y / CELL_SIZE),
        ]
    }

    gridToWorld(x, y) {
        return [
            x * CELL_SIZE,
            y * CELL_SIZE
        ]
    }

    // Check collision between bounding sphere and box
    isCollide(character) {
        // // TODO: Tweak position according to speed direction

        // Calculate current cell coordinates, where character is now
        // from is's corner coordinates
        let [currentX, currentY] = this.gridToWorld(
            Math.round(character.x / CELL_SIZE),
            Math.round(character.y / CELL_SIZE)
        );

        // Calculate normalized speed
        let speedX = character.speed.x / Math.abs(character.speed.x + 1e-10);
        let speedY = character.speed.y / Math.abs(character.speed.y + 1e-10);

        // Calculate target cell coordinates, where character is going to be
        let targetX = currentX + speedX * CELL_SIZE;
        let targetY = currentY + speedY * CELL_SIZE;

        let [cellX, cellY] = this.worldToGrid(targetX, targetY);

        if (DEBUG) {
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 1;
            ctx.strokeRect(
                targetX, targetY,
                CELL_SIZE, CELL_SIZE
            );
        }

        if (this.cells[cellY][cellX].isWall) {
            return true;
        } else {
            return false;
        }
    }
}