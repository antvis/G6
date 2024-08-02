import type { Graph } from '@/src';
import { pluginGridLine } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('plugin grid line', () => {
  let graph: Graph;
  let gridLineElement: HTMLCollectionOf<HTMLElement>;

  beforeAll(async () => {
    graph = await createDemoGraph(pluginGridLine, { animation: false });
    gridLineElement = graph
      .getCanvas()
      .getContainer()!
      .getElementsByClassName('g6-grid-line')! as HTMLCollectionOf<HTMLElement>;
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default status', () => {
    expect(graph.getPlugins()).toEqual([{ type: 'grid-line', follow: false }]);
    expect(gridLineElement.length).toBe(1);
    expect(gridLineElement[0].style.backgroundSize).toBe('20px 20px');
  });

  it('update grid line', () => {
    graph.setPlugins((plugins) =>
      plugins.map((plugin) => {
        if (typeof plugin === 'object') {
          return {
            ...plugin,
            follow: true,
            size: 30,
          };
        }
        return plugin;
      }),
    );

    expect(graph.getPlugins()).toEqual([{ type: 'grid-line', follow: true, size: 30 }]);
    expect(gridLineElement[0].style.backgroundSize).toBe('30px 30px');
  });

  it('drag', () => {
    graph.emit('aftertransform', { data: { translate: [10, 10] } });
    expect(gridLineElement[0].style.backgroundPosition).toBe('10px 10px');
  });
});
