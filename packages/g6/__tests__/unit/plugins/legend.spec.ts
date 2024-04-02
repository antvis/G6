import { Legend } from '@/src/plugins/legend';
import { pluginLegend } from '@@/demos';
import { createDemoGraph } from '@@/utils';

const mockEvent: any = {
  __data__: {
    id: 'node__0',
    index: 0,
    style: {
      layout: 'flex',
      labelText: 'a',
      markerLineWidth: 3,
      marker: 'diamond',
      markerStroke: '#000000',
      markerFill: 'red',
      spacing: 4,
      markerSize: 16,
      labelFontSize: 16,
      markerOpacity: 1,
      labelOpacity: 1,
    },
  },
};

describe('plugin legend', () => {
  it('normal', async () => {
    const graph = await createDemoGraph(pluginLegend);
    await expect(graph).toMatchSnapshot(__filename, 'normal');
    graph.destroy();
  });

  it('click', async () => {
    const graph = await createDemoGraph(pluginLegend);

    const legend = graph.getPluginInstance<Legend>('legend');

    legend.click(mockEvent);
    await expect(graph).toMatchSnapshot(__filename, 'click');
    legend.click(mockEvent);
    await expect(graph).toMatchSnapshot(__filename, 'click-again');
    graph.destroy();
  });

  it('update trigger to hover', async () => {
    const graph = await createDemoGraph(pluginLegend);
    graph.setPlugins((plugins) =>
      plugins.map((plugin) => {
        if (typeof plugin === 'object') {
          return {
            ...plugin,
            trigger: 'hover',
            position: 'top',
          };
        }
        return plugin;
      }),
    );

    const legend = graph.getPluginInstance<Legend>('legend');

    legend.mouseenter(mockEvent);
    await expect(graph).toMatchSnapshot(__filename, 'mouseenter');
    legend.mouseleave(mockEvent);
    await expect(graph).toMatchSnapshot(__filename, 'mouseleave');
    graph.destroy();
  });
});
