import { Graph } from '@antv/g6';
import type { Test } from 'iperf';

const ElementTestWrapper = (count: number): Test => {
  return async ({ container, perf }) => {
    const graph = new Graph({
      container,
      animation: false, // be sure to close the animation
      data: {
        nodes: Array(count)
          .fill(0)
          .map((_, i) => ({ id: `${i}`, style: { x: 50, y: 50 } })),
      },
      layout: {
        type: 'grid',
      },
    });

    await perf.evaluate('element drawing', async () => {
      await graph.draw();
    });

    await perf.evaluate('grid layout', async () => {
      await graph.layout();
    });
  };
};

export const elementDrawing100: Test = ElementTestWrapper(100);

export const elementDrawing500: Test = ElementTestWrapper(500);

export const elementDrawing1000: Test = ElementTestWrapper(1000);

export const elementDrawing5000: Test = ElementTestWrapper(5000);

export const elementDrawing10000: Test = ElementTestWrapper(10000);
