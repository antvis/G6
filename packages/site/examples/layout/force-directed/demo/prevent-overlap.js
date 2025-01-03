import { Graph } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const nodes = data.nodes;
    // randomize the node size
    nodes.forEach((node) => {
      node.size = Math.random() * 30 + 5;
    });

    const graph = new Graph({
      container: 'container',
      autoFit: 'center',
      data,
      node: {
        style: {
          size: (d) => d.size,
          lineWidth: 1,
        },
      },
      layout: {
        type: 'd3-force',
        collide: {
          // Prevent nodes from overlapping by specifying a collision radius for each node.
          radius: (d) => d.size / 2,
        },
      },
      behaviors: ['drag-element-force'],
    });

    graph.render();
  });
