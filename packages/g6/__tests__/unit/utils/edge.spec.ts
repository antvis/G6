import { Line } from '@antv/g';
import { getLabelPositionStyle } from '../../../src/utils/edge';

describe('edge', () => {
  const line = new Line({
    style: {
      x1: 0,
      y1: 100,
      x2: 100,
      y2: 200,
    },
  });

  const revertedLine = new Line({
    style: {
      x1: 100,
      y1: 200,
      x2: 0,
      y2: 100,
    },
  });

  it('getLabelPositionStyle', () => {
    expect(getLabelPositionStyle(line, 'start', false)).toEqual({
      textAlign: 'left',
      x: 4,
      y: 104,
    });
    expect(getLabelPositionStyle(line, 'start', true)).toEqual({
      textAlign: 'left',
      transform: 'rotate(45deg)',
      x: 4.440892098500626e-16,
      y: 105.65685424949238,
    });
    expect(getLabelPositionStyle(line, 'center', false)).toEqual({
      textAlign: 'center',
      x: 54,
      y: 154,
    });
    expect(getLabelPositionStyle(line, 'center', true)).toEqual({
      textAlign: 'center',
      transform: 'rotate(45deg)',
      x: 50,
      y: 155.65685424949237,
    });
    expect(getLabelPositionStyle(line, 'end', false)).toEqual({
      textAlign: 'right',
      x: 103,
      y: 203,
    });
    expect(getLabelPositionStyle(line, 'end', true)).toEqual({
      textAlign: 'right',
      transform: 'rotate(45deg)',
      x: 99,
      y: 204.65685424949237,
    });
    expect(getLabelPositionStyle(line, 0.3, false)).toEqual({
      textAlign: 'center',
      x: 34,
      y: 134,
    });
    expect(getLabelPositionStyle(revertedLine, 'end', true)).toEqual({
      textAlign: 'left',
      transform: 'rotate(45deg)',
      x: -4.65685424949238,
      y: 101,
    });
  });
});
