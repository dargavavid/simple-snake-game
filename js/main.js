//Create snake class:
class Snake {
    constructor(x1 = 0, y1 = 0, dx = 0, dy = 1) {
        this.body = [{x: x1, y: y1}];
        this.dx = dx;
        this.dy = dy;
        this.isNewSection = false;
    }

    //Move head, everything else takes the position of the previous section.
    move() {
        //Check section overlap
        const areOverlapping = this.body.map(sectionA => {
            // console.log(this.body);
            return this.body.filter(sectionB => sectionA.x === sectionB.x && sectionA.y === sectionB.y).length !== 1;
        }).reduce((boolAccum, isOverlapping) => boolAccum += isOverlapping, 0);
        if (areOverlapping === 0) {
            //Update head position:
            const nx = this.body[0].x + this.dx;
            const ny = this.body[0].y + this.dy;
            this.body.unshift({x: nx, y: ny});//Add new head
            if (!this.isNewSection) {
                this.body.pop();//Remove last segment
            }else {
                this.isNewSection = false;
            }
        }
        return areOverlapping;
    }

    changeDirection(dx, dy) {
        //If only one directon changes, reverse sections
        if (dx !== this.dx ^ dy !== this.dy) {
            this.body.reverse();
        }
        this.dx = dx;
        this.dy = dy;
    }

    addNewSection() {
        this.isNewSection = true;
    }
}

class Token {
    constructor(x, y, type = 2) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    respawn(grid) {
        const freePositions = grid.map((row, y) => row.map((column, x) => {
            return grid[y][x] > 0 ? 0 : {x: x, y: y};
        })).reduce((union, arr) => union.concat(arr), []).filter(position => position !== 0);
        const roll = Math.floor(Math.random() * freePositions.length);
        const newPosition = freePositions[roll];
        this.x = newPosition.x;
        this.y = newPosition.y;
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

function checkTokenSnakeCollision(token, snake) {
    return snake.body.filter(section => section.x === token.x && section.y === token.y).length > 0;
}

function handleTokenSnakeCollision(tokens, snake, grid) {
    for (const token of tokens) {
        if (checkTokenSnakeCollision(token, snake)) {
            snake.addNewSection();
            token.respawn(grid);
            mapTokensToGrid();
        }
    }
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
            }else if (grid[i][j] === 2) {
                context.fillStyle = app.settings.tokenColor;
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
    tokens: [new Token(4, 0)],
    grid: makeGrid(10, 10),
    settings: {
        fps: 1000 / 4,
        snakeColor: "pink",
        borderColor: "ghostwhite",
        tokenColor: "red"
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
        handleTokenSnakeCollision(app.tokens, app.snake, app.grid);
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

function mapTokensToGrid() {
    app.grid = app.grid.map((row, y) => row.map((column, x) => {
        const match = app.tokens.filter(token => token.x === x && token.y === y);
        return match.length > 0 ? 2 : app.grid[y][x];
    }));
}

app.snake.body = [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}];

mapTokensToGrid(app.tokens, app.grid);
setEventListeners();
mainLoop();