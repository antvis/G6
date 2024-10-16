import { Graph, treeToGraphData } from '@antv/g6';


fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: treeToGraphData(data),
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      node: {
        style: {
          labelText: d => d.id,
          labelBackground: true,
        },
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'dendrogram',
        radial: true,
        nodeSep: 40,
        rankSep: 140,
      },
    });

    graph.render();
  });
