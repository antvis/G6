import { Extensions, Graph, GraphData, extend } from '../../../src/index';

export const data = {
  nodes: [
    { id: 'node1', data: { x: 100, y: 200 } },
    { id: 'node2', data: { x: 200, y: 250 } },
    { id: 'node3', data: { x: 250, y: 300 } },
    { id: 'node4', data: { x: 200, y: 250 } },
    { id: 'node5', data: { x: 200, y: 30 } },
  ],
  edges: [
    { id: 'edge1', source: 'node1', target: 'node2', data: {} },
    { id: 'edge2', source: 'node1', target: 'node3', data: {} },
    { id: 'edge3', source: 'node1', target: 'node4', data: {} },
    { id: 'edge4', source: 'node2', target: 'node4', data: {} },
    { id: 'edge5', source: 'node2', target: 'node5', data: {} },
  ],
};
const div = document.createElement('div');
div.id = 'force-layout';
document.body.appendChild(div);
const ExtGraph = extend(Graph, {
  edges: {
    'polyline-edge': Extensions.PolylineEdge,
  },
  plugins: {
    edgeBundling: Extensions.EdgeBundling,
  },
});

describe('edge bundling', () => {
  const graph = new ExtGraph({
    data,
    container: div,
    width: 500,
    height: 500,
    layout: {
      type: 'circular',
    },
    plugins: ['edgeBundling'],
  });

  it('edge bundling on circular layout with default configs', () => {
    const { plugin: edgeBundling } = graph.pluginController.pluginMap.get('edgeBundling');

    const graphData = {
      nodes: graph.getAllNodesData(),
      edges: graph.getAllEdgesData(),
    };
    edgeBundling.bundling(graphData);

    expect(graphData.edges[0].data.type).toEqual('polyline-edge');
    expect(graphData.edges[0].data.keyShape?.controlPoints.length > 2).toEqual(true);

    edgeBundling.destroy();
  });

  it('bundling on circular with fixed bundleThreshold and iterations', () => {
    const { plugin: edgeBundling } = graph.pluginController.pluginMap.get('edgeBundling');

    const graphData = {
      nodes: graph.getAllNodesData(),
      edges: graph.getAllEdgesData(),
    };

    edgeBundling.updateBundling({
      data: graphData,
      iterations: 120,
      bundleThreshold: 0.1,
    });

    expect(graphData.edges[0].data.type).toEqual('polyline-edge');
    expect(graphData.edges[0].data.keyShape?.controlPoints.length > 2).toEqual(true);

    edgeBundling.destroy();
  });

  it('bundling update', () => {
    const data2: GraphData = {
      nodes: [
        { id: 'n0', data: {} },
        { id: 'n1', data: {} },
      ],
      edges: [{ id: 'edge-n0-n1', source: 'n0', target: 'n1', data: {} }],
    };
    graph.changeData(data2);
    graph.on('afterlayout', () => {
      const { plugin: edgeBundling } = graph.pluginController.pluginMap.get('edgeBundling');

      data2.nodes = [
        {
          id: 'n0',
          data: {
            x: 10,
            y: 100,
          },
        },
        {
          id: 'n1',
          data: {
            x: 100,
            y: 100,
          },
        },
        {
          id: 'n2',
          data: {
            x: 10,
            y: 10,
          },
        },
      ];

      data2.edges = [
        { source: 'n0', target: 'n1' },
        { source: 'n1', target: 'n2' },
        { source: 'n0', target: 'n2' },
      ];

      edgeBundling.updateBundling({
        bundleThreshold: 0.1,
        iterations: 120,
        data: data2,
      });

      expect(data2.edges[0].data.type).toEqual('polyline-edge');
      expect(data2.edges[0].data.keyShape?.controlPoints.length > 2).toEqual(true);
      edgeBundling.destroy();
    });
  });

  it('bundling no position info, throw error', () => {
    const { plugin: edgeBundling } = graph.pluginController.pluginMap.get('edgeBundling');

    const data2 = {
      nodes: [{ id: 'n0' }, { id: 'n1' }],
      edges: [{ source: 'n0', target: 'n1' }],
    };

    /**
     *
     */
    function fn() {
      edgeBundling.updateBundling({
        data: data2,
      });
    }
    expect(fn).toThrowError('please layout the graph or assign x and y for nodes first');
    edgeBundling.destroy();
    graph.destroy();
  });
});
