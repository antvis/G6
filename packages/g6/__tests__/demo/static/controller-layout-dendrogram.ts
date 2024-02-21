import type { G6Spec } from '../../../src';
import { treeToGraphData } from '../../../src';
import tree from '../../dataset/algorithm-category.json';
import { createGraph } from '../../mock';
import type { StaticTestCase } from '../types';

export const controllerLayoutDendrogram: StaticTestCase = async ({ canvas, animation }) => {
  const options: G6Spec = {
    animation,
    data: treeToGraphData(tree),
    theme: 'light',
    layout: {
      type: 'dendrogram',
      direction: 'LR',
      nodeSep: 36,
      rankSep: 250,
      animation,
    },
    node: {
      style: { width: 20, height: 20, labelText: (data) => data.id, labelPosition: 'right', labelMaxWidth: 200 },
    },
    edge: {
      style: {
        type: 'polyline',
      },
    },
    zoom: 0.5,
  };

  const graph = createGraph(options, canvas);

  await graph.render();

  await graph.translateTo([-200, 350]);
};
