import { Line } from '@antv/g';
import { Point } from '../../../src/types';
import { getLabelPositionStyle, getQuadraticPath } from '../../../src/utils/edge';

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

      const labelPosition = getLabelPositionStyle(line, 'center', false);
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

  describe('getQuadraticPath', () => {
    const sourcePoint: Point = [0, 10];
    const targetPoint: Point = [10, 10];
    const curvePosition = 0.5;
    const curveOffset = 5;
    const controlPoint: Point = [100, 100];

    it('should return the correct path for given source and target points with a control point', () => {
      const path = getQuadraticPath(sourcePoint, targetPoint, curvePosition, curveOffset, controlPoint);

      expect(path).toEqual([
        ['M', 0, 10],
        ['Q', 100, 100, 10, 10],
      ]);
    });

    it('should return the correct path for given source and target points without a control point', () => {
      const path = getQuadraticPath(sourcePoint, targetPoint, curvePosition, curveOffset);

      expect(path).toEqual([
        ['M', 0, 10],
        ['Q', 5, 15, 10, 10],
      ]);
    });
  });
});
