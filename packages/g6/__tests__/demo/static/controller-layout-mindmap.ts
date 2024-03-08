import type { G6Spec } from '@/src';
import { Graph, Utils } from '@/src';
import tree from '@@/dataset/algorithm-category.json';
import type { STDTestCase } from '../types';

export const controllerLayoutMindmap: STDTestCase = async (context) => {
  const options: G6Spec = {
    ...context,
    x: 350,
    y: 100,
    zoom: 0.4,
    data: Utils.treeToGraphData(tree),
    theme: 'light',
    layout: {
      type: 'mindmap',
      direction: 'H',
      getHeight: () => {
        return 16;
      },
      getWidth: () => {
        return 16;
      },
      getVGap: () => {
        return 10;
      },
      getHGap: () => {
        return 100;
      },
      getSide: undefined,
    },
    node: { style: { size: 20 } },
    edge: {
      style: {
        type: 'polyline',
      },
    },
  };

  const graph = new Graph(options);

  await graph.render();

  return graph;
};
