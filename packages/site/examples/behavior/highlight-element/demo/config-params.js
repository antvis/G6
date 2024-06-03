import { Graph } from '@antv/g6';

const format = (data) => {
  const { nodes, edges } = data;
  return {
    nodes: nodes.map(({ id, ...node }) => ({ id, data: node })),
    edges: edges.map(({ id, source, target, ...edge }) => ({ id, source, target, data: edge })),
  };
};

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/xiaomi.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: format(data),
      node: {
        style: { size: 30 },
        state: {
          highlight: {
            fill: '#D580FF',
            halo: true,
            lineWidth: 0,
          },
          dim: {
            fill: '#99ADD1',
          },
        },
      },
      edge: {
        state: {
          highlight: {
            stroke: '#D580FF',
          },
        },
      },
      behaviors: [
        {
          type: 'hover-activate',
          enable: (event) => event.targetType === 'node',
          degree: 1, // 👈🏻 Activate relations.
          state: 'highlight',
          inactiveState: 'dim',
          onHover: (event) => {
            event.view.setCursor('pointer');
          },
          onHoverEnd: (event) => {
            event.view.setCursor('default');
          },
        },
      ],
      layout: {
        type: 'force',
        preventOverlap: true,
        nodeSize: 24,
      },
      animation: false,
    });

    graph.render();
  });
