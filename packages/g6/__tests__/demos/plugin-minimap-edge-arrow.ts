import { Graph } from '@antv/g6';

export const pluginMiniMapEdgeArrow: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        {
          id: '0',
          name: 'a',
        },
        {
          id: '1',
          name: 'b',
        },
      ],
      edges: [
        {
          id: '0-1',
          source: '0',
          target: '1',
        },
      ],
    },
    node: {
      style: {
        label: true,
        labelText: (node) => {
          return node.id;
        },
      },
    },
    edge: {
      style: {
        endArrow: true,
        label: true,
        labelText: (edge) => {
          return `${edge.source} < ${edge.target}`;
        },
      },
    },
    layout: {
      type: 'force',
      linkDistance: 50,
      clustering: true,
      nodeClusterBy: 'cluster',
      clusterNodeStrength: 70,
    },
    plugins: [
      {
        key: 'minimap',
        type: 'minimap',
        size: [240, 160],
      },
    ],
    behaviors: ['drag-element'],
  });

  await graph.render();

  pluginMiniMapEdgeArrow.form = (gui) => {
    const config = {
      hide: () => {
        const edge = graph.getEdgeData('0-1');
        graph.hideElement(edge.id!);
        // graph.render();
      },
      show: () => {
        const edge = graph.getEdgeData('0-1');
        graph.showElement(edge.id!);
        // graph.render();
      },
    };
    return [gui.add(config, 'hide'), gui.add(config, 'show')];
  };
  return graph;
};
