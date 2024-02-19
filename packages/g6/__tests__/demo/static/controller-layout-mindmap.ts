import type { G6Spec } from '../../../src';
import { treeToGraphData } from '../../../src';
import { DataController } from '../../../src/runtime/data';
import { ElementController } from '../../../src/runtime/element';
import { LayoutController } from '../../../src/runtime/layout';
import { ViewportController } from '../../../src/runtime/viewport';
import tree from '../../dataset/algorithm-category.json';
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
  };

  const graph = {
    emit: () => {},
  };

  const model = new DataController();

  model.addData(options?.data || {});

  const viewport = new ViewportController({ canvas } as any);
  viewport.zoom({ mode: 'absolute', value: 0.4 });
  viewport.translate({ mode: 'absolute', value: [350, 0] });

  const context: any = { options, model, graph, canvas, viewport };

  const element = new ElementController(context);

  await element.render(context);

  const layout = new LayoutController({ ...context, element });

  await layout.layout();
};
