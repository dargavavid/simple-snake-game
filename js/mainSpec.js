const T = new Tester();

T.test("Should create 2D array.", function() {
    const testArr = [[0,0], [0,0]];
    const testArr2 = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    T.assertSimilar(makeGrid(2, 2), testArr);
    T.assertSimilar(makeGrid(3, 3), testArr2);
});

T.test("Should create a snake object with specified parameters.", function() {
    const snake = new Snake(10, 11, 5, 7);
    T.assertEquals(snake.body[0].x, 10);
    T.assertEquals(snake.body[0].x, 10);
    T.assertEquals(snake.dx, 5);
    T.assertEquals(snake.dy, 7);
});

T.test("Should update snake position and change direction", function() {
    const snake = new Snake(0, 0, 0, 1);
    const snake2 = new Snake(0, 0, 1, 0);
    const updated = [{x: 0, y: 1}];
    const updated2 = [{x: 1, y: 0}];
    snake.move();
    snake2.move();
    T.assertSimilar(snake.body, updated);
    T.assertSimilar(snake2.body, updated2);
    
    snake.changeDirection(0, -1);
    snake.move();
    T.assertEquals(snake.dy, -1);
    T.assertSimilar(snake.body, [{x: 0, y: 0}]);
});

T.test("Should map snake to grid", function() {
    const snake = new Snake(0, 0, 0, 0);
    const grid = [[0, 0], [0, 0]];
    T.assertSimilar(mapSnakeToGrid(snake, grid), [[1, 0], [0, 0]]);    
    snake.body.push({x: 1, y: 1});
    T.assertSimilar(mapSnakeToGrid(snake, grid), [[1, 0], [0, 1]]);
    snake.body.push({ x: 0, y: 1 });
    T.assertSimilar(mapSnakeToGrid(snake, grid), [[1, 0], [1, 1]]);
});