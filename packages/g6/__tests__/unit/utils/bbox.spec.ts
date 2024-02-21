import { AABB } from '@antv/g';
import {
  getBBoxHeight,
  getBBoxWidth,
  getExpandedBBox,
  getNearestPointToPoint,
  getNearestSideToPoint,
  getNodeBBox,
  getPointBBox,
  isPointInBBox,
  isPointOutsideBBox,
  union,
} from '../../../src/utils/bbox';

describe('bbox', () => {
  const bbox = new AABB();
  bbox.setMinMax([0, 0, 0], [1, 1, 1]);

  it('getBBoxWidth', () => {
    expect(getBBoxWidth(bbox)).toBe(1);
  });

  it('getBBoxHeight', () => {
    expect(getBBoxHeight(bbox)).toBe(1);
  });

  it('getNodeBBox', () => {
    const bbox = new AABB();
    bbox.setMinMax([10, 10, 0], [10, 10, 0]);
    expect(getNodeBBox([10, 10, 0])).toEqual(bbox);
  });

  it('getPointBBox', () => {
    const pointBBox = new AABB();
    pointBBox.setMinMax([10, 10, 0], [10, 10, 0]);
    expect(getPointBBox([10, 10, 0])).toEqual(pointBBox);
  });

  it('getExpandedBBox', () => {
    const expandedBBox = new AABB();
    expandedBBox.setMinMax([-10, -10, 0], [11, 11, 1]);
    expect(getExpandedBBox(bbox, 10)).toEqual(expandedBBox);
    expect(getExpandedBBox(bbox, [10, 10, 10, 10])).toEqual(expandedBBox);
  });

  it('union', () => {
    const bbox1 = new AABB();
    bbox1.setMinMax([0, 0, 0], [1, 1, 1]);
    const bbox2 = new AABB();
    bbox2.setMinMax([2, 2, 2], [3, 3, 3]);
    const bbox3 = new AABB();
    bbox3.setMinMax([0, 0, 0], [3, 3, 3]);
    expect(union(bbox1, bbox2)).toEqual(bbox3);
  });

  it('isPointInBBox', () => {
    expect(isPointInBBox([0.5, 0.5, 0], bbox)).toBe(true);
    expect(isPointInBBox([0, 0, 0], bbox)).toBe(true);
    expect(isPointInBBox([1, 1, 1], bbox)).toBe(true);
    expect(isPointInBBox([2, 2, 2], bbox)).toBe(false);
  });

  it('isPointOutsideBBox', () => {
    expect(isPointOutsideBBox([2, 2, 2], bbox)).toBe(true);
    expect(isPointOutsideBBox([0.5, 0.5, 0], bbox)).toBe(false);
  });

  it('getNearestSideToPoint', () => {
    expect(getNearestSideToPoint(bbox, [0.2, 0.5, 0])).toBe('left');
    expect(getNearestSideToPoint(bbox, [0.5, 0.2, 0])).toBe('top');
    expect(getNearestSideToPoint(bbox, [0.8, 0.5, 0])).toBe('right');
    expect(getNearestSideToPoint(bbox, [0.5, 0.8, 0])).toBe('bottom');
  });

  it('getNearestPointToPoint', () => {
    expect(getNearestPointToPoint(bbox, [0.2, 0.5, 0])).toEqual([0, 0.5, 0]);
    expect(getNearestPointToPoint(bbox, [0.5, 0.2, 0])).toEqual([0.5, 0, 0]);
    expect(getNearestPointToPoint(bbox, [0.8, 0.5, 0])).toEqual([1, 0.5, 0]);
    expect(getNearestPointToPoint(bbox, [0.5, 0.8, 0])).toEqual([0.5, 1, 0]);
    expect(getNearestPointToPoint(bbox, [1.8, 0.5, 0])).toEqual([1, 0.5, 0]);
    expect(getNearestPointToPoint(bbox, [0.5, 1.8, 0])).toEqual([0.5, 1, 0]);
  });
});
