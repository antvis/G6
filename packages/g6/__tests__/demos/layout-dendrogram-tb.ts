import data from '@@/dataset/algorithm-category.json';
import { Graph, treeToGraphData } from '@antv/g6';

export const layoutDendrogramTb: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoFit: 'view',
    data: treeToGraphData(data),
    node: {
      style: (d) => {
        const isLeafNode = !d.children?.length;
        const style = {
          labelText: d.id,
          labelPlacement: 'right',
          labelOffsetX: 2,
          labelBackground: true,
          ports: [{ placement: 'top' }, { placement: 'bottom' }],
        };
        if (isLeafNode) {
          Object.assign(style, {
            labelTransform: [
              ['rotate', 90],
              ['translate', 18],
            ],
            labelBaseline: 'center',
            labelTextAlign: 'left',
          });
        }
        return style;
      },
      animation: {
        enter: false,
      },
    },
    edge: {
      type: 'cubic-vertical',
    },
    layout: {
      type: 'dendrogram',
      direction: 'TB',
      nodeSep: 40,
      rankSep: 100,
      preLayout: true,
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'collapse-expand'],
  });

  await graph.render();

  return graph;
};
