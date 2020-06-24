export default {
    triangle: (width: number = 10, length: number = 15, d: number = 0) => {
        const begin = d * 2;
        let path = `M ${begin},0 L ${begin + length},-${width / 2} L ${
            begin + length
            },${width / 2} Z`;
        return path;
    },
    vee: (width: number = 15, length: number = 20, d: number = 0) => {
        const begin = d * 2;
        let path = `M ${begin},0 L ${begin + length},-${width / 2}
        L ${begin + 2 * length / 3},0 L ${
            begin + length
            },${width / 2} Z`;
        return path;
    },
    circle: (r: number = 5, d: number = 0) => {
        const begin = d * 2;
        let path = `M ${begin}, 0
            a ${r},${r} 0 1,0 ${r * 2},0
            a ${r},${r} 0 1,0 ${-r * 2},0`;
        return path;
    },
    rect: (width: number = 10, length: number = 10, d: number = 0) => {
        const begin = d * 2;
        let path = `M ${begin},${-width / 2} 
        L ${begin + length},${-width / 2} 
        L ${begin + length},${width / 2} 
        L ${begin},${width / 2} Z`;
        return path;
    },
    diamond: (width: number = 15, length: number = 15, d: number = 0) => {
        const begin = d * 2;
        let path = `M ${begin},0 
        L ${begin + length / 2},${-width / 2} 
        L ${begin + length},0 
        L ${begin + length / 2},${width / 2} Z`;
        return path;
    }
}