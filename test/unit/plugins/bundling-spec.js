const expect = require('chai').expect;
const G6 = require('../../../src');
const Circular = require('../../../plugins/circular');
const Bundling = require('../../../plugins/bundling');
const data = require('./data.json');

const div = document.createElement('div');
div.id = 'force-layout';
document.body.appendChild(div);

// function mathEqual(a, b) {
//   return Math.abs(a - b) < 1;
// }

describe('edge bundling', () => {
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    defaultNode: { size: 10 }
  });
  it('edge bundling on circular layout with default configs', () => {
    const circularLayout = new Circular({ center: [ 250, 250 ] });
    circularLayout.initPlugin(graph);
    circularLayout.layout(data);

    const bundle = new Bundling();
    bundle.initPlugin(graph);
    bundle.bundling(data);

    expect(data.edges[0].shape).to.equal('polyline');
    expect(data.edges[0].controlPoints.length > 2).to.equal(true);
  });

  it('bundling on circular with fixed bundleThreshold and iterations', () => {
    const circularLayout = new Circular({ center: [ 250, 250 ] });
    circularLayout.initPlugin(graph);
    circularLayout.layout(data);

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
    const circularLayout = new Circular({ center: [ 250, 250 ] });
    circularLayout.initPlugin(graph);
    circularLayout.layout(data);

    const bundle = new Bundling();
    bundle.initPlugin(graph);
    bundle.bundling(data);

    data.nodes = [
      { id: '0', x: 10, y: 100 }, { id: '1', x: 100, y: 100 }, { id: '2', x: 10, y: 10 }
    ];
    data.edges = [
      { source: '0', target: '1' },
      { source: '1', target: '2' },
      { source: '0', target: '2' }
    ];

    bundle.updateBundling({
      bundleThreshold: 0.1,
      iterations: 120,
      data
    });

    expect(data.edges[0].shape).to.equal('polyline');
    expect(data.edges[0].controlPoints.length > 2).to.equal(true);
  });

  it('bundling no position info, throw error', () => {
    const bundle = new Bundling();
    bundle.initPlugin(graph);

    function fn() {
      bundle.bundling(data);
    }
    // bundle.bundling(data);
    // expect(() => bundle.bundling(data)).to.throw('please layout the graph or assign x and y for nodes first');
    expect(() => bundle.bundling(data)).to.Throw();
    expect(fn).to.Throw();

  });
});
