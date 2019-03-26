class Pacman extends Character {
    constructor(maze_, x_, y_, r_) {
        super(maze_, x_, y_, r_);
    }

    update() {
        super.update();

        let cell = this.maze.getCurrentCell(this);

        if (cell.hasDot) {
            cell.hasDot = false;
        }
    }
}