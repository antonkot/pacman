let maze = []
let canvas = document.getElementById('app');
let ctx = canvas.getContext('2d');

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

            requestAnimationFrame(update);
        });
}


function update(time) {
    for (var y = 0; y < maze.length; y++) {
        let line = maze[y];
        for (var x = 0; x < line.length; x++) {
            let cell = maze[y][x];
            cell.draw(ctx, x, y);
        }
    }
    requestAnimationFrame(update);
}

setup();