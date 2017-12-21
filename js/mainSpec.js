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