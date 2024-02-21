import type { G6Spec } from '../../../src';
import { treeToGraphData } from '../../../src';
import tree from '../../dataset/algorithm-category.json';
import { createGraph } from '../../mock';
import type { StaticTestCase } from '../types';

export const controllerLayoutCompactBox: StaticTestCase = async ({ canvas, animation }) => {
  const options: G6Spec = {
    animation,
    data: treeToGraphData(tree),
    theme: 'light',
    zoom: 0.5,
    layout: {
      type: 'compact-box',
      animation,
      direction: 'LR',
      getId: function getId(d) {
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
      getWidth: function getWidth(d) {
        return d.id.length + 20;
      },
    },
    node: {
      style: {
        width: 20,
        height: 20,
        labelText: (data) => data.id,
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

  const graph = createGraph(options, canvas);

  await graph.render();

  await graph.translateTo([100, 300]);
};
