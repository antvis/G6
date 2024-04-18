import type { G6Spec } from '@/src';
import { Graph, Utils } from '@/src';
import tree from '@@/dataset/file-system.json';

export const layoutIndented: TestCase = async (context) => {
  const options: G6Spec = {
    ...context,
    y: -200,
    zoom: 0.5,
    data: Utils.treeToGraphData(tree),
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
