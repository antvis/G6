import {
  getBBoxCrossPointsByPoint,
  getBBoxFromPoint,
  getBBoxFromPoints,
  getBBoxHeight,
  getBBoxPoints,
  getBBoxWidth,
  getBBoxXCrossPoints,
  getBBoxYCrossPoints,
  getExpandedBBox,
  isBBoxInBBox,
  isPointInBBox,
  isPointOutsideBBox,
  mergeBBox,
} from '../../../src/utils/bbox';

describe('bbox', () => {
  const bbox = getBBoxFromPoints([
    { x: 1, y: 1 },
    { x: 3, y: 3 },
  ]);

  it('getBBoxWidth & getBBoxHeight', () => {
    expect(getBBoxWidth(bbox)).toBe(2);
    expect(getBBoxHeight(bbox)).toBe(2);
  });

  it('getBBoxFromPoint', () => {
    const bbox = getBBoxFromPoint({ x: 1, y: 1 });
    expect(getBBoxWidth(bbox)).toBe(0);
    expect(getBBoxHeight(bbox)).toBe(0);
  });

  it('getExpandedBBox', () => {
    expect(getExpandedBBox(bbox, 0).min).toEqual([1, 1, 0]);
    expect(getExpandedBBox(bbox, 1).min).toEqual([0, 0, 0]);
    expect(getExpandedBBox(bbox, 1).max).toEqual([4, 4, 0]);
  });

  it('getBBoxPoints', () => {
    expect(getBBoxPoints(bbox)).toEqual([
      { x: 1, y: 1 },
      { x: 3, y: 1 },
      { x: 3, y: 3 },
      { x: 1, y: 3 },
    ]);
  });

  it('mergeBBox', () => {
    const bbox2 = getBBoxFromPoints([
      { x: 2, y: 2 },
      { x: 4, y: 4 },
    ]);

    const merge = mergeBBox(bbox, bbox2);

    expect(merge.min).toEqual([1, 1, 0]);
    expect(merge.max).toEqual([4, 4, 0]);
  });

  it('isBBoxInBBox', () => {
    const bbox1 = getBBoxFromPoints([
      { x: 2, y: 2 },
      { x: 4, y: 4 },
    ]);

    const bbox2 = getBBoxFromPoints([
      { x: 1.5, y: 2.5 },
      { x: 1.5, y: 2.5 },
    ]);

    expect(isBBoxInBBox(bbox1, bbox)).toEqual(false);
    expect(isBBoxInBBox(bbox2, bbox)).toEqual(true);
  });

  it('isPointOutsideBBox', () => {
    expect(isPointOutsideBBox({ x: 2, y: 2 }, bbox)).toEqual(false);
    expect(isPointOutsideBBox({ x: 4, y: 4 }, bbox)).toEqual(true);
  });

  it('isPointInBBox', () => {
    expect(isPointInBBox({ x: 2, y: 2 }, bbox)).toEqual(true);
    expect(isPointInBBox({ x: 4, y: 4 }, bbox)).toEqual(false);
  });

  it('getBBoxXCrossPoints', () => {
    expect(getBBoxXCrossPoints(bbox, 0)).toEqual([]);
    expect(getBBoxXCrossPoints(bbox, 2)).toEqual([
      { x: 2, y: 1 },
      { x: 2, y: 3 },
    ]);
  });

  it('getBBoxYCrossPoints', () => {
    expect(getBBoxYCrossPoints(bbox, 0)).toEqual([]);
    expect(getBBoxYCrossPoints(bbox, 2)).toEqual([
      { x: 1, y: 2 },
      { x: 3, y: 2 },
    ]);
  });

  it('getBBoxCrossPointsByPoint', () => {
    expect(getBBoxCrossPointsByPoint(bbox, { x: 0, y: 0 })).toEqual([]);
    expect(getBBoxCrossPointsByPoint(bbox, { x: 2, y: 2 })).toEqual([
      { x: 2, y: 1 },
      { x: 2, y: 3 },
      { x: 1, y: 2 },
      { x: 3, y: 2 },
    ]);
  });
});
