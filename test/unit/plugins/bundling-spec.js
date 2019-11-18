const expect = require('chai').expect;
const G6 = require('../../../src');
const Bundling = require('../../../plugins/bundling');
const data = require('./data.json');

const div = document.createElement('div');
div.id = 'force-layout';
document.body.appendChild(div);

describe.only('edge bundling', () => {
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    layout: {
      type: 'circular'
    },
    defaultNode: { size: 10 }
  });
  graph.data(data);
  graph.render();
  it('edge bundling on circular layout with default configs', () => {
    const bundle = new Bundling();
    bundle.initPlugin(graph);
    bundle.bundling(data);

    expect(data.edges[0].shape).to.equal('polyline');
    expect(data.edges[0].controlPoints.length > 2).to.equal(true);
  });

  it('bundling on circular with fixed bundleThreshold and iterations', () => {
    const bundle = new Bundling({
      bundleThreshold: 0.1,
      iterations: 120
    });
    bundle.initPlugin(graph);
    bundle.bundling(data);

    expect(data.edges[0].shape).to.equal('polyline');
    expect(data.edges[0].controlPoints.length > 2).to.equal(true);
  });

  it('bundling update', () => {
    const data2 = {
      nodes: [
        { id: 'n0' }, { id: 'n1' }
      ],
      edges: [
        { source: 'n0', target: 'n1' }
      ]
    };
    graph.changeData(data2);

    const bundle = new Bundling();
    bundle.initPlugin(graph);
    bundle.bundling(data2);

    data2.nodes = [
      { id: 'n0', x: 10, y: 100 }, { id: 'n1', x: 100, y: 100 }, { id: 'n2', x: 10, y: 10 }
    ];
    data2.edges = [
      { source: 'n0', target: 'n1' },
      { source: 'n1', target: 'n2' },
      { source: 'n0', target: 'n2' }
    ];

    bundle.updateBundling({
      bundleThreshold: 0.1,
      iterations: 120,
      data: data2
    });

    expect(data2.edges[0].shape).to.equal('polyline');
    expect(data2.edges[0].controlPoints.length > 2).to.equal(true);
  });

  it('bundling no position info, throw error', () => {
    const bundle = new Bundling();
    bundle.initPlugin(graph);

    function fn() {
      bundle.bundling(data);
    }
    expect(fn).to.throw;
    graph.destroy();
  });
});
