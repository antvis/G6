import { ForceAtlas2Layout, initThreads, supportsThreads } from '@antv/layout-wasm';
import type { G6Spec } from '../../../src';
import { register } from '../../../src';
import { DataController } from '../../../src/runtime/data';
import { ElementController } from '../../../src/runtime/element';
import { LayoutController } from '../../../src/runtime/layout';
import data from '../../dataset/soccer.json';
import type { StaticTestCase } from '../types';

try {
  register('layout', 'forceatlas2-wasm', ForceAtlas2Layout);
} catch {
  //
}

export const controllerLayoutForceatlas2WASM: StaticTestCase = async ({ canvas }) => {
  const supported = await supportsThreads();
  const threads = await initThreads(supported);

  const options: G6Spec = {
    padding: 0,
    data,
    theme: 'light',
    layout: {
      type: 'forceatlas2-wasm',
      threads,
      dimensions: 2,
      maxIteration: 100,
      minMovement: 0.4,
      distanceThresholdMode: 'mean',
      animation: true,
      kg: 5,
      kr: 10,
      ks: 0.1,
    },
    node: { style: { r: 10 } },
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
