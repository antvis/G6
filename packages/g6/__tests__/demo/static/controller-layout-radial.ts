import type { G6Spec } from '../../../src';
import { DataController } from '../../../src/runtime/data';
import { ElementController } from '../../../src/runtime/element';
import { LayoutController } from '../../../src/runtime/layout';
import { ViewportController } from '../../../src/runtime/viewport';
import data from '../../dataset/radial.json';
import type { StaticTestCase } from '../types';

export const controllerLayoutRadial: StaticTestCase = async ({ canvas }) => {
  const options: G6Spec = {
    animation: false,
    padding: 0,
    data: data,
    theme: 'light',
    layout: {
      type: 'radial',
      unitRadius: 50,
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

  const context: any = { options, model, graph, canvas, viewport };

  const element = new ElementController(context);

  await element.render(context);

  const layout = new LayoutController({ ...context, element });

  await layout.layout();
};
