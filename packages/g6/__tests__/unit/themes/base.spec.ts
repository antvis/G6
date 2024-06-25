import { create } from '@/src/themes/base';

describe('base', () => {
  it('create', () => {
    expect(
      create({
        bgColor: '#ffffff',
        comboColor: '#99ADD1',
        comboColorDisabled: '#f0f0f0',
        comboStroke: '#99add1',
        comboStrokeDisabled: '#d9d9d9',
        edgeColor: '#99add1',
        edgeColorDisabled: '#d9d9d9',
        edgeColorInactive: '#1B324F',
        nodeColor: '#1783ff',
        nodeColorDisabled: '#1B324F',
        nodeStroke: '#000000',
        textColor: '#000000',
      }),
    ).toBeTruthy();
  });
});
