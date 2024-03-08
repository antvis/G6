import type { G6Spec } from '@/src';
import { Graph, Utils } from '@/src';
import tree from '@@/dataset/algorithm-category.json';
import type { STDTestCase } from '../types';

export const controllerLayoutCompactBox: STDTestCase = async (context) => {
  const options: G6Spec = {
    ...context,
    x: 50,
    y: 300,
    zoom: 0.5,
    data: Utils.treeToGraphData(tree),
    theme: 'light',
    layout: {
      type: 'compact-box',
      direction: 'LR',
      getId: function getId(d: any) {
        return d.id;
      },
      getHeight: function getHeight() {
        return 16;
      },
      getVGap: function getVGap() {
        return 10;
      },
      getHGap: function getHGap() {
        return 100;
      },
      getWidth: function getWidth(d: any) {
        return d.id.length + 20;
      },
    },
    node: {
      style: {
        size: 20,
        labelText: (data: any) => data.id,
        labelMaxWidth: 250,
        labelPosition: 'right',
        labelOffsetX: 10,
      },
    },
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
