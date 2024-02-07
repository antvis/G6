import { FruchtermanLayout } from '@antv/layout-gpu';
import type { G6Spec } from '../../../src';
import { register } from '../../../src';
import { DataController } from '../../../src/runtime/data';
import { ElementController } from '../../../src/runtime/element';
import { LayoutController } from '../../../src/runtime/layout';
import data from '../../dataset/soccer.json';
import type { StaticTestCase } from '../types';

try {
  register('layout', 'fruchterman-gpu', FruchtermanLayout);
} catch {
  //
}

export const controllerLayoutFruchtermanGPU: StaticTestCase = async ({ canvas }) => {
  const options: G6Spec = {
    padding: 0,
    data,
    theme: 'light',
    layout: {
      type: 'fruchterman-gpu',
      maxIteration: 1000,
      minMovement: 0.4,
      distanceThresholdMode: 'mean',
      gravity: 1,
      speed: 5,
      animation: true,
    },
    node: { style: { r: 10 } },
  };

  const graph = {
    getSize: () => [500, 500],
    emit: () => {},
  };

  const model = new DataController();

  model.addData(options?.data || {});

  const context: any = { options, model, graph, canvas };

  const element = new ElementController(context);

  await element.render(context);

  const layout = new LayoutController({ ...context, element });

  await layout.layout();
};

controllerLayoutFruchtermanGPU.skip = true;
