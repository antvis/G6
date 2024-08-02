import type { Graph } from '@/src';
import { getParallelEdges, groupByEndpoints, isParallelEdges } from '@/src/transforms/process-parallel-edges';
import { transformProcessParallelEdges } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('transform-process-parallel-edges', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(transformProcessParallelEdges, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('mode', async () => {
    await expect(graph).toMatchSnapshot(__filename, 'merge-mode');
    graph.updateTransform({ key: 'process-parallel-edges', mode: 'bundle' });
    graph.draw();
    await expect(graph).toMatchSnapshot(__filename, 'bundle-mode');

    await expect(graph).toMatchSnapshot(__filename, 'bundle-add-orange-edge__before');
    graph.addEdgeData([
      {
        id: 'new-edge',
        source: 'node1',
        target: 'node4',
        style: { stroke: '#FF9800', lineWidth: 2 },
      },
      {
        id: 'new-loop',
        source: 'node5',
        target: 'node5',
        style: { stroke: '#FF9800', lineWidth: 2 },
      },
    ]);
    graph.draw();
    await expect(graph).toMatchSnapshot(__filename, 'bundle-add-orange-edge__after');

    await expect(graph).toMatchSnapshot(__filename, 'bundle-update-orange-edge__before');
    graph.updateEdgeData([{ id: 'new-edge', source: 'node1', target: 'node6' }]);
    graph.draw();
    await expect(graph).toMatchSnapshot(__filename, 'bundle-update-orange-edge__after');

    await expect(graph).toMatchSnapshot(__filename, 'bundle-remove-purple-edge__before');
    graph.removeEdgeData(['edge1', 'loop1']);
    graph.draw();
    await expect(graph).toMatchSnapshot(__filename, 'bundle-remove-purple-edge__after');
  });

  it('isParallelEdges', () => {
    expect(
      isParallelEdges(
        { source: 'node1', target: 'node2', style: { sourceNode: 'node1', targetNode: 'node2' } },
        { source: 'node2', target: 'node1', style: { sourceNode: 'node2', targetNode: 'node1' } },
      ),
    ).toBe(true);
    expect(
      isParallelEdges(
        { source: 'node1', target: 'node2', style: { sourceNode: 'node1', targetNode: 'node2' } },
        { source: 'node1', target: 'node2', style: { sourceNode: 'node1', targetNode: 'node2' } },
      ),
    ).toBe(true);
    expect(
      isParallelEdges(
        { source: 'node1', target: 'node2', style: { sourceNode: 'node1', targetNode: 'node2' } },
        { source: 'node2', target: 'node3', style: { sourceNode: 'node2', targetNode: 'node3' } },
      ),
    ).toBe(false);
  });

  it('getParallelEdges', () => {
    expect(
      getParallelEdges({ source: 'node1', target: 'node2', style: { sourceNode: 'node1', targetNode: 'node2' } }, [
        { source: 'node2', target: 'node1', style: { sourceNode: 'node2', targetNode: 'node1' } },
      ]),
    ).toEqual([{ source: 'node2', target: 'node1', style: { sourceNode: 'node2', targetNode: 'node1' } }]);
    expect(
      getParallelEdges({ source: 'node1', target: 'node2', style: { sourceNode: 'node1', targetNode: 'node2' } }, [
        { source: 'node1', target: 'node2', style: { sourceNode: 'node1', targetNode: 'node2' } },
        { source: 'node2', target: 'node3', style: { sourceNode: 'node2', targetNode: 'node3' } },
      ]),
    ).toEqual([]);
  });

  it('groupByEndpoints', () => {
    expect(groupByEndpoints(new Map())).toEqual({ edgeMap: new Map(), reverses: {} });
    expect(groupByEndpoints(new Map([['edge1', { source: 'node1', target: 'node2' }]])).edgeMap).toEqual(
      new Map([['node1-node2', [{ source: 'node1', target: 'node2' }]]]),
    );
    const res = groupByEndpoints(
      new Map([
        ['edge1', { source: 'node1', target: 'node2' }],
        ['edge2', { source: 'node2', target: 'node1' }],
      ]),
    );
    expect(res.edgeMap).toEqual(
      new Map([
        [
          'node1-node2',
          [
            { source: 'node1', target: 'node2' },
            { source: 'node2', target: 'node1' },
          ],
        ],
      ]),
    );
    expect(res.reverses).toEqual({ 'node2|node1|1': true });
  });
});
