import type { IAnimation } from '@antv/g';
import type { G6Spec } from '../../../src';
import type { AnimateEvent } from '../../../src/types';
import { createGraph } from '../../mock';
import type { AnimationTestCase } from '../types';

export const controllerElementState: AnimationTestCase = async (context) => {
  const { canvas } = context;

  const options: G6Spec = {
    data: {
      nodes: [
        { id: 'node-1', style: { x: 50, y: 50, states: ['active', 'selected'] } },
        { id: 'node-2', style: { x: 200, y: 50 } },
        { id: 'node-3', style: { x: 125, y: 150, states: ['active'] } },
      ],
      edges: [
        { source: 'node-1', target: 'node-2', style: { states: ['active'] } },
        { source: 'node-2', target: 'node-3' },
        { source: 'node-3', target: 'node-1' },
      ],
    },
    theme: 'light',
    node: {
      style: {
        lineWidth: 1,
        width: 20,
        height: 20,
      },
      state: {
        active: {
          lineWidth: 2,
        },
        selected: {
          fill: 'pink',
        },
      },
      animation: {
        update: [{ fields: ['lineWidth', 'fill'] }],
      },
    },
    edge: {
      style: {
        lineWidth: 1,
      },
      state: {
        active: {
          lineWidth: 2,
          stroke: 'pink',
        },
      },
      animation: {
        update: [
          {
            fields: ['lineWidth', 'stroke'],
          },
        ],
      },
    },
  };

  const graph = createGraph(options, canvas);
  await graph.draw();

  graph.updateData({
    nodes: [
      { id: 'node-1', style: { states: [] } },
      { id: 'node-2', style: { states: ['active'] } },
      { id: 'node-3', style: { states: ['selected'] } },
    ],
    edges: [
      { source: 'node-1', target: 'node-2', style: { states: [] } },
      { source: 'node-2', target: 'node-3', style: { states: ['active'] } },
    ],
  });

  const result = new Promise<IAnimation>((resolve) => {
    graph.once('beforeanimate', (e: AnimateEvent) => {
      resolve(e.animation);
    });
  });

  graph.draw();

  return await result;
};

controllerElementState.times = [0, 1000];
