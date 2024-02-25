import type { ComboOptions } from '@/src';

describe('spec element combo', () => {
  it('combo 1', () => {
    const combo: ComboOptions = {
      style: {
        comboStyle: (model: any) => model.style?.comboStyle || 'white',
      },
      state: {
        state1: {
          comboStyle: 'red',
        },
      },
      animation: {
        enter: 'fade',
        show: 'fade',
      },
    };

    expect(combo).toBeTruthy();
  });

  it('combo 2', () => {
    const combo: ComboOptions = {
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
    };

    expect(combo).toBeTruthy();
  });
});
