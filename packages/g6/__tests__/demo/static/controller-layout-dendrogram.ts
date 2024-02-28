import type { G6Spec } from '@/src';
import { Graph, treeToGraphData } from '@/src';
import tree from '@@/dataset/algorithm-category.json';
import type { STDTestCase } from '../types';

export const controllerLayoutDendrogram: STDTestCase = async (context) => {
  const options: G6Spec = {
    ...context,
    data: treeToGraphData(tree),
    theme: 'light',
    layout: {
      type: 'dendrogram',
      direction: 'LR',
      nodeSep: 36,
      rankSep: 250,
    },
    node: {
      style: {
        size: 20,
        labelText: (data: any) => data.id,
        labelPosition: 'right',
        labelMaxWidth: 200,
      },
    },
    edge: {
      style: {
        type: 'cubic-horizontal',
      },
    },
    zoom: 0.5,
  };

  const graph = new Graph(options);

  await graph.render();

  await graph.translateTo([-200, 350]);

  return graph;
};
