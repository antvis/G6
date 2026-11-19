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
    await expect(graph).toMatchSnapshot(__filename);

    graph.updateTransform({
      key: 'map-node-size',
      centrality: { type: 'degree' },
      minSize: 10,
      maxSize: 40,
      scale: 'linear',
    });
    await graph.draw();

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
    await graph.draw();

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
    await graph.draw();

    expect(nodeSizeMap(graph)['node-1']).toEqual([10, 10, 10]);
    expect(nodeSizeMap(graph)['node-5']).toEqual([40, 40, 40]);

    graph.updateTransform({
      key: 'map-node-size',
      centrality: { type: 'eigenvector' },
    });
    await graph.draw();

    const eigenvectorSizes = nodeSizeMap(graph) as Record<string, number[]>;
    // principal eigenvector of the undirected graph: [0.6533, 0.3536, 0.3536, 0.5, 0.2706]
    expect(eigenvectorSizes['node-1'][0]).toBeCloseTo(40, 3);
    expect(eigenvectorSizes['node-2'][0]).toBeCloseTo(16.5032, 3);
    expect(eigenvectorSizes['node-3'][0]).toBeCloseTo(16.5032, 3);
    expect(eigenvectorSizes['node-4'][0]).toBeCloseTo(27.9837, 3);
    expect(eigenvectorSizes['node-5'][0]).toBeCloseTo(10, 3);

    graph.updateTransform({
      key: 'map-node-size',
      centrality: { type: 'eigenvector', directed: true },
    });
    await graph.draw();

    const directedSizes = nodeSizeMap(graph) as Record<string, number[]>;
    expect(directedSizes['node-1']).toEqual([40, 40, 40]);
    expect(directedSizes['node-2']).toEqual([10, 10, 10]);
    expect(directedSizes['node-3']).toEqual([10, 10, 10]);
    expect(directedSizes['node-4'][0]).toBeGreaterThan(10);
    expect(directedSizes['node-4'][0]).toBeLessThan(40);
    expect(directedSizes['node-5']).toEqual([10, 10, 10]);

    graph.updateTransform({
      key: 'map-node-size',
      centrality: { type: 'closeness' },
      minSize: 10,
      maxSize: 50,
    });
    await graph.draw();

    expect(nodeSizeMap(graph)).toEqual({
      'node-1': [50, 50, 50],
      'node-2': [16.25, 16.25, 16.25],
      'node-3': [16.25, 16.25, 16.25],
      'node-4': [35, 35, 35],
      'node-5': [10, 10, 10],
    });
  });

  it('multiple scale types', async () => {
    graph.updateTransform({
      key: 'map-node-size',
      centrality: { type: 'degree' },
      minSize: 10,
      maxSize: 40,
      scale: 'pow',
    });
    await graph.draw();

    expect(nodeSizeMap(graph)).toEqual({
      'node-1': [40, 40, 40],
      'node-2': [10, 10, 10],
      'node-3': [10, 10, 10],
      'node-4': [17.5, 17.5, 17.5],
      'node-5': [10, 10, 10],
    });

    graph.updateTransform({
      key: 'map-node-size',
      centrality: { type: 'degree' },
      minSize: 10,
      maxSize: 40,
      scale: 'sqrt',
    });
    await graph.draw();

    expect(nodeSizeMap(graph)).toEqual({
      'node-1': [40, 40, 40],
      'node-2': [10, 10, 10],
      'node-3': [10, 10, 10],
      'node-4': [10 + 30 * Math.sqrt(0.5), 10 + 30 * Math.sqrt(0.5), 10 + 30 * Math.sqrt(0.5)],
      'node-5': [10, 10, 10],
    });

    graph.updateTransform({
      key: 'map-node-size',
      centrality: { type: 'degree' },
      minSize: 10,
      maxSize: 40,
      scale: 'none',
    });
    await graph.draw();

    expect(nodeSizeMap(graph)).toEqual({
      'node-1': [10, 10, 10],
      'node-2': [10, 10, 10],
      'node-3': [10, 10, 10],
      'node-4': [10, 10, 10],
      'node-5': [10, 10, 10],
    });

    graph.updateTransform({
      key: 'map-node-size',
      centrality: { type: 'degree' },
      minSize: 10,
      maxSize: 40,
      scale: (value: number, domain: [number, number], range: [number, number]) => {
        const [d0, d1] = domain;
        const [r0, r1] = range;
        return r0 + ((value - d0) / (d1 - d0)) * (r1 - r0);
      },
    });
    await graph.draw();

    expect(nodeSizeMap(graph)).toEqual({
      'node-1': [40, 40, 40],
      'node-2': [10, 10, 10],
      'node-3': [10, 10, 10],
      'node-4': [25, 25, 25],
      'node-5': [10, 10, 10],
    });
  });

  it('sync to label size', async () => {
    graph.updateTransform({
      key: 'map-node-size',
      centrality: { type: 'degree' },
      maxSize: 80,
      minSize: 20,
      scale: 'log',
      mapLabelSize: true,
    });
    await graph.draw();

    await expect(graph).toMatchSnapshot(__filename, 'label-size');
  });
});
