//Create snake class:
class Snake {
    constructor(x1 = 0, y1 = 0, dx = 0, dy = 1) {
        this.body = [{x: x1, y: y1}];
        this.dx = dx;
        this.dy = dy;
    }
    //Move head, everything else takes the position of the previous section.
    move() {
        const moved = this.body.map(section => {
            section.x += this.dx;
            section.y += this.dy;
            return section;
        });
        this.body = moved;
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
        return match.length > 0 ? 1 : grid[y][x];
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

const app = {
    canvas: document.querySelector("#canvas"),
    canvasCtx: this.canvas.getContext("2d"),
    snake: new Snake(0, 0, 0, 1),
    grid: makeGrid(10, 10),
    settings: {
        snakeColor: "red",
        borderColor: "white"
    }
};

renderGrid(app);