import { pluginContextMenu } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('plugin contextmenu', () => {
  it('contextmenu', async () => {
    const graph = await createDemoGraph(pluginContextMenu);
    const container = graph.getCanvas().getContainer()!;

    const el = container.querySelector('.g6-contextmenu') as HTMLDivElement;

    expect(graph.getPlugins().length).toBe(1);
    // @ts-expect-error ignore
    expect(graph.getPlugins()[0].trigger).toBe('contextmenu');

    expect(el.querySelector('.g6-contextmenu-li')).toBeFalsy();

    await graph.destroy();
    expect(container.querySelector('.g6-contextmenu')).toBeFalsy();
  });
});
