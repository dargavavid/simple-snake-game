//Create snake class:
class Snake {
    constructor(x1 = 0, y1 = 0, dx = 0, dy = 1) {
        this.body = [{x: x1, y: y1}];
        this.dx = dx;
        this.dy = dy;
    }

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

const app = {
    canvas: document.querySelector("#canvas"),
    canvasCtx: this.canvas.getContext("2d"),
    snake: new Snake(0, 0, 0, 1),
    grid: makeGrid(10, 10)
};

