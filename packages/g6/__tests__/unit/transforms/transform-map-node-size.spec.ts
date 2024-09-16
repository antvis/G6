import type { Graph } from '@/src';
import { transformMapNodeSize } from '@@/demos';
import { createDemoGraph } from '@@/utils';

const nodeSizeMap = (graph: Graph) =>
  Object.fromEntries(graph.getNodeData().map((node) => [node.id, node.style?.size]));

describe('transform map node size', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(transformMapNodeSize, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('centrality', async () => {
    graph.updateTransform({
      key: 'map-node-size',
      centrality: { type: 'degree' },
      minSize: 10,
      maxSize: 40,
      scale: 'linear',
    });
    await graph.render();

    expect(nodeSizeMap(graph)).toEqual({
      'node-1': [40, 40, 40],
      'node-2': [10, 10, 10],
      'node-3': [10, 10, 10],
      'node-4': [25, 25, 25],
      'node-5': [10, 10, 10],
    });

    graph.updateTransform({
      key: 'map-node-size',
      centrality: { type: 'betweenness' },
    });
    await graph.render();

    expect(nodeSizeMap(graph)).toEqual({
      'node-1': [40, 40, 40],
      'node-2': [10, 10, 10],
      'node-3': [10, 10, 10],
      'node-4': [28, 28, 28],
      'node-5': [10, 10, 10],
    });

    graph.updateTransform({
      key: 'map-node-size',
      centrality: { type: 'pagerank' },
    });
    await graph.render();

    expect(nodeSizeMap(graph)['node-1']).toEqual([10, 10, 10]);
    expect(nodeSizeMap(graph)['node-5']).toEqual([40, 40, 40]);

    graph.updateTransform({
      key: 'map-node-size',
      centrality: { type: 'eigenvector' },
    });
    await graph.render();

    expect(nodeSizeMap(graph)).toEqual({
      'node-1': [40, 40, 40],
      'node-2': [10, 10, 10],
      'node-3': [10, 10, 10],
      'node-4': [25, 25, 25],
      'node-5': [10, 10, 10],
    });

    graph.updateTransform({
      key: 'map-node-size',
      centrality: { type: 'eigenvector', directed: true },
    });
    await graph.render();

    expect(nodeSizeMap(graph)).toEqual({
      'node-1': [40, 40, 40],
      'node-2': [10, 10, 10],
      'node-3': [10, 10, 10],
      'node-4': [20, 20, 20],
      'node-5': [10, 10, 10],
    });

    graph.updateTransform({
      key: 'map-node-size',
      centrality: { type: 'closeness' },
      minSize: 10,
      maxSize: 50,
    });
    await graph.render();

    expect(nodeSizeMap(graph)).toEqual({
      'node-1': [50, 50, 50],
      'node-2': [16.25, 16.25, 16.25],
      'node-3': [16.25, 16.25, 16.25],
      'node-4': [35, 35, 35],
      'node-5': [10, 10, 10],
    });
  });
});
