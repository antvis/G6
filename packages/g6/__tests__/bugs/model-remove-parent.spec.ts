import { createGraph } from '@@/utils';

it('model remove parent', async () => {
  const data = {
    nodes: [
      { id: 'node1', combo: 'combo1', style: { x: 250, y: 150 } },
      { id: 'node2', combo: 'combo1', style: { x: 350, y: 150 } },
      { id: 'node3', combo: 'combo1', style: { x: 250, y: 300 } },
    ],
    edges: [],
    combos: [{ id: 'combo1' }],
  };

  const graph = createGraph({
    data,
    node: {
      style: {
        labelText: (d) => d.id,
      },
    },
    combo: {
      type: 'rect',
    },
  });

  await graph.render();

  await expect(graph).toMatchSnapshot(__filename);

  graph.updateNodeData([{ id: 'node3', combo: null }]);
  await graph.draw();

  await expect(graph).toMatchSnapshot(__dirname, 'remove-parent');
});
