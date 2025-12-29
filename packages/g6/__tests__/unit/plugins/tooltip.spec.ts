import type { Tooltip } from '@/src';
import { pluginTooltipAsync, pluginTooltipEnable } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('plugin tooltip', () => {
  it('enable', async () => {
    const graph = await createDemoGraph(pluginTooltipEnable);
    const container = graph.getCanvas().getContainer()!;
    const el = container.querySelector('.tooltip') as HTMLDivElement;
    const plugin = graph.getPluginInstance<Tooltip>('tooltip');

    await plugin.showById('node3');
    expect(el.style.visibility).toBe('hidden');

    await plugin.showById('node1');
    expect(el.style.visibility).toBe('visible');

    graph.destroy();
  });

  it('get content null', async () => {
    const graph = await createDemoGraph(pluginTooltipEnable);
    const container = graph.getCanvas().getContainer()!;
    const el = container.querySelector('.tooltip') as HTMLDivElement;
    const plugin = graph.getPluginInstance<Tooltip>('tooltip');

    await plugin.showById('node2');
    expect(el.style.visibility).toBe('hidden');

    graph.destroy();
  });

  it('get content async', async () => {
    const graph = await createDemoGraph(pluginTooltipAsync);
    const container = graph.getCanvas().getContainer()!;
    const el = container.querySelector('.tooltip') as HTMLDivElement;
    const plugin = graph.getPluginInstance<Tooltip>('tooltip');

    await plugin.showById('node1');
    expect(el.style.visibility).toBe('visible');
    expect(el.innerHTML).toBe('get content async test');

    graph.destroy();
  });
});
