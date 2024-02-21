import type { G6Spec } from '../../../src';
import { treeToGraphData } from '../../../src';
import { DataController } from '../../../src/runtime/data';
import { ElementController } from '../../../src/runtime/element';
import { LayoutController } from '../../../src/runtime/layout';
import { ViewportController } from '../../../src/runtime/viewport';
import tree from '../../dataset/algorithm-category.json';
import type { StaticTestCase } from '../types';

export const controllerLayoutCompactBox: StaticTestCase = async ({ canvas, animation }) => {
  const options: G6Spec = {
    animation,
    data: treeToGraphData(tree),
    theme: 'light',
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

  const graph = {
    emit: () => {},
  };

  const model = new DataController();

  model.addData(options?.data || {});

  const viewport = new ViewportController({ canvas } as any);
  viewport.zoom({ mode: 'absolute', value: 0.5 });
  viewport.translate({ mode: 'absolute', value: [100, 300] });

  const context: any = { options, model, graph, canvas, viewport };

  const element = new ElementController(context);

  await element.draw(context);

  const layout = new LayoutController({ ...context, element });

  await layout.layout();
};
