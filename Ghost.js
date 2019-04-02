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
        this.target = [0, 0];
    }
}