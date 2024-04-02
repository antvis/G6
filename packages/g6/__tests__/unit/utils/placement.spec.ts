import { parsePlacement } from '@/src/utils/placement';

describe('placement', () => {
  it('parsePlacement', () => {
    expect(parsePlacement('top')).toEqual([0.5, 0]);
    expect(parsePlacement('bottom')).toEqual([0.5, 1]);
    expect(parsePlacement('left')).toEqual([0, 0.5]);
    expect(parsePlacement('right')).toEqual([1, 0.5]);
    expect(parsePlacement('left-top')).toEqual([0, 0]);
    expect(parsePlacement('left-bottom')).toEqual([0, 1]);
    expect(parsePlacement('right-top')).toEqual([1, 0]);
    expect(parsePlacement('right-bottom')).toEqual([1, 1]);
    expect(parsePlacement('top-left')).toEqual([0, 0]);
    expect(parsePlacement('top-right')).toEqual([1, 0]);
    expect(parsePlacement('bottom-left')).toEqual([0, 1]);
    expect(parsePlacement('bottom-right')).toEqual([1, 1]);
    expect(parsePlacement('center')).toEqual([0.5, 0.5]);
    expect(parsePlacement([0.5, 0.5])).toEqual([0.5, 0.5]);
    expect(parsePlacement([0.5, 0])).toEqual([0.5, 0]);
    expect(parsePlacement([0.5, 0])).toEqual([0.5, 0]);
    expect(parsePlacement([0.5, 1.2])).toEqual([0.5, 0.5]);
  });
});
