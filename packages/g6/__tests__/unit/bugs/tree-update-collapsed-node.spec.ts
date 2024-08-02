import { idOf, treeToGraphData } from '@/src';
import { createGraph } from '@@/utils';

describe('bug: tree-update-collapsed-node', () => {
  it('should be collapsed', async () => {
    const graph = createGraph({
      animation: false,
      x: 50,
      y: 50,
      data: treeToGraphData({
        id: 'root',
        children: [
          { id: '1-1', style: { collapsed: true }, children: [{ id: '1-1-1' }] },
          { id: '1-2', children: [{ id: '1-2-1' }] },
        ],
      }),
      layout: {
        type: 'indented',
      },
    });

    await graph.render();

    await expect(graph).toMatchSnapshot(__filename);

    // set parent of 1-2 to 1-1
    const edges = graph
      .getEdgeData()
      .filter((edge) => edge.target === '1-2')
      .map(idOf);
    graph.removeEdgeData(edges);
    graph.updateNodeData([
      { id: 'root', children: ['1-1'] },
      { id: '1-1', children: ['1-1-1', '1-2'] },
    ]);
    graph.addEdgeData([{ source: '1-1', target: '1-2' }]);
    await graph.render();

    await expect(graph).toMatchSnapshot(__filename, 'update collapsed node');
  });
});
