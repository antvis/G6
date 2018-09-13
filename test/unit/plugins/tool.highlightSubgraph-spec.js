const G6 = require('../../../src/index');
const Highlighter = require('../../../plugins/tool.highlightSubgraph/');
const expect = require('chai').expect;

describe('highlight subgraph test', () => {
  const highlighter = new Highlighter();
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
    height: 500,
    plugins: [ highlighter ]
  });
  graph.read(data);
  it('highlight', () => {
    const nodes = graph.getNodes();
    const edges = graph.getEdges();
    const reNodes = [ nodes[0], nodes[1] ];
    const reEdges = [ edges[0] ];
    graph.highlightSubgraph(reNodes.concat(reEdges));
    const mask = graph.find('mask');
    expect(mask.isVisible()).eql(true);
    graph.translate(100, 0);
  });
  it('unhighlight', () => {
    graph.unhighlightGraph();
    const mask = graph.find('mask');
    expect(mask.isVisible()).eql(false);
  });
  it('highlight again', () => {
    const nodes = graph.getNodes();
    const reNodes = [ nodes[0] ];
    const reEdges = [ ];
    graph.highlightSubgraph(reNodes.concat(reEdges));
    const mask = graph.find('mask');
    expect(mask.isVisible()).eql(true);
  });
  it('graph destroy', () => {
    graph.destroy();
    expect(div.childNodes.length).equal(0);
  });
});
