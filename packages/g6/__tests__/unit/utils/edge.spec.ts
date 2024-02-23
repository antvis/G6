import { AABB, Line } from '@antv/g';
import {
  getCubicPath,
  getCurveControlPoint,
  getLabelPositionStyle,
  getPolylinePath,
  getQuadraticPath,
  getRadians,
  parseCurveOffset,
  parseCurvePosition,
} from '../../../src/utils/edge';

describe('edge', () => {
  describe('getLabelPositionStyle', () => {
    it('should return correctly label position style', () => {
      // horizontal line
      const line = new Line({
        style: {
          x1: 0,
          y1: 100,
          x2: 100,
          y2: 100,
        },
      });

      //  with rotation angle below Math.PI
      const line1 = new Line({
        style: {
          x1: 0,
          y1: 100,
          x2: 100,
          y2: 200,
        },
      });

      // with rotation angle over Math.PI
      const line2 = new Line({
        style: {
          x1: 0,
          y1: 200,
          x2: 100,
          y2: 100,
        },
      });

      const labelPosition = getLabelPositionStyle(line, 'center', false, 0, 0);
      expect(labelPosition.textAlign).toEqual('center');
      expect(labelPosition.x).toEqual(50);
      expect(labelPosition.y).toEqual(100);

      const labelPosition2 = getLabelPositionStyle(line, 'center', true, 5, 5);
      expect(labelPosition2.textAlign).toEqual('center');
      expect(labelPosition2.x).toEqual(55);
      expect(labelPosition2.y).toEqual(105);

      const labelPosition3 = getLabelPositionStyle(line, 'start', true, 5, 5);
      expect(labelPosition3.textAlign).toEqual('left');
      expect(labelPosition3.x).toEqual(5);
      expect(labelPosition3.y).toEqual(105);

      const labelPosition4 = getLabelPositionStyle(line, 'end', true, 5, 5);
      expect(labelPosition4.textAlign).toEqual('right');
      expect(labelPosition4.x).toBeCloseTo(100 * 0.99 + 5);
      expect(labelPosition4.y).toEqual(105);

      const labelPosition5 = getLabelPositionStyle(line, 0.5, true, 5, 5);
      expect(labelPosition5.textAlign).toEqual('center');
      expect(labelPosition5.x).toEqual(55);
      expect(labelPosition5.y).toEqual(105);

      //  with rotation angle below Math.PI
      const labelPosition6 = getLabelPositionStyle(line1, 'center', true, 5, 5);
      expect(labelPosition6.textAlign).toEqual('center');
      expect(labelPosition6.transform).toEqual('rotate(45deg)');
      expect(labelPosition6.x).toEqual(50 + 5 * Math.cos(Math.PI / 4) - 5 * Math.sin(Math.PI / 4));
      expect(labelPosition6.y).toEqual(150 + 5 * Math.sin(Math.PI / 4) + 5 * Math.cos(Math.PI / 4));

      const labelPosition7 = getLabelPositionStyle(line1, 'start', true, 5, 5);
      expect(labelPosition7.textAlign).toEqual('left');

      const labelPosition8 = getLabelPositionStyle(line1, 'end', true, 5, 5);
      expect(labelPosition8.textAlign).toEqual('right');

      // with rotation angle over Math.PI
      const labelPosition9 = getLabelPositionStyle(line2, 'center', true, 5, 5);
      expect(labelPosition9.textAlign).toEqual('center');
      expect(labelPosition9.transform).toEqual('rotate(-45deg)');
      expect(labelPosition9.x).toEqual(50 + 5 * Math.cos(-Math.PI / 4) - 5 * Math.sin(-Math.PI / 4));
      expect(labelPosition9.y).toEqual(150 + 5 * Math.sin(-Math.PI / 4) + 5 * Math.cos(-Math.PI / 4));
    });
  });

  it('getCurveControlPoint', () => {
    expect(getCurveControlPoint([0, 0], [100, 0], 0.5, 20)).toEqual([50, -20]);
    expect(getCurveControlPoint([0, 0], [100, 0], 0.5, -20)).toEqual([50, 20]);
  });

  it('parseCurveOffset', () => {
    expect(parseCurveOffset(20)).toEqual([20, -20]);
    expect(parseCurveOffset([20, 30])).toEqual([20, 30]);
  });

  it('parseCurvePosition', () => {
    expect(parseCurvePosition(0.2)).toEqual([0.2, 0.8]);
    expect(parseCurvePosition([0.2, 0.8])).toEqual([0.2, 0.8]);
  });

  it('getQuadraticPath', () => {
    expect(getQuadraticPath([0, 10], [10, 10], [100, 100])).toEqual([
      ['M', 0, 10],
      ['Q', 100, 100, 10, 10],
    ]);
  });

  it('getCubicPath', () => {
    expect(
      getCubicPath(
        [0, 10],
        [100, 100],
        [
          [20, 20],
          [50, 50],
        ],
      ),
    ).toEqual([
      ['M', 0, 10],
      ['C', 20, 20, 50, 50, 100, 100],
    ]);
  });

  it('getPolylinePath', () => {
    expect(
      getPolylinePath(
        [
          [0, 10],
          [20, 20],
          [50, 50],
          [100, 100],
        ],
        0,
      ),
    ).toEqual([
      ['M', 0, 10],
      ['L', 20, 20],
      ['L', 50, 50],
      ['L', 100, 100],
    ]);
    expect(
      getPolylinePath(
        [
          [0, 10],
          [20, 20],
          [50, 50],
          [100, 100],
        ],
        0,
        true,
      ),
    ).toEqual([['M', 0, 10], ['L', 20, 20], ['L', 50, 50], ['L', 100, 100], ['Z']]);
  });

  it('getRadians', () => {
    const bbox = new AABB();
    bbox.setMinMax([0, 0, 0], [100, 100, 0]);
    const EIGHTH_PI = Math.PI / 8;
    expect(getRadians(bbox).bottom[0]).toBeCloseTo(EIGHTH_PI * 3);
    expect(getRadians(bbox).top[0]).toBeCloseTo(-EIGHTH_PI * 5);
  });
});
