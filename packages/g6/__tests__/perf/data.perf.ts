import { Graph } from '@antv/g6';
import type { Test } from 'iperf';

const DataTestWrapper = (count: number): Test => {
  return async ({ container, perf }) => {
    const graph = new Graph({
      container,
      data: {
        nodes: Array(count)
          .fill(0)
          .map((_, i) => ({ id: `${i}`, style: { x: 50, y: 50 } })),
      },
    });
    await perf.evaluate('data diff', async () => {
      // @ts-expect-error private method invoke
      await graph.prepare();
      // @ts-expect-error context is private property
      const context = graph.context;
      // @ts-expect-error private method invoke
      context.element.computeChangesAndDrawData({});
    });
  };
};

export const dataDiff1000: Test = DataTestWrapper(1000);

export const dataDiff5000: Test = DataTestWrapper(5000);

export const dataDiff10000: Test = DataTestWrapper(10000);

export const dataDiff50000: Test = DataTestWrapper(50000);

export const dataDiff100000: Test = DataTestWrapper(100000);
