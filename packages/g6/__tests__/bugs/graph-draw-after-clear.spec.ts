import { elementEdgeLine } from '@@/demos';
import { createDemoGraph, sleep } from '@@/utils';

it('graph draw after clear', async () => {
  const graph = await createDemoGraph(elementEdgeLine);

  const data = graph.getData();

  await graph.clear();

  await expect(graph).toMatchSnapshot(__filename, 'blank');

  await sleep(200);

  graph.addData(data);
  await graph.draw();

  await expect(graph).toMatchSnapshot(__filename);
});
