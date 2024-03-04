import type { PluginOptions } from '@/src';

describe('spec plugin', () => {
  it('plugin', () => {
    const plugin: PluginOptions = ['minimap', { type: 'unset', key: '1' }];

    expect(plugin).toBeTruthy();
  });
});
