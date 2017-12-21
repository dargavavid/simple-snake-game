const T = new Tester();

T.test("Should create 2D array", function() {
    const testArr = [[0,0], [0,0]];
    const testArr2 = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    T.assertSimilar(makeGrid(2, 2), testArr);
    T.assertSimilar(makeGrid(3, 3), testArr2);
});