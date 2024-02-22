import type { G6Spec } from '../../../src';
import { Graph } from '../../../src';
import data from '../../dataset/cluster.json';
import type { StaticTestCase } from '../types';

export const controllerLayoutForce: StaticTestCase = async ({ canvas, animation }) => {
  const options: G6Spec = {
    container: canvas,
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

  const graph = new Graph(options);

  await graph.render();
};

controllerLayoutForce.skip = true;
