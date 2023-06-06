const Graph = require('../../../src/graph');
const expect = require('chai').expect;
const Util = require('../../../src/util/');
const div = document.createElement('div');
const data = require('../../fixtures/sample-graph-data.json');
div.id = 'cchart';
document.body.appendChild(div);
data.nodes.forEach(node => {
  node.label = node.id;
});
const graph = new Graph({
  container: div,
  width: 500,
  height: 500
});
graph.source(Util.cloneDeep(data));
graph.render();

describe('edge item test', () => {
  it('getSource', () => {
    const edge = graph.find('node2->node1');
    expect(edge.getSource().id).equal('node2');
  });
  it('getTarget', () => {
    const edge = graph.find('node2->node1');
    expect(edge.getTarget().id).equal('node1');
  });
  it('destroy', () => {
    graph.destroy();
  });
});
