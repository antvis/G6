import { Graph, Utils } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data: Utils.treeToGraphData(data),
      node: {
        style: {
          labelText: (d) => d.id,
          labelPlacement: (model) => (model.style!.children?.length ? 'left' : 'right'),
          ports: [
            {
              placement: 'right',
            },
            {
              placement: 'left',
            },
          ],
        },
      },

      edge: {
        style: {
          type: 'cubic-horizontal',
        },
      },
      layout: {
        type: 'dendrogram',
        direction: 'LR', // H / V / LR / RL / TB / BT
        nodeSep: 36,
        rankSep: 250,
      },
      autoFit: 'view',
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node', 'collapse-expand-tree'],
    });

    graph.render();
  });
