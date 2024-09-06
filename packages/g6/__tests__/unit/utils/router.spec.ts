import { Rect } from '@/src';
import type { Point } from '@/src/types';
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
} from '@/src/utils/router/orth';
import { estimateCost, getNearestPoint } from '@/src/utils/router/shortest-path';
import { manhattanDistance } from '@/src/utils/vector';
import { AABB } from '@antv/g';

describe('router', () => {
  describe('orth', () => {
    const bbox = new AABB();
    bbox.setMinMax([0, 0, 0], [1, 2, 0]);

    it('orth', () => {
      const sourceNode = new Rect({ style: { size: 15, x: 5, y: 5 } });
      const sourcePoint: Point = [5, 5];
      const targetNode = new Rect({ style: { size: 15, x: 25, y: 25 } });
      const targetPoint: Point = [25, 25];
      const controlPoints: Point[] = [[5, 10]];
      expect(orth(sourcePoint, targetPoint, sourceNode, targetNode, controlPoints, { padding: 10 })).toEqual([
        [-12.51, 5],
        [-12.51, 22.51],
        [5, 22.51],
        [5, 10],
        [5, 7.5],
        [25, 7.5],
      ]);

      const sourceNode2 = new Rect({ style: { size: 25, x: 100, y: 100 } });
      const targetNode2 = new Rect({ style: { size: 25, x: 150, y: 150 } });
      const controlPoints2: Point[] = [[160, 100]];
      expect(orth([100, 100], [150, 150], sourceNode2, targetNode2, controlPoints2, { padding: 10 })).toEqual([
        [160, 100],
        [172.5, 100],
        [172.5, 150],
      ]);
      expect(orth([100, 100], [150, 150], sourceNode2, targetNode2, [], { padding: 10 })).toEqual([[100, 150]]);

      const sourceNode3 = new Rect({ style: { size: 10, x: 5, y: 0 } });
      const targetNode3 = new Rect({ style: { size: 10, x: 20, y: 25 } });
      expect(orth([5, 5], [20, 20], sourceNode3, targetNode3, [], { padding: 0 })).toEqual([
        [5, 5],
        [5, 20],
        [20, 20],
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
      expect(nodeToPoint([5, 5], [20, 20], sourceBBox).points).toEqual([[5, 20]]);
      expect(nodeToPoint([5, 5], [20, 20], sourceBBox).direction).toEqual('E');
      expect(nodeToPoint([10, 5], [20, 20], sourceBBox).points).toEqual([[20, 5]]);
      expect(nodeToPoint([10, 5], [20, 20], sourceBBox).direction).toEqual('S');
    });

    it('pointToNode', () => {
      const targetBBox = new AABB();
      targetBBox.setMinMax([10, 10, 0], [25, 25, 0]);
      expect(pointToNode([10, 5], [20, 25], targetBBox, 'N').points).toEqual([[20, 5]]);
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

  describe('shortestPath', () => {
    it('estimateCost', () => {
      expect(
        estimateCost(
          [0, 0],
          [
            [1, 0],
            [0, 1],
            [1, 1],
          ],
          manhattanDistance,
        ),
      ).toEqual(1);
    });

    it('getNearestPoint', () => {
      expect(
        getNearestPoint(
          [
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 1],
          ],
          [2, 0],
          manhattanDistance,
        ),
      ).toEqual([1, 0]);
    });
  });
});
