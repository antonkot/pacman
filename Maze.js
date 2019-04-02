/*

Class for maze. Takes text config and fills cells 2D-grid.

*/

class Maze {
    constructor(config, characters) {
        this.cells = [];

        config.split("\n").forEach((line, cellY) => {
            let arr = [];
            line.split('').forEach((cell, cellX) => {
                arr.push(new Cell(cell, cellX, cellY));

                switch (cell) {
                    case "P":
                        characters.pacman = new Pacman(
                            this,
                            CELL_SIZE * cellX,
                            CELL_SIZE * cellY,
                            CELL_SIZE / 2 - 2
                        );
                        break;
                    case "b":
                        characters.blinky = new Blinky(
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

    // Calculate current cell coordinates, where character is now
    // from is's corner coordinates
    getCurrentCell(character) {
        let [currentX, currentY] = [
            character.speed.x > 0 ?
            Math.floor(character.x / CELL_SIZE) :
            Math.ceil(character.x / CELL_SIZE),

            character.speed.y > 0 ?
            Math.floor(character.y / CELL_SIZE) :
            Math.ceil(character.y / CELL_SIZE)
        ];
        return this.cells[currentY][currentX];
    }

    // Check collision between bounding sphere and box
    isCollide(character, desiredSpeed) {
        let currentCell = this.getCurrentCell(character);
        let [currentWorldX, currentWorldY] = this.gridToWorld(currentCell.x, currentCell.y);

        // Calculate normalized speed
        let speedX = desiredSpeed.x / Math.abs(desiredSpeed.x + 1e-10);
        let speedY = desiredSpeed.y / Math.abs(desiredSpeed.y + 1e-10);

        // Calculate target cell coordinates, where character is going to be
        let targetX = currentWorldX + speedX * CELL_SIZE;
        let targetY = currentWorldY + speedY * CELL_SIZE;

        let [cellX, cellY] = this.worldToGrid(targetX, targetY);

        if (this.cells[cellY][cellX].isWall) {
            return true;
        } else {
            return false;
        }
    }
}