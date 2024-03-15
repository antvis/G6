import type { G6Spec, NodeData } from '@/src';
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
      getId: function getId(d: NodeData) {
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
      getWidth: function getWidth(d: NodeData) {
        return d.id.toString().length + 20;
      },
    },
    node: {
      style: {
        size: 20,
        labelText: (data) => data.id,
        labelMaxWidth: 250,
        labelPlacement: 'right',
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
