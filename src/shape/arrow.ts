export default {
    triangle: (width, length) => {
        const arrowBeging = 0;//length;
        let arrowPath = `M ${arrowBeging},0 L ${arrowBeging + length},-${width} L ${
            arrowBeging + length
            },${width} Z`;
        return arrowPath;
    }
}