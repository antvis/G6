import type { G6Spec } from '@/src';
import { Graph, treeToGraphData } from '@/src';
import tree from '@@/dataset/file-system.json';
import type { STDTestCase } from '../types';

export const controllerLayoutIndented: STDTestCase = async (context) => {
  const options: G6Spec = {
    ...context,
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
      style: {
        type: 'polyline',
      },
    },
    zoom: 0.5,
  };

  const graph = new Graph(options);

  await graph.render();

  await graph.translateTo([0, -200]);

  return graph;
};
