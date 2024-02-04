import { AABB } from '@antv/g';
import {
  getAnchorPosition,
  getStarAnchorByPosition,
  getStarAnchors,
  getStarPoints,
  getTextStyleByPosition,
  getXYByPosition,
} from '../../../src/utils/element';

describe('element', () => {
  const bbox = new AABB();
  bbox.setMinMax([100, 100, 0], [200, 200, 0]);

  it('getXYByPosition', () => {
    expect(getXYByPosition(bbox, 'left')).toEqual([100, 150]);
    expect(getXYByPosition(bbox, 'right')).toEqual([200, 150]);
    expect(getXYByPosition(bbox, 'top')).toEqual([150, 100]);
    expect(getXYByPosition(bbox, 'bottom')).toEqual([150, 200]);

    expect(getXYByPosition(bbox, 'left-top')).toEqual([100, 100]);
    expect(getXYByPosition(bbox, 'right-bottom')).toEqual([200, 200]);

    expect(getXYByPosition(bbox, 'center')).toEqual([150, 150]);

    expect(getXYByPosition(bbox)).toEqual([150, 150]);
  });

  it('getAnchorPosition', () => {
    expect(getAnchorPosition(bbox, 'left')).toEqual([100, 150]);
    expect(getAnchorPosition(bbox, 'right')).toEqual([200, 150]);
    expect(getAnchorPosition(bbox, 'top')).toEqual([150, 100]);
    expect(getAnchorPosition(bbox, 'bottom')).toEqual([150, 200]);

    expect(getAnchorPosition(bbox)).toEqual([150, 150]);

    expect(getAnchorPosition(bbox, [0.5, 1])).toEqual([150, 200]);
    expect(getAnchorPosition(bbox, [0, 0.5])).toEqual([100, 150]);
  });

  it('getTextStyleByPosition', () => {
    expect(getTextStyleByPosition(bbox, 'left')).toEqual({
      x: 100,
      y: 150,
      textAlign: 'right',
      textBaseline: 'middle',
    });
    expect(getTextStyleByPosition(bbox, 'right')).toEqual({
      x: 200,
      y: 150,
      textAlign: 'left',
      textBaseline: 'middle',
    });
    expect(getTextStyleByPosition(bbox, 'top')).toEqual({
      x: 150,
      y: 100,
      textAlign: 'center',
      textBaseline: 'bottom',
    });
    expect(getTextStyleByPosition(bbox, 'bottom')).toEqual({
      x: 150,
      y: 200,
      textAlign: 'center',
      textBaseline: 'top',
    });

    expect(getTextStyleByPosition(bbox, 'left-top')).toEqual({
      x: 100,
      y: 100,
      textAlign: 'right',
      textBaseline: 'bottom',
    });
    expect(getTextStyleByPosition(bbox, 'right-bottom')).toEqual({
      x: 200,
      y: 200,
      textAlign: 'left',
      textBaseline: 'top',
    });

    expect(getTextStyleByPosition(bbox, 'center')).toEqual({
      x: 150,
      y: 150,
      textAlign: 'center',
      textBaseline: 'middle',
    });

    expect(getTextStyleByPosition(bbox)).toEqual({
      x: 150,
      y: 150,
      textAlign: 'center',
      textBaseline: 'middle',
    });
  });

  it('getStarPoints', () => {
    expect(getStarPoints(32, 16).length).toBe(10);
  });

  it('getStarAnchorByPosition + getStarAnchors', () => {
    expect(getStarPoints(32, 16).length).toBe(10);

    expect(getStarAnchorByPosition('top', getStarAnchors(32, 16))).toEqual([0, -32]);
  });
});
