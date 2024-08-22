import { BasePlugin, ExtensionCategory, register } from '@/src';
import { createGraph } from '@@/utils';

describe('getPluginInstance', () => {
  it('getPluginInstance', async () => {
    const fn = jest.fn();

    class CustomPlugin extends BasePlugin<any> {
      // plugin api
      api() {
        fn();
      }
    }

    register(ExtensionCategory.PLUGIN, 'custom', CustomPlugin);
    const graph = createGraph({
      plugins: [
        {
          key: 'custom-plugin',
          type: 'custom',
        },
      ],
    });

    await graph.draw();

    const plugin = graph.getPluginInstance<CustomPlugin>('custom-plugin');
    expect(plugin instanceof CustomPlugin).toBe(true);
    plugin.api();
    expect(fn).toHaveBeenCalled();

    const undefinedPlugin = graph.getPluginInstance<CustomPlugin>('undefined-plugin');
    expect(undefinedPlugin).toBe(undefined);
  });

  it('getPluginInstance by type', async () => {
    const fn = jest.fn();

    class CustomPlugin extends BasePlugin<any> {
      api() {
        fn();
      }
    }

    register(ExtensionCategory.PLUGIN, 'custom-2', CustomPlugin);
    const graph = createGraph({
      plugins: ['custom-2', 'custom-2'],
    });

    await graph.draw();

    const plugin = graph.getPluginInstance<CustomPlugin>('custom-2');
    expect(plugin instanceof CustomPlugin).toBe(true);
    plugin.api();
    expect(fn).toHaveBeenCalled();
  });
});
