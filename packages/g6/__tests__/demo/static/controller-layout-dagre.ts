import type { G6Spec } from '../../../src';
import { DataController } from '../../../src/runtime/data';
import { ElementController } from '../../../src/runtime/element';
import { LayoutController } from '../../../src/runtime/layout';
import data from '../../dataset/dagre.json';
import type { StaticTestCase } from '../types';

export const controllerLayoutDagre: StaticTestCase = async ({ canvas }) => {
  const options: G6Spec = {
    animation: false,
    data,
    theme: 'light',
    layout: {
      type: 'dagre',
      nodeSize: 10,
      ranksep: 20,
      controlPoints: true,
      begin: [20, 20],
    },
    node: { style: { width: 20, height: 20 } },
    edge: {
      style: {
        // type: 'polyline',
        // TODO polyline
      },
    },
  };

  const graph = {
    emit: () => {},
  };

  const model = new DataController();

  model.addData(options?.data || {});

  const context: any = { options, model, graph, canvas, viewport: { getCanvasSize: () => [500, 500] } };

  const element = new ElementController(context);

  await element.render(context);

  const layout = new LayoutController({ ...context, element });

  await layout.layout();
};
