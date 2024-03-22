import { pluginTooltip } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('plugin tooltip', () => {
  it('node', async () => {
    const graph = await createDemoGraph(pluginTooltip);
    graph.emit('node:click', { targetType: 'node', target: { id: '6' } });
    await expect(graph).toMatchSnapshot(__filename, 'node');
    graph.destroy();
  });

  it.skip('combo', async () => {
    const graph = await createDemoGraph(pluginTooltip);
    graph.emit('combo:click', { targetType: 'combo', target: { id: 'a' } });
    await expect(graph).toMatchSnapshot(__filename, 'combo');
    graph.destroy();
  });

  it('edge', async () => {
    const graph = await createDemoGraph(pluginTooltip);
    graph.emit('edge:click', { targetType: 'edge', target: { id: 'edge-444' } });
    await expect(graph).toMatchSnapshot(__filename, 'edge');
    graph.destroy();
  });

  it('update trigger to hover', async () => {
    const graph = await createDemoGraph(pluginTooltip);
    graph.setPlugins((plugins) =>
      plugins.map((plugin) => {
        if (typeof plugin === 'object') {
          return {
            ...plugin,
            trigger: 'hover',
          };
        }
        return plugin;
      }),
    );
    graph.emit('node:pointerenter', { targetType: 'node', target: { id: '6' } });
    await expect(graph).toMatchSnapshot(__filename, 'hover');
    graph.destroy();
  });

  it('show tooltip by id', async () => {
    const graph = await createDemoGraph(pluginTooltip);
    // @ts-expect-error
    const tooltip = graph.context.plugin.extensionMap['tooltip'];
    // @ts-expect-error
    tooltip.showTooltipById('6', 'node');
    await expect(graph).toMatchSnapshot(__filename, 'show-tooltip-by-id');
    graph.destroy();
  });
});
