//Create snake class:
class Snake {
    constructor(x1 = 0, y1 = 0, dx = 0, dy = 1) {
        this.body = [{x: x1, y: y1}];
        this.dx = dx;
        this.dy = dy;
    }

    //Move head, everything else takes the position of the previous section.
    move() {
        //Update head position:
        const nx = this.body[0].x + this.dx;
        const ny = this.body[0].y + this.dy;
        // const moved = this.body.map(section => {
        //     section.x += this.dx;
        //     section.y += this.dy;
        //     return section;
        // });
        this.body.unshift({x: nx, y: ny});//Add new head
        this.body.pop();//Remove last segment
    }

    changeDirection(dx, dy) {
        this.dx = dx;
        this.dy = dy;
    }


}

//Create 2D grid with n rows and m columns:
function makeGrid(n, m) {
    return new Array(n).fill(0).map(row => new Array(m).fill(0));
}

//Map snake unto grid:
function mapSnakeToGrid(snake, grid) {
    return grid.map((row, y) => row.map((column, x) => {
        const match = snake.body.filter(section => section.x === x && section.y === y);
        return match.length > 0 ? 1 : grid[y][x] === 2 ? 2 : 0;
    }));
}

function renderGrid(app) {
    const grid = app.grid;
    const context = app.canvasCtx;
    const blockWidth = app.canvas.width / grid[0].length, blockHeight = app.canvas.height / grid.length;
    let currentX = 0, currentY = 0;
    context.lineWidth = 3;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 1) {
                context.fillStyle = app.settings.snakeColor;
                context.fillRect(currentX, currentY, blockWidth, blockHeight);
                context.strokeStyle = app.settings.borderColor;
                context.strokeRect(currentX, currentY, blockWidth, blockHeight);
            }else {
                context.strokeStyle = app.settings.borderColor;
                context.strokeRect(currentX, currentY, blockWidth, blockHeight);
            }
            currentX += blockWidth;
        }
        currentX = 0;
        currentY += blockHeight;
    }
}

function clearCanvas(canvas, context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

const app = {
    canvas: document.querySelector("#canvas"),
    canvasCtx: this.canvas.getContext("2d"),
    snake: new Snake(0, 0, 1, 0),
    grid: makeGrid(10, 10),
    settings: {
        fps: 1000 / 3,
        snakeColor: "deeppink",
        borderColor: "white"
    },
    state: {
        lastFrame: 0,
        frameCounter: 0
    }
};

function mainLoop(time = 0) {
    window.requestAnimationFrame(mainLoop);
    const deltaTime = time - app.state.lastFrame;
    app.state.frameCounter += deltaTime;
    app.state.lastFrame = time;
    if (app.state.frameCounter > app.settings.fps) {
        app.snake.move();
        app.grid = mapSnakeToGrid(app.snake, app.grid);
        clearCanvas(app.canvas, app.canvasCtx);
        renderGrid(app);
        app.state.frameCounter = 0;
    }
}

function handleControls(e) {
    const kc = e.keyCode;
    if (kc === 37) {//l-arrow
        app.snake.changeDirection(-1, 0);
    }else if (kc === 39) {//r-arrow
        app.snake.changeDirection(1, 0);
    }else if (kc === 38) {//u-arrow
        app.snake.changeDirection(0, -1);
    }else if (kc === 40) {//d-arrow
        app.snake.changeDirection(0, 1);
    }
}

function setEventListeners() {
    document.addEventListener("keydown" ,handleControls, false);
}

app.snake.body = [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}];
// app.grid = mapSnakeToGrid(app.snake, app.grid);
// renderGrid(app);

setEventListeners();
mainLoop();

document.addEventListener("keydown", function(e) {
    console.log(e.keyCode);
}, false);