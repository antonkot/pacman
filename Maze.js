/*

Class for maze. Takes text config and fills cells 2D-grid.

*/

class Maze {
    constructor(config, characters) {
        this.cells = [];

        // Parce map and fill the maze
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
                        characters.blinky.changeMode(
                            characters.blinky.MODES.scatter
                        );
                        break;
                    case "p":
                        characters.pinky = new Pinky(
                            this,
                            CELL_SIZE * cellX,
                            CELL_SIZE * cellY,
                            CELL_SIZE / 2 - 2
                        );
                        characters.pinky.changeMode(
                            characters.pinky.MODES.scatter
                        );
                        break;
                }
            });
            this.cells.push(arr);
        });

        // Traverse the maze and count free neighbors
        for (var y = 1; y < this.cells.length - 1; y++) {
            let line = this.cells[y];
            for (var x = 1; x < line.length - 1; x++) {

                // If this is wall - continue
                if (this.cells[y][x].isWall) {
                    continue;
                }

                let numFree = 0;
                for (var i = -1; i <= 1; i++) {
                    for (var j = -1; j <= 1; j++) {
                        if (i == 0 && j == 0) {
                            continue;
                        }

                        if (!this.cells[y + j][x + i].isWall) {
                            numFree++;
                        }
                    }
                }
                // If count of free neighbors != 2,
                // we have a turn
                // Else if top and bottom neighbors
                // are the same - we have a holloway
                switch (numFree) {
                    case 2:
                        if (
                            this.cells[y + 1][x].isWall !=
                            this.cells[y - 1][x].isWall
                        ) {
                            this.cells[y][x].isTurn = true;
                        }
                        break;
                    default:
                        this.cells[y][x].isTurn = true;
                        break;
                }
            }
        }
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

    astar(start, end) {
        let open = [start];
        let closed = [];

        let current;

        const DIR = [{
                x: 0,
                y: -1
            },
            {
                x: 1,
                y: 0
            },
            {
                x: 0,
                y: 1
            },
            {
                x: -1,
                y: 0
            }
        ];

        while (open.length > 0) {
            current = open.reduce((min, elt) => {
                if (elt.f < min.f) {
                    return elt;
                }
                if (elt.f == min.f && elt.h(end) < min.h(end)) {
                    return elt;
                }
                return min;
            });

            if (current == end) {
                let path = [];
                let c = end;

                do {
                    path.push(c);
                    c = c.from;
                } while (c != start);

                return path;
            }

            open.splice(open.indexOf(current), 1);
            closed.push(current);

            for (var d = 0; d < 4; d++) {
                let dir = DIR[d];
                let nx = current.x + dir.x;
                let ny = current.y + dir.y;

                if (nx < 0 || ny < 0 || nx > this.cells[0].length - 1 || ny > this.cells.length - 1) {
                    continue;
                }

                let nCell = this.cells[ny][nx];
                if (nCell.isWall || closed.indexOf(nCell) > -1) {
                    continue;
                }

                let gScore = current.g + 1;

                if (open.indexOf(nCell) == -1) {
                    open.push(nCell);
                } else if (gScore >= nCell.g) {
                    continue;
                }

                nCell.from = current;
                nCell.g = gScore;
                nCell.f = nCell.g + nCell.h(end);
            }
        }
    }
}