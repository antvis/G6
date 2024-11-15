import data from '@@/dataset/cluster.json';
import { Graph } from '@antv/g6';

export const pluginLegend: TestCase = async (context) => {
  const { nodes, edges } = data;
  const findCluster = (id: string) => {
    return nodes.find(({ id: node }) => node === id)?.data.cluster;
  };
  const graph = new Graph({
    ...context,
    data: {
      nodes,
      edges: edges.map(({ source, target }) => {
        return {
          source,
          target,
          id: `${source}-${target}`,
          data: {
            cluster: `${findCluster(source)}-${findCluster(target)}`,
          },
        };
      }),
    },
    layout: { type: 'd3-force' },
    behaviors: ['drag-canvas', 'drag-element', 'zoom-canvas'],
    node: {
      type: (item: any) => {
        if (item.data.cluster === 'a') return 'diamond';
        if (item.data.cluster === 'b') return 'rect';
        if (item.data.cluster === 'c') return 'triangle';
        return 'circle';
      },
      style: {
        labelText: (d) => d.id,
        lineWidth: 0,
        fill: (item: any) => {
          if (item.data.cluster === 'a') return 'red';
          if (item.data.cluster === 'b') return 'blue';
          if (item.data.cluster === 'c') return 'green';
          return '#99add1';
        },
      },
    },
    plugins: [
      {
        key: 'legend',
        type: 'legend',
        titleText: 'Cluster Legend',
        nodeField: 'cluster',
        edgeField: 'cluster',
        trigger: 'click',
      },
    ],
  });

  await graph.render();

  pluginLegend.form = (panel) => {
    const config = {
      trigger: 'hover',
    };
    return [
      panel
        .add(config, 'trigger', ['hover', 'click'])
        .name('Change Trigger Method')
        .onChange((trigger: string) => {
          graph.setPlugins((plugins) =>
            plugins.map((plugin) => {
              if (typeof plugin === 'object' && plugin.type === 'legend') return { ...plugin, trigger };
              return plugin;
            }),
          );
        }),
    ];
  };

  return graph;
};
