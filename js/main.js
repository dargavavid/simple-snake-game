//Create 2D grid with n rows and m columns:
function makeGrid(n, m) {
    return new Array(n).fill(0).map(row => new Array(m).fill(0));
}

const app = {
    canvas: document.querySelector("#canvas"),
    canvasCtx: this.canvas.getContext("2d")
};

