class Pacman extends Character {
    constructor(maze_, x_, y_, r_) {
        super(maze_, x_, y_, r_);

        this.eatenDots = 0;
        this.score = 0;
    }

    update() {
        super.update();

        let cell = this.maze.getCurrentCell(this);

        if (cell.hasDot) {
            cell.hasDot = false;
            this.eatenDots++;
            this.score += 10;
        }
    }
}