/* Constants */
const BASE_SPEED = 2;
const CELL_SIZE = 20;
const DEBUG = true;

/*
Global variables.
*/
let maze;
let canvas = document.getElementById('app');
let ctx = canvas.getContext('2d');

let characters = {};

let stepCounter = 0;
let desiredSpeed;

let path;

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

            path = maze.astar(
                maze.getCurrentCell(characters.blinky),
                maze.getCurrentCell(characters.pacman),
            );


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
    maze.draw(ctx);
    for (let character_name in characters) {
        characters[character_name].update();
        characters[character_name].draw(ctx);
    }
    stepCounter += BASE_SPEED;

    let pacman = characters.pacman;
    if (stepCounter >= CELL_SIZE) {
        stepCounter = 0;
        if (desiredSpeed && !maze.isCollide(pacman, desiredSpeed)) {
            pacman.speed = desiredSpeed;
        }
    }

    if (DEBUG) {
        ctx.beginPath();
        let first = true;
        for (let cell of path) {
            let point = [
                CELL_SIZE * (cell.x + 0.5),
                CELL_SIZE * (cell.y + 0.5)
            ];
            if (first) {
                first = false;
                ctx.moveTo(point[0], point[1]);
            }
            ctx.lineTo(point[0], point[1]);
        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'yellow';
        ctx.stroke();
    }

    requestAnimationFrame(update);
}

setup();