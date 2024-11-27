import { behaviorDragNode } from '@@/demos';
import { createDemoGraph } from '@@/utils';

it('api focusElement edge', async () => {
  const graph = await createDemoGraph(behaviorDragNode, { animation: false });

  graph.translateBy([100, 100]);
  graph.zoomBy(2);

  graph.focusElement('node-3');

  await expect(graph).toMatchSnapshot(__filename);

  graph.focusElement('node-3-node-4');

  await expect(graph).toMatchSnapshot(__filename, 'focusElement edge');
});
