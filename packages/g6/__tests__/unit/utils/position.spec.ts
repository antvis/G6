import {
  getXYByAnchor,
  getXYByPlacement,
  getXYByRelativePlacement,
  hasPosition,
  positionOf,
} from '@/src/utils/position';
import { AABB } from '@antv/g';

describe('position', () => {
  const bbox = new AABB();
  bbox.setMinMax([0, 0, 0], [100, 100, 0]);
  it('getXYByRelativePlacement', () => {
    expect(getXYByRelativePlacement(bbox, [0.5, 0.5])).toEqual([50, 50]);
    expect(getXYByRelativePlacement(bbox, [0, 0])).toEqual([0, 0]);
    expect(getXYByRelativePlacement(bbox, [1, 1])).toEqual([100, 100]);
    expect(getXYByRelativePlacement(bbox, [0.2, 0.2])).toEqual([20, 20]);
  });

  it('getXYByPlacement', () => {
    expect(getXYByPlacement(bbox, 'center')).toEqual([50, 50]);
    expect(getXYByPlacement(bbox, 'left')).toEqual([0, 50]);
    expect(getXYByPlacement(bbox, 'right')).toEqual([100, 50]);
    expect(getXYByPlacement(bbox, 'top')).toEqual([50, 0]);
    expect(getXYByPlacement(bbox, 'bottom')).toEqual([50, 100]);
  });

  it('getXYByAnchor', () => {
    expect(getXYByAnchor(bbox, '0.5 0.5')).toEqual([50, 50]);
    expect(getXYByAnchor(bbox, '0 0')).toEqual([0, 0]);
    expect(getXYByAnchor(bbox, '1 1')).toEqual([100, 100]);
    expect(getXYByAnchor(bbox, '0.2 0.2')).toEqual([20, 20]);
    expect(getXYByAnchor(bbox, [0.5, 0.5])).toEqual([50, 50]);
    expect(getXYByAnchor(bbox, [0, 0])).toEqual([0, 0]);
    expect(getXYByAnchor(bbox, [1, 1])).toEqual([100, 100]);
    expect(getXYByAnchor(bbox, [0.2, 0.2])).toEqual([20, 20]);
  });

  it('positionOf', () => {
    expect(positionOf({ id: 'node' })).toEqual([0, 0, 0]);
    expect(positionOf({ id: 'node', style: { x: 10 } })).toEqual([10, 0, 0]);
    expect(positionOf({ id: 'node', style: { x: 10, y: 20 } })).toEqual([10, 20, 0]);
    expect(positionOf({ id: 'node', style: { x: 10, y: 20, z: 30 } })).toEqual([10, 20, 30]);
  });

  it('hasPosition', () => {
    expect(hasPosition({ id: 'node' })).toBeFalsy();
    expect(hasPosition({ id: 'node', style: { x: 10 } })).toBeTruthy();
    expect(hasPosition({ id: 'node', style: { y: 20 } })).toBeTruthy();
    expect(hasPosition({ id: 'node', style: { z: 30 } })).toBeTruthy();
    expect(hasPosition({ id: 'node', style: { x: 10, y: 20, z: 30 } })).toBeTruthy();
  });
});
