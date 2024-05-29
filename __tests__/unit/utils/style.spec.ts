import { computeElementCallbackStyle, zIndexOf } from '@g6/utils/style';

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

    const computedStyle = computeElementCallbackStyle(style, { datum });

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

    expect(computeElementCallbackStyle(style1, { datum })).toEqual({
      fill: 'red',
    });
  });

  it('zIndexOf', () => {
    expect(zIndexOf({ id: 'node-1' })).toBe(0);
    expect(zIndexOf({ id: 'node-1', style: {} })).toBe(0);
    expect(zIndexOf({ id: 'node-1', style: { zIndex: 1 } })).toBe(1);
    expect(zIndexOf({ id: 'node-1', style: { zIndex: -1 } })).toBe(-1);
  });
});
