import type { G6Spec } from '../../../src';
import { DataController } from '../../../src/runtime/data';
import { ElementController } from '../../../src/runtime/element';
import { LayoutController } from '../../../src/runtime/layout';
import data from '../../dataset/cluster.json';
import type { StaticTestCase } from '../types';

export const controllerLayoutForce: StaticTestCase = async ({ canvas, animation }) => {
  const options: G6Spec = {
    animation,
    data,
    theme: 'light',
    layout: {
      type: 'force',
      linkDistance: 50,
      clustering: true,
      dimensions: 2,
      nodeClusterBy: 'cluster',
      clusterNodeStrength: 100,
      animation,
    },
    node: {
      style: {
        width: 20,
        height: 20,
        lineWidth: 0,
        fill: (data) => ({ a: '#cd2f3b', b: '#005cc5', c: '#1e7834', d: '#ff9f45' })[data.style.cluster],
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

controllerLayoutForce.skip = true;
