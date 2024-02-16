import type { G6Spec } from '../../../src';
import { transformTreeDataToGraphData } from '../../../src';
import { DataController } from '../../../src/runtime/data';
import { ElementController } from '../../../src/runtime/element';
import { LayoutController } from '../../../src/runtime/layout';
import { ViewportController } from '../../../src/runtime/viewport';
import tree from '../../dataset/algorithm-category.json';
import type { StaticTestCase } from '../types';

export const controllerLayoutDendrogram: StaticTestCase = async ({ canvas, animation }) => {
  const options: G6Spec = {
    animation,
    data: transformTreeDataToGraphData(tree),
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
  };

  const graph = {
    emit: () => {},
  };

  const model = new DataController();

  model.addData(options?.data || {});

  const viewport = new ViewportController({ canvas } as any);
  viewport.zoom({ mode: 'absolute', value: 0.5 });
  viewport.translate({ mode: 'absolute', value: [-200, 350] });

  const context: any = { options, model, graph, canvas, viewport };

  const element = new ElementController(context);

  await element.render(context);

  const layout = new LayoutController({ ...context, element });

  await layout.layout();
};
