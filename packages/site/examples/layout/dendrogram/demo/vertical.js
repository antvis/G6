import { Graph, treeToGraphData } from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data: treeToGraphData(data),
      node: {
        style: (data) => {
          const isLeaf = !data.children?.length;
          return {
            labelText: data.id,
            labelWordWrap: true,
            labelWordWrapWidth: 150,
            labelDx: isLeaf ? 20 : 0,
            labelDy: isLeaf ? 0 : 20,
            labelTextAlign: isLeaf ? 'start' : 'center',
            labelTextBaseline: 'middle',
            labelTransform: isLeaf ? 'rotate(90deg)' : '',
            ports: [{ placement: 'bottom' }, { placement: 'top' }],
          };
        },
        animation: {
          enter: false,
        },
      },
      edge: {
        type: 'cubic-vertical',
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'dendrogram',
        direction: 'TB', // H / V / LR / RL / TB / BT
        nodeSep: 40,
        rankSep: 100,
      },
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'collapse-expand'],
    });

    graph.render();
  });
