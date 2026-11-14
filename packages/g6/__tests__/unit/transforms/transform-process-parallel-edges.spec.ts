import type { Graph } from '@/src';
import { getParallelEdges, groupByEndpoints, isParallelEdges } from '@/src/transforms/process-parallel-edges';
import { transformProcessParallelEdges } from '@@/demos';
import { createDemoGraph, createGraph } from '@@/utils';

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

  it('bundle mode: an edge that becomes single after its parallel is removed should be straightened', async () => {
    const bundleGraph = createGraph({
      data: {
        nodes: [
          { id: 'n1', style: { x: 100, y: 100 } },
          { id: 'n2', style: { x: 300, y: 100 } },
        ],
        edges: [
          { id: 'e1', source: 'n1', target: 'n2' },
          { id: 'e2', source: 'n1', target: 'n2' },
        ],
      },
      transforms: [{ type: 'process-parallel-edges', key: 'process-parallel-edges', mode: 'bundle' }],
    });

    await bundleGraph.render();

    // 平行边应被弯曲 | parallel edges should be curved
    expect(bundleGraph.getElementRenderStyle('e1').curveOffset).not.toBe(0);
    expect(bundleGraph.getElementRenderStyle('e2').curveOffset).not.toBe(0);

    // 删除一条平行边后，剩余的边应被重新拉直（恢复到此前的拉直行为）
    // after removing one parallel edge, the remaining edge should be straightened again (restores the previous behavior)
    bundleGraph.removeEdgeData(['e2']);
    await bundleGraph.draw();
    expect(bundleGraph.getElementRenderStyle('e1').curveOffset).toBe(0);

    bundleGraph.destroy();
  });

  it('bundle mode: a native single edge is left untouched', async () => {
    const bundleGraph = createGraph({
      data: {
        nodes: [
          { id: 'n1', style: { x: 100, y: 100 } },
          { id: 'n2', style: { x: 300, y: 100 } },
        ],
        // 一条始终单独存在的边 | an edge that is always single
        edges: [{ id: 'e1', source: 'n1', target: 'n2' }],
      },
      transforms: [{ type: 'process-parallel-edges', key: 'process-parallel-edges', mode: 'bundle' }],
    });

    await bundleGraph.render();

    // 原生单边不应被平行边 transform 修改样式：既不会被转换为 quadratic，也不会被写入 curveOffset
    // a native single edge must not be modified by the transform: not converted to quadratic nor given a curveOffset
    expect(bundleGraph.getElementType('e1')).toBe('edge');
    expect(bundleGraph.getElementRenderStyle('e1').curveOffset).toBeUndefined();

    bundleGraph.destroy();
  });
});
