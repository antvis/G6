import { animationEdgeLine } from '@@/demos';
import { createDemoGraph } from '@@/utils';

it('add data draw', async () => {
  const graph = await createDemoGraph(animationEdgeLine);

  await graph.clear();

  graph.addData({
    nodes: [
      { id: 'node-1', style: { x: 100, y: 100 } },
      { id: 'node-2', style: { x: 350, y: 150 } },
    ],
    edges: [
      {
        id: 'edge-1',
        source: 'node-1',
        target: 'node-2',
        style: {
          curveOffset: 30,
        },
      },
    ],
  });

  await graph.draw();

  await expect(graph).toMatchSnapshot(__dirname, 'add-data');
});
