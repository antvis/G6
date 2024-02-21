import type { G6Spec } from '../../../src';
import { treeToGraphData } from '../../../src';
import tree from '../../dataset/algorithm-category.json';
import { createGraph } from '../../mock';
import type { StaticTestCase } from '../types';

export const controllerLayoutMindmap: StaticTestCase = async ({ canvas, animation }) => {
  const options: G6Spec = {
    animation,
    data: treeToGraphData(tree),
    theme: 'light',
    layout: {
      type: 'mindmap',
      direction: 'H',
      animation,
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
    node: { style: { width: 20, height: 20 } },
    edge: {
      style: {
        type: 'polyline',
      },
    },
    zoom: 0.4,
  };

  const graph = createGraph(options, canvas);

  await graph.render();

  await graph.translateTo([350, 0]);
};
