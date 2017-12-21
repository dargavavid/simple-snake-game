//Create snake class:
class Snake {
    constructor(x1 = 0, y1 = 0, dx = 0, dy = 1) {
        this.body = [{x: x1, y: y1}];
        this.dx = dx;
        this.dy = dy;
    }
}

//Create 2D grid with n rows and m columns:
function makeGrid(n, m) {
    return new Array(n).fill(0).map(row => new Array(m).fill(0));
}

const app = {
    canvas: document.querySelector("#canvas"),
    canvasCtx: this.canvas.getContext("2d"),
    snake: new Snake(0, 0, 0, 1),
};

