/* Constants */
const BASE_SPEED = 2;
const CELL_SIZE = 20;
const DEBUG = true;
const SCATTER_TIME = 2000;

/*
Global variables.
*/
let maze;
let canvas = document.getElementById('app');
let ctx = canvas.getContext('2d');

let characters = {};

let stepCounter = 0;
let desiredSpeed;

let header = document.getElementById('header');

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
    switch (evt.keyCode) {
        case 37: // LEFT
            desiredSpeed = {
                x: -BASE_SPEED,
                y: 0
            };
            break;
        case 38: // UP
            desiredSpeed = {
                x: 0,
                y: -BASE_SPEED
            };
            break;
        case 39: // RIGHT
            desiredSpeed = {
                x: BASE_SPEED,
                y: 0
            };
            break;
        case 40: // DOWN
            desiredSpeed = {
                x: 0,
                y: BASE_SPEED
            };
            break;
    }
}

/*
Update dunction.
Calculates game mechanics and draws game screen.
*/
function update(time) {
    let pacman = characters.pacman;

    maze.draw(ctx);
    for (let character_name in characters) {
        let char = characters[character_name];
        if (
            char != pacman &&
            maze.getCurrentCell(char) == maze.getCurrentCell(pacman)
        ) {
            return;
        }

        char.update(characters);
        char.draw(ctx);
    }
    stepCounter += BASE_SPEED;

    if (stepCounter >= CELL_SIZE) {
        stepCounter = 0;
        if (desiredSpeed && !maze.isCollide(pacman, desiredSpeed)) {
            pacman.speed = desiredSpeed;
        }
    }

    header.innerText = `PACMAN: ${pacman.eatenDots} ${pacman.score}`;

    if (
        pacman.eatenDots >= 30 &&
        characters.inky.mode == characters.inky.MODES.wait
    ) {
        characters.inky.changeMode(characters.inky.MODES.scatter);
    }

    requestAnimationFrame(update);
}

setup();