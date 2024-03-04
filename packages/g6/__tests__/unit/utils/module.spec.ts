import { BehaviorOptions, PluginOptions } from '@/src';
import { parseModules } from '@/src/utils/module';

describe('module', () => {
  it('parse behavior module', () => {
    expect(parseModules('behavior', [])).toEqual([]);

    const options: BehaviorOptions = [
      'drag-node',
      { type: 'drag-canvas' },
      { type: 'shortcut', key: 'shortcut-zoom-in' },
      { type: 'shortcut', key: 'shortcut-zoom-out' },
      'scroll-canvas',
      'scroll-canvas',
    ];

    expect(parseModules('behavior', options)).toEqual([
      { type: 'drag-node', key: 'behavior-drag-node-0' },
      { type: 'drag-canvas', key: 'behavior-drag-canvas-0' },
      { type: 'shortcut', key: 'shortcut-zoom-in' },
      { type: 'shortcut', key: 'shortcut-zoom-out' },
      { type: 'scroll-canvas', key: 'behavior-scroll-canvas-0' },
      { type: 'scroll-canvas', key: 'behavior-scroll-canvas-1' },
    ]);
  });

  it('parseWidgets', () => {
    expect(parseModules('plugin', [])).toEqual([]);

    const options: PluginOptions = [
      'minimap',
      { key: 'my-tooltip', type: 'tooltip' },
      { type: 'tooltip' },
      {
        type: 'menu',
        key: 'my-context-menu',
        trigger: 'contextmenu',
      },
      'minimap',
    ];

    expect(parseModules('plugin', options)).toEqual([
      { type: 'minimap', key: 'plugin-minimap-0' },
      { type: 'tooltip', key: 'my-tooltip' },
      { type: 'tooltip', key: 'plugin-tooltip-0' },
      {
        type: 'menu',
        key: 'my-context-menu',
        trigger: 'contextmenu',
      },
      { type: 'minimap', key: 'plugin-minimap-1' },
    ]);
  });
});
