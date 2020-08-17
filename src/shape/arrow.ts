export default {
  triangle: (width: number = 10, length: number = 15, d: number = 0) => {
    const begin = d * 2;
    const path = `M ${begin},0 L ${begin + length},-${width / 2} L ${begin + length},${
      width / 2
    } Z`;
    return path;
  },
  vee: (width: number = 15, length: number = 20, d: number = 0) => {
    const begin = d * 2;
    const path = `M ${begin},0 L ${begin + length},-${width / 2}
        L ${begin + (2 * length) / 3},0 L ${begin + length},${width / 2} Z`;
    return path;
  },
  circle: (r: number = 5, d: number = 0) => {
    const begin = d * 2;
    const path = `M ${begin}, 0
            a ${r},${r} 0 1,0 ${r * 2},0
            a ${r},${r} 0 1,0 ${-r * 2},0`;
    return path;
  },
  rect: (width: number = 10, length: number = 10, d: number = 0) => {
    const begin = d * 2;
    const path = `M ${begin},${-width / 2} 
        L ${begin + length},${-width / 2} 
        L ${begin + length},${width / 2} 
        L ${begin},${width / 2} Z`;
    return path;
  },
  diamond: (width: number = 15, length: number = 15, d: number = 0) => {
    const begin = d * 2;
    const path = `M ${begin},0 
        L ${begin + length / 2},${-width / 2} 
        L ${begin + length},0 
        L ${begin + length / 2},${width / 2} Z`;
    return path;
  },
  triangleRect: (
    tWidth: number = 15,
    tLength: number = 15,
    rWidth: number = 15,
    rLength: number = 3,
    gap: number = 5,
    d: number = 0,
  ) => {
    const begin = d * 2;
    const rectBegin = begin + tLength + gap;
    const path = `M ${begin},0 L ${begin + tLength},-${tWidth / 2} L ${begin + tLength},${
      tWidth / 2
    } Z
            M ${rectBegin}, -${rWidth / 2}
            L ${rectBegin + rLength} -${rWidth / 2}
            L ${rectBegin + rLength} ${rWidth / 2}
            L ${rectBegin} ${rWidth / 2}
            Z`;
    return path;
  },
};
