import { pluginToolbarBuildIn } from '@@/demos';
import { createDemoGraph } from '@@/utils';
import { get } from '@antv/util';

describe('plugin toolbar', () => {
  it('toolbar', async () => {
    const graph = await createDemoGraph(pluginToolbarBuildIn);
    const container = graph.getCanvas().getContainer()!;

    const el = container.querySelector('.g6-toolbar') as HTMLDivElement;

    expect(graph.getPlugins().length).toBe(1);
    expect(get(graph.getPlugins(), [0, 'position'])).toBe('top-left');

    expect(el.querySelectorAll('.g6-toolbar-item').length).toBe(9);

    graph.destroy();
    expect(container.querySelector('.g6-toolbar-item')).toBeFalsy();
  });
});
