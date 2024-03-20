import type { Graph } from '@/src';
import { pluginTooltip } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('plugin tooltip', () => {
  let graph: Graph;
  let tooltipElement: HTMLCollectionOf<HTMLElement>;

  beforeAll(async () => {
    graph = await createDemoGraph(pluginTooltip, { animation: false });
    tooltipElement = graph
      .getCanvas()
      .getContainer()!
      .getElementsByClassName('tooltip')! as HTMLCollectionOf<HTMLElement>;
  });

  it('default status', () => {
    expect(graph.getPlugins().filter((item: any) => item.type === 'tooltip').length).toEqual(1);
    expect(tooltipElement.length).toBe(1);
  });

  it('update tooltip', () => {
    graph.setPlugins((plugins) =>
      plugins.map((plugin) => {
        if (typeof plugin === 'object') {
          return {
            ...plugin,
            trigger: 'click',
          };
        }
        return plugin;
      }),
    );

    expect(graph.getPlugins().filter((item: any) => item.trigger === 'click').length).toEqual(1);
  });
});
