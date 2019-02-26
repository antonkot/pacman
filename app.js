let maze = []

function setup() {
    fetch('maze.txt')
        .then(data => data.text())
        .then(text => {
            text.split("\n").forEach(line => {
                let arr = [];
                line.split('').forEach(cell => {
                    arr.push(new Cell(cell));
                });
                maze.push(arr);
            });
        });
}

function update() {

}

setup();