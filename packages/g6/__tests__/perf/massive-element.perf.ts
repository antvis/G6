import { Graph } from '@antv/g6';
import type { Test } from 'iperf';

export const massiveElement60000: Test = async ({ container, perf }) => {
  const data = await fetch('https://assets.antv.antgroup.com/g6/60000.json').then((res) => res.json());

  const graph = new Graph({
    container,
    animation: false,
    autoFit: 'view',
    data,
    node: {
      style: {
        size: 4,
        batchKey: 'node',
      },
    },
    behaviors: ['zoom-canvas', 'drag-canvas'],
  });

  await perf.evaluate('massive element drawing', async () => {
    await graph.draw();
  });
};

massiveElement60000.iteration = 3;
