const G6 = require('../../../src/index');
const expect = require('chai').expect;
const Util = G6.Util;
require('../../../plugins/util.extractSubgraph/');
describe('extract subgraph test', () => {
  const data = {
    nodes: [{
      id: 'node1',
      x: 100,
      y: 200
    }, {
      id: 'node2',
      x: 300,
      y: 200
    }, {
      id: 'node3',
      x: 400,
      y: 200
    }],
    edges: [{
      target: 'node2',
      source: 'node1'
    }, {
      target: 'node3',
      source: 'node2'
    }]
  };
  const div = document.createElement('div');
  document.body.appendChild(div);
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500
  });
  graph.read(data);

  it('double direction subgraph about node2', () => {
    const node = graph.find('node2');
    const {
      reNodes,
      reEdges
    } = Util.extract('bi', [ node ]);
    expect(reNodes.length).eql(3);
    expect(reEdges.length).eql(2);
  });
  it('in direction subgraph about node2', () => {
    const node = graph.find('node2');
    const {
      reNodes,
      reEdges
    } = Util.extract('in', [ node ]);
    expect(reNodes.length).eql(2);
    expect(reEdges.length).eql(1);
  });
  it('out direction subgraph about node2', () => {
    const node = graph.find('node2');
    const {
      reNodes,
      reEdges
    } = Util.extract('out', [ node ]);
    expect(reNodes.length).eql(2);
    expect(reEdges.length).eql(1);
  });
  it('graph destroy', () => {
    graph.destroy();
    expect(div.childNodes.length).equal(0);
  });
});
