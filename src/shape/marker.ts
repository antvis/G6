export default {
    collapse: (x, y, r) => {
        return [
            ['M', x - r, y],
            ['a', r, r, 0, 1, 0, r * 2, 0],
            ['a', r, r, 0, 1, 0, -r * 2, 0],
            ['M', x - r + 4, y],
            ['L', x + r - 4, y],
        ];
    },
    expand: (x, y, r) => {
        return [
            ['M', x - r, y],
            ['a', r, r, 0, 1, 0, r * 2, 0],
            ['a', r, r, 0, 1, 0, -r * 2, 0],
            ['M', x - r + 4, y],
            ['L', x - r + 2 * r - 4, y],
            ['M', x - r + r, y - r + 4],
            ['L', x, y + r - 4],
        ];
    }
}