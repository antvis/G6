import { pluginToolbarBuildin } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';
import { get } from '@antv/util';

describe('plugin toolbar', () => {
  it('toolbar', async () => {
    const graph = await createDemoGraph(pluginToolbarBuildin);
    const container = graph.getCanvas().getContainer()!;

    const el = container.querySelector('.g6-toolbar') as HTMLDivElement;

    expect(graph.getPlugins().length).toBe(1);
    expect(get(graph.getPlugins(), [0, 'position'])).toBe('top-left');

    expect(el.querySelectorAll('.g6-toolbar-item').length).toBe(9);

    await graph.destroy();
    expect(container.querySelector('.g6-toolbar-item')).toBeFalsy();
  });
});
