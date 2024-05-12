import { Graph, treeToGraphData } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: treeToGraphData(data),
      node: {
        style: {
          labelText: (d) => d.id,
          labelPlacement: (model) => (model.children?.length ? 'left' : 'right'),
          ports: [{ placement: 'right' }, { placement: 'left' }],
        },
      },
      edge: {
        type: 'cubic-horizontal',
      },
      layout: {
        type: 'dendrogram',
        direction: 'LR', // H / V / LR / RL / TB / BT
        nodeSep: 36,
        rankSep: 250,
      },
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
    });

    graph.render();
  });
