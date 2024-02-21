import type { G6Spec } from '../../../src';
import { treeToGraphData } from '../../../src';
import tree from '../../dataset/file-system.json';
import { createGraph } from '../../mock';
import type { StaticTestCase } from '../types';

export const controllerLayoutIndented: StaticTestCase = async ({ canvas, animation }) => {
  const options: G6Spec = {
    animation,
    data: treeToGraphData(tree),
    theme: 'light',
    layout: {
      type: 'indented',
      isHorizontal: true,
      direction: 'LR',
      indent: 30,
      animation,
      getHeight: function getHeight() {
        return 16;
      },
      getWidth: function getWidth() {
        return 16;
      },
    },
    node: { style: { width: 20, height: 20 } },
    edge: {
      style: {
        type: 'polyline',
        // TODO polyline
      },
    },
    zoom: 0.5,
  };

  const graph = createGraph(options, canvas);

  await graph.render();

  await graph.translateTo([0, -200]);
};
