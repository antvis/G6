import { AABB } from '@antv/g';
import { Point } from '../../../src/types';
import {
  freeJoin,
  getBBoxSize,
  getDirection,
  insideNode,
  nodeToNode,
  nodeToPoint,
  orth,
  pointToNode,
  pointToPoint,
} from '../../../src/utils/router/orth';

describe('router', () => {
  describe('orth', () => {
    const bbox = new AABB();
    bbox.setMinMax([0, 0, 0], [1, 2, 0]);

    it('orth', () => {
      const sourceBBox = new AABB();
      sourceBBox.setMinMax([-10, -10, 0], [20, 20, 0]);
      const sourcePoint: Point = [5, 5];
      const targetBBox = new AABB();
      targetBBox.setMinMax([10, 10, 0], [40, 40, 0]);
      const targetPoint: Point = [25, 25];
      const controlPoints: Point[] = [[5, 10]];
      expect(orth(sourcePoint, targetPoint, sourceBBox, targetBBox, controlPoints, 10)).toEqual([
        [-10.01, 5],
        [-10.01, 20.01],
        [5, 20.01],
        [5, 10],
        [5, 10],
        [25, 10],
      ]);

      const sourceBBox2 = new AABB();
      sourceBBox2.setMinMax([0, 0, 0], [10, 10, 0]);
      const targetBBox2 = new AABB();
      targetBBox2.setMinMax([0, 0, 0], [20, 20, 0]);
      const controlPoints2: Point[] = [[5, 5]];
      expect(orth([5, 5], [15, 15], sourceBBox2, targetBBox2, controlPoints2, 10)).toEqual([
        [-5.01, 5],
        [-5.01, -5.01],
        [5, -5.01],
        [5, 5],
        [5, 20.01],
        [15, 20.01],
      ]);
      expect(orth([5, 5], [15, 15], sourceBBox2, targetBBox2, [], 10)).toEqual([
        [-0.01, 5],
        [-0.01, 15],
      ]);

      const sourceBBox3 = new AABB();
      sourceBBox3.setMinMax([0, 0, 0], [10, 10, 0]);
      const targetBBox3 = new AABB();
      targetBBox3.setMinMax([20, 20, 0], [30, 30, 0]);
      expect(orth([10, 5], [25, 30], sourceBBox3, targetBBox3, [], 10)).toEqual([[10, 30]]);
      expect(orth([10, 5], [25, 30], sourceBBox3, targetBBox3, [[20, 20]], 10)).toEqual([
        [10, 20],
        [20, 20],
        [30.01, 20],
        [30.01, 30],
      ]);
      expect(
        orth(
          [10, 5],
          [25, 30],
          sourceBBox3,
          targetBBox3,
          [
            [20, 20],
            [22, 22],
          ],
          10,
        ),
      ).toEqual([
        [10, 20],
        [20, 20],
        [22, 20],
        [22, 22],
        [22, 32.01],
        [25, 32.01],
      ]);
      expect(
        orth(
          [10, 5],
          [25, 30],
          sourceBBox3,
          targetBBox3,
          [
            [20, 20],
            [20, 22],
          ],
          10,
        ),
      ).toEqual([
        [10, 20],
        [20, 20],
        [20, 22],
        [20, 32.01],
        [25, 32.01],
      ]);
    });

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
      const sourcePoint: Point = [10, 5];
      const targetPoint: Point = [20, 20];
      expect(nodeToPoint(sourcePoint, targetPoint, sourceBBox).points).toEqual([[10, 20]]);
      expect(nodeToPoint(sourcePoint, targetPoint, sourceBBox).direction).toEqual('E');
    });

    it('pointToNode', () => {
      const sourcePoint: Point = [10, 5];
      const targetPoint: Point = [20, 25];
      const targetBBox = new AABB();
      targetBBox.setMinMax([10, 10, 0], [25, 25, 0]);
      expect(pointToNode(sourcePoint, targetPoint, targetBBox, 'N').points).toEqual([[20, 5]]);
    });

    it('nodeToNode', () => {
      const sourcePoint: Point = [5, 5, 0];
      const targetPoint: Point = [7, 7, 0];
      const sourceBBox = new AABB();
      sourceBBox.setMinMax([0, 0, 0], [10, 10, 0]);
      const targetBBox = new AABB();
      targetBBox.setMinMax([2, 2, 0], [12, 12, 0]);
      expect(nodeToNode(sourcePoint, targetPoint, sourceBBox, targetBBox).points).toEqual([
        [6, 5],
        [6, 2],
      ]);
    });

    it('insideNode', () => {
      const sourcePoint: Point = [5, 5];
      const targetPoint: Point = [7, 7];
      const sourceBBox = new AABB();
      sourceBBox.setMinMax([0, 0, 0], [10, 10, 0]);
      const targetBBox = new AABB();
      targetBBox.setMinMax([0, 0, 0], [12, 12, 0]);
      expect(insideNode(sourcePoint, targetPoint, sourceBBox, targetBBox).points).toEqual([
        [-0.01, 5],
        [-0.01, 7],
      ]);
      expect(insideNode(sourcePoint, targetPoint, sourceBBox, targetBBox, 'S').points).toEqual([
        [5, 12.01],
        [7, 12.01],
      ]);
    });

    it('freeJoin', () => {
      const sourceBBox = new AABB();
      sourceBBox.setMinMax([0, 0, 0], [10, 10, 0]);
      const sourcePoint: Point = [5, 10];
      const targetPoint: Point = [20, 5];
      expect(freeJoin(sourcePoint, targetPoint, sourceBBox)).toEqual([20, 10]);
    });
  });
});
