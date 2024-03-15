import { BehaviorOptions, PluginOptions } from '@/src';
import { parseExtensions } from '@/src/utils/extension';

describe('extension', () => {
  it('parseBehaviors', () => {
    expect(parseExtensions('behavior', [])).toEqual([]);

    const options: BehaviorOptions = [
      'drag-element',
      { type: 'drag-canvas' },
      { type: 'shortcut', key: 'shortcut-zoom-in' },
      { type: 'shortcut', key: 'shortcut-zoom-out' },
      'scroll-canvas',
      'scroll-canvas',
    ];

    expect(parseExtensions('behavior', options)).toEqual([
      { type: 'drag-element', key: 'behavior-drag-element-0' },
      { type: 'drag-canvas', key: 'behavior-drag-canvas-0' },
      { type: 'shortcut', key: 'shortcut-zoom-in' },
      { type: 'shortcut', key: 'shortcut-zoom-out' },
      { type: 'scroll-canvas', key: 'behavior-scroll-canvas-0' },
      { type: 'scroll-canvas', key: 'behavior-scroll-canvas-1' },
    ]);
  });

  it('parsePlugins', () => {
    expect(parseExtensions('plugin', [])).toEqual([]);

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

    expect(parseExtensions('plugin', options)).toEqual([
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
