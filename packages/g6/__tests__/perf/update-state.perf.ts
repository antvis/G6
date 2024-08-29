import { Graph } from '@antv/g6';
import type { Test } from 'iperf';

export const UpdateElementState: Test = async ({ container, perf }) => {
  const nodes = Array(1000)
    .fill(0)
    .map((_, i) => ({ id: `${i}` }));
  const edges = Array(999)
    .fill(0)
    .map((_, i) => ({ id: `edge-${i}`, source: `${i}`, target: `${i + 1}` }));

  const graph = new Graph({
    container,
    animation: false,
    data: { nodes, edges },
    layout: { type: 'grid' },
  });

  await graph.render();

  const selected = [...nodes, ...edges].map((element) => [element.id, 'selected']);

  await perf.evaluate('update element state to selected', async () => {
    await graph.setElementState(Object.fromEntries(selected));
  });

  const none = [...nodes, ...edges].map((element) => [element.id, []]);

  await perf.evaluate('update element state to default', async () => {
    await graph.setElementState(Object.fromEntries(none));
  });

  const position = nodes.map((node) => [node.id, [10, 10]]);

  await perf.evaluate('update element position', async () => {
    await graph.translateElementBy(Object.fromEntries(position), false);
  });
};
