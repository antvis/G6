import { Graph, Utils } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data: Utils.treeToGraphData(data),
      node: {
        style: (model) => {
          const hasChildren = !!model.style!.children?.length;
          return {
            labelText: model.id,
            labelPlacement: hasChildren ? 'right' : 'bottom',
            labelMaxWidth: 200,
            labelTextAlign: 'start',
            transform: hasChildren ? '' : 'rotate(90deg)',
            ports: [
              {
                placement: 'bottom',
              },
              {
                placement: 'top',
              },
            ],
          };
        },
      },

      edge: {
        style: {
          type: 'cubic-vertical',
        },
      },
      layout: {
        type: 'dendrogram',
        direction: 'TB', // H / V / LR / RL / TB / BT
        nodeSep: 40,
        rankSep: 100,
      },
      autoFit: 'view',
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node', 'collapse-expand-tree'],
    });

    graph.render();
  });
