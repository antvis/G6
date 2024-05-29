import tree from '@@/dataset/file-system.json';
import type { GraphOptions } from '@antv/g6';
import { Graph, treeToGraphData } from '@antv/g6';

export const layoutIndented: TestCase = async (context) => {
  const options: GraphOptions = {
    ...context,
    y: -200,
    zoom: 0.5,
    data: treeToGraphData(tree),
    theme: 'light',
    layout: {
      type: 'indented',
      isHorizontal: true,
      direction: 'LR',
      indent: 30,
      getHeight: function getHeight() {
        return 16;
      },
      getWidth: function getWidth() {
        return 16;
      },
    },
    node: { style: { size: 20 } },
    edge: {
      type: 'polyline',
    },
  };

  const graph = new Graph(options);

  await graph.render();

  return graph;
};
