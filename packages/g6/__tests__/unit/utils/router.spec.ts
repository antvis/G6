import { AABB } from '@antv/g';
import { Point } from '../../../src/types';
import {
  freeJoin,
  getBBoxSize,
  getDirection,
  nodeToPoint,
  pointToNode,
  pointToPoint,
} from '../../../src/utils/router/orth';

describe('router', () => {
  describe('orth', () => {
    const bbox = new AABB();
    bbox.setMinMax([0, 0, 0], [1, 2, 0]);

    it('getDirection', () => {
      expect(getDirection([0, 0], [0, 1])).toEqual('S');
      expect(getDirection([0, 0], [1, 0])).toEqual('E');
      expect(getDirection([0, 0], [0, -1])).toEqual('N');
      expect(getDirection([0, 0], [-1, 0])).toEqual('W');
      expect(getDirection([0, 0], [1, 1])).toEqual(null);
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

    it('nodeToPoint', () => {
      const sourceBBox = new AABB();
      sourceBBox.setMinMax([0, 0, 0], [10, 10, 0]);
      const sourcePoint: Point = [10, 5, 0];
      const targetPoint: Point = [20, 20, 0];
      expect(nodeToPoint(sourcePoint, targetPoint, sourceBBox).points).toEqual([[10, 20]]);
      expect(nodeToPoint(sourcePoint, targetPoint, sourceBBox).direction).toEqual('E');
    });

    it('pointToNode', () => {
      const sourcePoint: Point = [10, 5, 0];
      const targetPoint: Point = [20, 25, 0];
      const targetBBox = new AABB();
      targetBBox.setMinMax([10, 10, 0], [25, 25, 0]);
      expect(pointToNode(sourcePoint, targetPoint, targetBBox, 'N').points).toEqual([[20, 5]]);
    });

    it('freeJoin', () => {
      const sourceBBox = new AABB();
      sourceBBox.setMinMax([0, 0, 0], [10, 10, 0]);
      const sourcePoint: Point = [5, 10, 0];
      const targetPoint: Point = [20, 5, 0];
      expect(freeJoin(sourcePoint, targetPoint, sourceBBox)).toEqual([20, 10]);
    });
  });
});
