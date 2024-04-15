import { transformProcessParallelEdges } from '@/__tests__/demos';
import type { Graph } from '@/src';
import { getParallelEdges, groupByEndpoints, isParallelEdges } from '@/src/transforms/process-parallel-edges';
import { createDemoGraph } from '@@/utils';

describe('transform-process-parallel-edges', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(transformProcessParallelEdges, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('Add Orange Edge', async () => {
    await expect(graph).toMatchSnapshot(__filename, 'add-orange-edge__before');
    graph.addEdgeData([
      {
        id: 'new-edge',
        source: 'node1',
        target: 'node4',
        style: { color: '#FF9800', lineWidth: 2 },
      },
      {
        id: 'new-loop',
        source: 'node5',
        target: 'node5',
        style: { color: '#FF9800', lineWidth: 2 },
      },
    ]);
    graph.draw();
    await expect(graph).toMatchSnapshot(__filename, 'add-orange-edge__after');
  });

  it('Update Orange Edge', async () => {
    await expect(graph).toMatchSnapshot(__filename, 'update-orange-edge__before');
    graph.updateEdgeData([{ id: 'new-edge', source: 'node1', target: 'node6' }]);
    graph.draw();
    await expect(graph).toMatchSnapshot(__filename, 'update-orange-edge__after');
  });

  it('Remove Purple Edge', async () => {
    await expect(graph).toMatchSnapshot(__filename, 'remove-purple-edge__before');
    graph.removeEdgeData(['edge1', 'loop1']);
    graph.draw();
    await expect(graph).toMatchSnapshot(__filename, 'remove-purple-edge__after');
  });

  it('isParallelEdges', () => {
    expect(isParallelEdges({ source: 'node1', target: 'node2' }, { source: 'node2', target: 'node1' })).toBe(true);
    expect(isParallelEdges({ source: 'node1', target: 'node2' }, { source: 'node1', target: 'node2' })).toBe(true);
    expect(isParallelEdges({ source: 'node1', target: 'node2' }, { source: 'node2', target: 'node3' })).toBe(false);
  });

  it('getParallelEdges', () => {
    expect(getParallelEdges({ source: 'node1', target: 'node2' }, [{ source: 'node2', target: 'node1' }])).toEqual([
      { source: 'node2', target: 'node1' },
    ]);
    expect(
      getParallelEdges({ source: 'node1', target: 'node2' }, [
        { source: 'node1', target: 'node2' },
        { source: 'node2', target: 'node3' },
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
