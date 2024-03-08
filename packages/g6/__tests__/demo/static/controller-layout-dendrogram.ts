import type { G6Spec } from '@/src';
import { Graph, treeToGraphData } from '@/src';
import tree from '@@/dataset/algorithm-category.json';
import type { STDTestCase } from '../types';

export const controllerLayoutDendrogram: STDTestCase = async (context) => {
  const options: G6Spec = {
    ...context,
    x: -200,
    y: 350,
    zoom: 0.5,
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
        labelPlacement: 'right',
        labelMaxWidth: 200,
      },
    },
    edge: {
      style: {
        type: 'cubic-horizontal',
      },
    },
  };

  const graph = new Graph(options);

  await graph.render();

  return graph;
};
