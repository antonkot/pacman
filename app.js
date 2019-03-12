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

            document.addEventListener('keydown', onKeyDown);

            requestAnimationFrame(update);
        });
}

function onKeyDown(evt) {
    let pacman = characters.pacman;
    switch (evt.keyCode) {
        case 37: // LEFT
            pacman.speed = {
                x: -1,
                y: 0
            };
            break;
        case 38: // UP
            pacman.speed = {
                x: 0,
                y: -1
            };
            break;
        case 39: // RIGHT
            pacman.speed = {
                x: 1,
                y: 0
            };
            break;
        case 40: // DOWN
            pacman.speed = {
                x: 0,
                y: 1
            };
            break;
    }
}

/*
Update dunction.
Calculates game mechanics and draws game screen.
*/
function update(time) {
    maze.draw(ctx);
    for (let character_name in characters) {
        characters[character_name].update();
        characters[character_name].draw(ctx);
    }
    requestAnimationFrame(update);
}

setup();