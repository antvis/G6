import { createGraph } from '@@/utils';
import { BasePlugin, register } from '@antv/g6';

describe('getPluginInstance', () => {
  it('getPluginInstance', async () => {
    const fn = jest.fn();

    class CustomPlugin extends BasePlugin<any> {
      // plugin api
      api() {
        fn();
      }
    }

    register('plugin', 'custom', CustomPlugin);
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
});
