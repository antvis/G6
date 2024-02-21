import { AABB } from '@antv/g';
import { getBBoxSize, getDirection, pointToPoint } from '../../../src/utils/router/orth';

describe('router', () => {
  describe('orth', () => {
    const bbox = new AABB();
    bbox.setMinMax([0, 0, 0], [1, 2, 0]);

    it('getDirection', () => {
      expect(getDirection([0, 0], [0, 1])).toEqual('S');
      expect(getDirection([0, 0], [1, 0])).toEqual('E');
      expect(getDirection([0, 0], [0, -1])).toEqual('N');
      expect(getDirection([0, 0], [-1, 0])).toEqual('W');
    });

    it('getBBoxSize', () => {
      expect(getBBoxSize(bbox, 'N')).toEqual(2);
      expect(getBBoxSize(bbox, 'S')).toEqual(2);
      expect(getBBoxSize(bbox, 'E')).toEqual(1);
      expect(getBBoxSize(bbox, 'W')).toEqual(1);
    });

    it('pointToPoint', () => {
      expect(pointToPoint([0, 0], [1, 1], 'S').points).toEqual([[0, 1]]);
      expect(pointToPoint([0, 0], [1, 1], 'S').direction).toEqual('E');
      expect(pointToPoint([0, 0], [1, 1], 'E').points).toEqual([[1, 0]]);
      expect(pointToPoint([0, 0], [1, 1], 'E').direction).toEqual('S');
    });
  });
});
