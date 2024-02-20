import type { G6Spec } from '../../../src';
import { treeToGraphData } from '../../../src';
import { DataController } from '../../../src/runtime/data';
import { ElementController } from '../../../src/runtime/element';
import { LayoutController } from '../../../src/runtime/layout';
import { ViewportController } from '../../../src/runtime/viewport';
import tree from '../../dataset/file-system.json';
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
  };

  const graph = {
    emit: () => {},
  };

  const model = new DataController();

  model.addData(options?.data || {});

  const viewport = new ViewportController({ canvas } as any);

  const context: any = { options, model, graph, canvas, viewport };

  viewport.zoom({ mode: 'absolute', value: 0.5 });
  viewport.translate({ mode: 'absolute', value: [0, -200] });

  const element = new ElementController(context);

  await element.render(context);

  const layout = new LayoutController({ ...context, element });

  await layout.layout();
};
