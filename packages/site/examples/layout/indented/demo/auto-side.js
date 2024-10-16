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
      data: treeToGraphData(data),
      autoFit: 'view',
      node: {
        style: function (d) {
          const side = getNodeSide(this, d);
          return {
            labelText: d.id,
            labelPlacement: side === 'center' ? 'bottom' : side,
            labelBackground: true,
            ports: side === 'center' ? [{ placement: 'bottom' }] : side === 'right' ? [{ placement: 'bottom' }, { placement: 'left' }] : [{ placement: 'bottom' }, { placement: 'right' }]
          }
        },
        animation: {
          enter: false,
        },
      },
      edge: {
        type: 'polyline',
        style: {
          radius: 4,
          router: {
            type: 'orth'
          }
        },
        animation: {
          enter: false,
        },
      },
      layout: {
        type: 'indented',
        direction: 'H',
        indent: 80,
        getHeight: () => 16,
        getWidth: () => 32,
      },
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'collapse-expand'],
    });

    graph.render();
  });
