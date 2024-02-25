import type { EdgeOptions } from '@/src';

describe('spec element edge', () => {
  it('edge 1', () => {
    const edge: EdgeOptions = {
      style: {
        edgeStyle: (model: any) => model.style?.edgeStyle || 'white',
      },
      state: {
        state1: {
          edgeStyle: 'red',
        },
      },
      animation: {
        enter: 'fade',
        show: 'fade',
      },
      palette: {
        type: 'group',
        color: 'my-palette',
        invert: true,
      },
    };

    expect(edge).toBeTruthy();
  });

  it('edge 2', () => {
    const edge: EdgeOptions = {
      style: {
        opacity: (data) => data.style?.opacity || 1,
      },
      state: {
        activate: {
          opacity: 1,
        },
      },
      animation: {
        enter: [
          {
            fields: ['lineWidth'],
            shape: 'keyShape',
            duration: 1000,
          },
        ],
      },
      palette: {
        type: 'group',
        color: 'my-palette',
        invert: true,
      },
    };

    expect(edge).toBeTruthy();
  });
});
