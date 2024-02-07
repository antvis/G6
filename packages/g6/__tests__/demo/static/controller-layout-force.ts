import type { G6Spec } from '../../../src';
import { DataController } from '../../../src/runtime/data';
import { ElementController } from '../../../src/runtime/element';
import { LayoutController } from '../../../src/runtime/layout';
import data from '../../dataset/cluster.json';
import type { StaticTestCase } from '../types';

export const controllerLayoutForce: StaticTestCase = async ({ canvas }) => {
  const options: G6Spec = {
    padding: 0,
    data,
    theme: 'light',
    layout: {
      type: 'force',
      linkDistance: 50,
      clustering: true,
      dimensions: 2,
      nodeClusterBy: 'cluster',
      clusterNodeStrength: 100,
      animation: true,
    },
    node: {
      style: {
        r: 10,
        lineWidth: 0,
        fill: (data) => ({ a: '#cd2f3b', b: '#005cc5', c: '#1e7834', d: '#ff9f45' })[data.style.cluster],
      },
    },
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

controllerLayoutForce.skip = true;
