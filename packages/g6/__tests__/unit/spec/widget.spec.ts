import type { WidgetOptions } from '@/src';

describe('spec widget', () => {
  it('widget', () => {
    const widget: WidgetOptions = ['minimap', { type: 'unset', key: '1' }];

    expect(widget).toBeTruthy();
  });
});
