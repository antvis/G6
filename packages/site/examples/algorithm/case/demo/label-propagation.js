import { labelPropagation } from '@antv/algorithm';
import { Graph } from '@antv/g6';

const colors = [
  '#5F95FF',
  '#61DDAA',
  '#65789B',
  '#F6BD16',
  '#7262FD',
  '#78D3F8',
  '#9661BC',
  '#F6903D',
  '#008685',
  '#F08BB4',
];

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      autoFit: 'view',
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      layout: {
        type: 'force',
        linkDistance: 50,
        animation: false,
      },
    });
    
    graph.render();

    window.addPanel((gui) => {
      gui.add(
        {
          Cluster: () => {
            const clusteredData = labelPropagation(data, false);
            const result = clusteredData.clusters
              .map((cluster, i) => {
                const color = colors[i % colors.length];
                const nodes = cluster.nodes.map((node) => ({
                  id: node.id,
                  style: {
                    fill: color,
                  },
                }));
                return nodes;
              })
              .flat();
            graph.updateNodeData(result);
            graph.draw();
          },
        },
        'Cluster',
      );
    });
  });
