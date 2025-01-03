import { Graph, treeToGraphData } from '@antv/g6';

const getNodeSide = (graph, datum) => {
  const parentData = graph.getParentData(datum.id, 'tree');
  if (!parentData) return 'center';
  return datum.style.x > parentData.style.x ? 'right' : 'left';
};

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
          labelBackground: true,
          labelPlacement: function (d) {
            const side = getNodeSide(this, d);
            return side === 'center' ? 'right' : side;
          },
          ports: [{ placement: 'right' }, { placement: 'left' }],
        },
        animation: {
          enter: false,
        },
      },
      edge: {
        type: 'cubic-horizontal',
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'mindmap',
        direction: 'H',
        preLayout: false,
        getHeight: () => 32,
        getWidth: () => 32,
        getVGap: () => 4,
        getHGap: () => 64,
        getSide: (d) => {
          if (d.id === 'Classification') {
            return 'left';
          }
          return 'right';
        },
      },
      behaviors: ['collapse-expand', 'drag-canvas', 'zoom-canvas'],
    });

    graph.render();
  });
