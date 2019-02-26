class Cell {
    constructor(char) {
        this.isWall = false;
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
        }
    }
}