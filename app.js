/*
Global variables.
*/
let maze;
let canvas = document.getElementById('app');
let ctx = canvas.getContext('2d');

let characters = {};

/*
Set up function.
Runs at very beginning, loads data and sets up initial values.
After all, starts animation loop.
*/
function setup() {
    fetch('maze.txt')
        .then(data => data.text())
        .then(text => {
            maze = new Maze(text, characters);
            requestAnimationFrame(update);
        });
}

/*
Update dunction.
Calculates game mechanics and draws game screen.
*/
function update(time) {
    maze.draw(ctx);
    for (let character_name in characters) {
        characters[character_name].draw(ctx);
    }
    requestAnimationFrame(update);
}

setup();