import {
  getBBoxHeight,
  getBBoxSize,
  getBBoxWidth,
  getCombinedBBox,
  getExpandedBBox,
  getIncircleRadius,
  getNearestBoundaryPoint,
  getNearestBoundarySide,
  getNodeBBox,
  getPointBBox,
  getTriangleCenter,
  isBBoxInside,
  isPointInBBox,
  isPointOnBBoxBoundary,
  isPointOutsideBBox,
} from '@/src/utils/bbox';
import { AABB } from '@antv/g';

describe('bbox', () => {
  const bbox = new AABB();
  bbox.setMinMax([0, 0, 0], [1, 1, 1]);

  it('getBBoxWidth', () => {
    expect(getBBoxWidth(bbox)).toBe(1);
  });

  it('getBBoxHeight', () => {
    expect(getBBoxHeight(bbox)).toBe(1);
  });

  it('getBBoxSize', () => {
    expect(getBBoxSize(bbox)).toEqual([1, 1]);
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

  it('getCombinedBBox', () => {
    const bbox1 = new AABB();
    bbox1.setMinMax([0, 0, 0], [1, 1, 1]);
    const bbox2 = new AABB();
    bbox2.setMinMax([2, 2, 2], [3, 3, 3]);
    const bbox3 = new AABB();
    bbox3.setMinMax([0, 0, 0], [3, 3, 3]);
    expect(getCombinedBBox([bbox1, bbox2])).toEqual(bbox3);
    expect(getCombinedBBox([])).toEqual(new AABB());
  });

  it('isBBoxInside', () => {
    const bbox1 = new AABB();
    bbox1.setMinMax([0, 0, 0], [1, 1, 1]);
    const bbox2 = new AABB();
    bbox2.setMinMax([0.5, 0.5, 0], [1.5, 1.5, 1]);
    const bbox3 = new AABB();
    bbox3.setMinMax([0, 0, 0], [2, 2, 2]);
    expect(isBBoxInside(bbox1, bbox2)).toBe(false);
    expect(isBBoxInside(bbox1, bbox3)).toBe(true);
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

  it('isPointOnBBoxBoundary', () => {
    expect(isPointOnBBoxBoundary([0, 0.5, 0], bbox)).toEqual(true);
    expect(isPointOnBBoxBoundary([0, 2, 0], bbox)).toEqual(false);
    expect(isPointOnBBoxBoundary([0, 2, 0], bbox, true)).toEqual(true);
  });

  it('getNearestBoundarySide', () => {
    expect(getNearestBoundarySide([0.2, 0.5, 0], bbox)).toBe('left');
    expect(getNearestBoundarySide([0.5, 0.2, 0], bbox)).toBe('top');
    expect(getNearestBoundarySide([0.8, 0.5, 0], bbox)).toBe('right');
    expect(getNearestBoundarySide([0.5, 0.8, 0], bbox)).toBe('bottom');
  });

  it('getNearestBoundaryPoint', () => {
    expect(getNearestBoundaryPoint([0.2, 0.5, 0], bbox)).toEqual([0, 0.5, 0]);
    expect(getNearestBoundaryPoint([0.5, 0.2, 0], bbox)).toEqual([0.5, 0, 0]);
    expect(getNearestBoundaryPoint([0.8, 0.5, 0], bbox)).toEqual([1, 0.5, 0]);
    expect(getNearestBoundaryPoint([0.5, 0.8, 0], bbox)).toEqual([0.5, 1, 0]);
    expect(getNearestBoundaryPoint([1.8, 0.5, 0], bbox)).toEqual([1, 0.5, 0]);
    expect(getNearestBoundaryPoint([0.5, 1.8, 0], bbox)).toEqual([0.5, 1, 0]);
  });

  it('getTriangleCenter', () => {
    expect(getTriangleCenter(bbox, 'left')).toEqual([2 / 3, 0.5]);
    expect(getTriangleCenter(bbox, 'right')).toEqual([0.33333333333333337, 0.5]);
    expect(getTriangleCenter(bbox, 'up')).toEqual([0.5, 2 / 3]);
    expect(getTriangleCenter(bbox, 'down')).toEqual([0.5, 0.33333333333333337]);
  });

  it('getIncircleRadius', () => {
    expect(getIncircleRadius(bbox, 'left')).toEqual(0.3090169943749474);
    expect(getIncircleRadius(bbox, 'right')).toEqual(0.3090169943749474);
    expect(getIncircleRadius(bbox, 'up')).toEqual(0.3090169943749474);
    expect(getIncircleRadius(bbox, 'down')).toEqual(0.3090169943749474);
  });
});
