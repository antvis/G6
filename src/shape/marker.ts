export default {
    collapse: (x, y, r) => {
        return [
            ['M', x, y],
            ['a', r, r, 0, 1, 0, r * 2, 0],
            ['a', r, r, 0, 1, 0, -r * 2, 0],
            ['M', x + 2, y],
            ['L', x + 2 * r - 2, y],
        ];
    }
}