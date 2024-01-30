import { initLabelPositionStyle } from '../../../src/utils/edge';

describe('edge', () => {
  it('initLabelPositionStyle', () => {
    expect(initLabelPositionStyle('start')).toEqual({
      textAlign: 'left',
      offsetX: 4,
      offsetY: 4,
    });
    expect(initLabelPositionStyle('center', 10, 10)).toEqual({
      textAlign: 'center',
      offsetX: 10,
      offsetY: 10,
    });
    expect(initLabelPositionStyle('end')).toEqual({
      textAlign: 'right',
      offsetX: 4,
      offsetY: 4,
    });
  });
});
