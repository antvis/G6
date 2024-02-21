import type { G6Spec } from '../../../src';
import { DataController } from '../../../src/runtime/data';
import { ElementController } from '../../../src/runtime/element';
import { LayoutController } from '../../../src/runtime/layout';
import data from '../../dataset/soccer.json';
import type { StaticTestCase } from '../types';

export const controllerLayoutGrid: StaticTestCase = async ({ canvas, animation }) => {
  const options: G6Spec = {
    animation,
    padding: 0,
    data,
    theme: 'light',
    layout: {
      type: 'grid',
      animation,
    },
    node: { style: { width: 20, height: 20 } },
  };

  const graph = {
    emit: () => {},
  };

  const model = new DataController();

  model.addData(options?.data || {});

  const context: any = { options, model, graph, canvas, viewport: { getCanvasSize: () => [500, 500] } };

  const element = new ElementController(context);

  await element.draw(context);

  const layout = new LayoutController({ ...context, element });

  await layout.layout();
};
