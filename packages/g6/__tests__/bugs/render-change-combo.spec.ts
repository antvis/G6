import { createGraph } from '@@/utils';

describe('render change combo', () => {
  it('bug', async () => {
    const graph = createGraph({});
    await graph.render();

    let count = 1;
    const operation = async () => {
      graph.setData({
        nodes: [
          { id: 'node1', combo: `${count}A`, style: { x: 250, y: 150 } },
          { id: 'node2', combo: `${count}b`, style: { x: 350, y: 150 } },
          { id: 'node3', style: { x: 250, y: 300 } },
        ],
        edges: [],
        combos: [
          { id: `${count}A`, style: { labelText: `${count}A` } },
          { id: `${count}b`, style: { labelText: `${count}B` } },
        ],
      });
      await graph.render();
      count++;
    };

    await operation();

    await operation();
  });
});
