
const expect = require('chai').expect;
const Util = require('../../../src/util/');
function equal(a, b) {
  return Math.abs((a - b)) < 0.0001;
}
describe('math util test', () => {

  it('intersect with ellipse, rx = ry', () => {
    const ellipse = {
      x: 0,
      y: 0,
      rx: 1,
      ry: 1
    };
    const p1 = Util.getEllispeIntersectByPoint(ellipse, { x: 2, y: 0 });
    expect(equal(p1.x, 1)).eql(true);
    expect(equal(p1.y, 0)).eqls(true);
    const p2 = Util.getEllispeIntersectByPoint(ellipse, { x: -2, y: 0 });
    expect(equal(p2.x, -1)).eql(true);
    expect(equal(p2.y, 0)).eqls(true);
    const p3 = Util.getEllispeIntersectByPoint(ellipse, { x: 0, y: 2 });
    expect(equal(p3.x, 0)).eql(true);
    expect(equal(p3.y, 1)).eqls(true);
    const p4 = Util.getEllispeIntersectByPoint(ellipse, { x: 0, y: -2 });
    expect(equal(p4.x, 0)).eql(true);
    expect(equal(p4.y, -1)).eqls(true);

    const p5 = Util.getEllispeIntersectByPoint(ellipse, { x: 2, y: 2 });
    expect(equal(p5.x, Math.sqrt(2) / 2)).eql(true);
    expect(equal(p5.y, Math.sqrt(2) / 2)).eqls(true);

  });

  it('intersect with ellipse, rx != ry', () => {
    const arr = [
      { x: 12, y: 0 },
      { x: 12, y: 12 },
      { x: 0, y: 12 },
      { x: -12, y: 12 },
      { x: -12, y: 0 },
      { x: 0, y: -12 },
      { x: -12, y: -12 }
    ];
    let ellipse = { x: 0, y: 0, rx: 5, ry: 4 };
    // rx > ry
    arr.forEach(point => {
      const p = Util.getEllispeIntersectByPoint(ellipse, point);
      // x*x/a*a + y*y/b*b = 1
      const v = p.x * p.x / 25 + p.y * p.y / 16;
      expect(equal(v, 1)).eql(true);
    });

    ellipse = { x: 0, y: 0, rx: 4, ry: 5 };
    // rx < ry
    arr.forEach(point => {
      const p = Util.getEllispeIntersectByPoint(ellipse, point);
      // x*x/a*a + y*y/b*b = 1
      const v = p.x * p.x / 16 + p.y * p.y / 25;
      expect(equal(v, 1)).eql(true);
    });
    ellipse = { x: 2, y: 2, rx: 4, ry: 5 };
    arr.forEach(point => {
      const p = Util.getEllispeIntersectByPoint(ellipse, point);
      // x*x/a*a + y*y/b*b = 1
      const v = (p.x - 2) * (p.x - 2) / 16 + (p.y - 2) * (p.y - 2) / 25;
      expect(equal(v, 1)).eql(true);
    });

  });
});
