import { computeElementCallbackStyle, getSubShapeStyle, mergeOptions } from '@/src/utils/style';

describe('style', () => {
  it('computeElementCallbackStyle', () => {
    const datum = {
      id: 'node-1',
      data: {
        value: 100,
      },
      type: 'A',
      style: {
        fill: 'pink',
        lineWidth: 5,
      },
    };

    const style = {
      stroke: 'blue',
      size: (data: any) => data.data.value / 2,
      fill: (data: any) => (data.data.type === 'B' ? 'green' : 'red'),
    };

    const computedStyle = computeElementCallbackStyle(style, { datum, graph: {} as any });

    expect(computedStyle).toEqual({
      stroke: 'blue',
      size: 50,
      fill: 'red',
    });

    const style1 = (data: any) => {
      return {
        fill: data.data.type === 'B' ? 'green' : 'red',
      };
    };

    expect(computeElementCallbackStyle(style1, { datum, graph: {} as any })).toEqual({
      fill: 'red',
    });
  });

  it('mergeOptions', () => {
    expect(
      mergeOptions(
        { style: { a: 1, b: [1, 2], c: { d: 1 } }, id: '1' },
        { style: { a: 2, b: [2, 3], c: { f: 1 } }, id: '2' },
      ),
    ).toEqual({ style: { a: 2, b: [2, 3], c: { f: 1 } }, id: '2' });
  });

  it('getSubShapeStyle', () => {
    const style = {
      x: 100,
      y: 100,
      class: 'node',
      transform: [['translate', 100, 100]],
      zIndex: 100,
      fill: 'pink',
    };
    expect(getSubShapeStyle(style)).toEqual({ fill: 'pink' });
  });
});
