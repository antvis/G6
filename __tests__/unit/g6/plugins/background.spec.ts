import { pluginBackground } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('plugin background', () => {
  it('background', async () => {
    const graph = await createDemoGraph(pluginBackground);
    const container = graph.getCanvas().getContainer()!;

    const el = container.querySelector('.g6-background') as HTMLDivElement;

    expect(graph.getPlugins()).toEqual([
      {
        type: 'background',
        key: 'background',
        backgroundImage:
          'url(https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*0Qq0ToQm1rEAAAAAAAAAAAAADmJ7AQ/original)',
      },
    ]);
    expect(el.style.backgroundImage).toContain(
      'url(https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*0Qq0ToQm1rEAAAAAAAAAAAAADmJ7AQ/original)',
    );

    await graph.destroy();
    expect(container.querySelector('.g6-background')).toBeFalsy();
  });
});
