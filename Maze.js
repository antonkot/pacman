class Maze {
    constructor(config) {
        this.cells = [];

        config.split("\n").forEach(line => {
            let arr = [];
            line.split('').forEach(cell => {
                arr.push(new Cell(cell));
            });
            this.cells.push(arr);
        });
    }

    draw() {
        for (var y = 0; y < this.cells.length; y++) {
            let line = this.cells[y];
            for (var x = 0; x < line.length; x++) {
                let cell = this.cells[y][x];
                cell.draw(ctx, x, y);
            }
        }
    }

    // Check collision between bounding sphere and box
    isCollide() {

    }
}