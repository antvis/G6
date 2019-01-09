const expect = require('chai').expect;
const Util = require('../../../src/util/');

describe('path util test', () => {
  describe('get control point', () => {
    it('horizontal', () => {
      const start = { x: 0, y: 0 };
      const end = { x: 100, y: 0 };
      expect(Util.getControlPoint(start, end, 0.5, 10)).eqls({ x: 50, y: 10 });
      expect(Util.getControlPoint(start, end, 0.2, -2)).eqls({ x: 20, y: -2 });
    });
    it('vertical', () => {
      const start = { x: 0, y: 0 };
      const end = { x: 0, y: 100 };
      expect(Util.getControlPoint(start, end, 0.5, 10)).eqls({ x: -10, y: 50 });
      expect(Util.getControlPoint(start, end, 0.2, -2)).eqls({ x: 2, y: 20 });
    });
    it('45', () => {
      const start = { x: 0, y: 0 };
      const end = { x: 100, y: 100 };
      const point = Util.getControlPoint(start, end, 0.5, 10);
      const sqrt2 = Math.sqrt(2);
      expect(point.x).eqls(50 - sqrt2 * 10 / 2);
      expect(point.y).eqls(50 + sqrt2 * 10 / 2);
    });
    it('135', () => {
      const start = { x: 100, y: 100 };
      const end = { x: 0, y: 0 };
      const point = Util.getControlPoint(start, end, 0.5, 10);
      const sqrt2 = Math.sqrt(2);
      expect(point.x).eqls(50 + sqrt2 * 10 / 2);
      expect(point.y).eqls(50 - sqrt2 * 10 / 2);
    });
  });
});
