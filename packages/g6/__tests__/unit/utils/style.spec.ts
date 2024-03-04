import { computeElementCallbackStyle } from '@/src/utils/style';

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

    const computedStyle = computeElementCallbackStyle(style, { datum, index: 0, elementData: [datum] });

    expect(computedStyle).toEqual({
      stroke: 'blue',
      size: 50,
      fill: 'red',
    });
  });
});
