import G6, { GraphData } from '@antv/g6';
import { data } from './data';
import Bundling from '../../src/bundling';

const div = document.createElement('div');
div.id = 'force-layout';
document.body.appendChild(div);

describe('edge bundling', () => {
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    layout: {
      type: 'circular',
    },
    defaultNode: { size: 10 },
  });

  graph.data(data);
  graph.render();

  it('edge bundling on circular layout with default configs', () => {
    const bundle = new Bundling();
    bundle.initPlugin(graph);

    const graphData = graph.save() as GraphData;
    bundle.bundling(graphData);

    expect(graphData.edges[0].type).toEqual('polyline');
    expect(graphData.edges[0].controlPoints.length > 2).toEqual(true);
    bundle.destroy();
  });

  it('bundling on circular with fixed bundleThreshold and iterations', () => {
    const bundle = new Bundling({
      iterations: 120,
      bundleThreshold: 0.1,
    });
    bundle.initPlugin(graph);

    const graphData = graph.save() as GraphData;
    bundle.bundling(graphData);

    expect(graphData.edges[0].type).toEqual('polyline');
    expect(graphData.edges[0].controlPoints.length > 2).toEqual(true);
    bundle.destroy();
  });

  it('bundling update', () => {
    const data2: GraphData = {
      nodes: [{ id: 'n0' }, { id: 'n1' }],
      edges: [{ source: 'n0', target: 'n1' }],
    };
    graph.changeData(data2);
    graph.on('afterlayout', () => {
      const bundle = new Bundling();
      bundle.initPlugin(graph);
      bundle.bundling(data2);

      data2.nodes = [
        { id: 'n0', x: 10, y: 100 },
        { id: 'n1', x: 100, y: 100 },
        { id: 'n2', x: 10, y: 10 },
      ];

      data2.edges = [
        { source: 'n0', target: 'n1' },
        { source: 'n1', target: 'n2' },
        { source: 'n0', target: 'n2' },
      ];

      bundle.updateBundling({
        bundleThreshold: 0.1,
        iterations: 120,
        data: data2,
      });

      expect(data2.edges[0].type).toEqual('polyline');
      expect(data2.edges[0].controlPoints.length > 2).toEqual(true);
      bundle.destroy();
    });
  });

  it('bundling no position info, throw error', () => {
    const bundle = new Bundling();
    bundle.initPlugin(graph);

    const data2: GraphData = {
      nodes: [{ id: 'n0' }, { id: 'n1' }],
      edges: [{ source: 'n0', target: 'n1' }],
    };

    function fn() {
      bundle.bundling(data2);
    }
    expect(fn).toThrowError('please layout the graph or assign x and y for nodes first');
    bundle.destroy();
    graph.destroy();
  });
});
