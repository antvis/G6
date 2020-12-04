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
  },
  upTriangle: (x, y, r) => {
    const l1 = r * Math.cos(Math.PI / 6);
    const l2 = r * Math.sin(Math.PI / 6);
    return [['M', x - l1, y + l2], ['L', x + l1, y + l2], ['L', x, y - r], ['Z']];
  },
  downTriangle: (x, y, r) => {
    const l1 = r * Math.cos(Math.PI / 6);
    const l2 = r * Math.sin(Math.PI / 6);
    return [['M', x - l1, y - l2], ['L', x + l1, y - l2], ['L', x, y + r], ['Z']];
  },
};
