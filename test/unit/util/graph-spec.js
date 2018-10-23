
const expect = require('chai').expect;
const Graph = require('../../../src/graph');
const Util = require('../../../src/util/');
const data = require('../../fixtures/sample-graph-data.json');
const div = document.createElement('div');
div.id = 'cchart';
document.body.appendChild(div);
const graph = new Graph({
  container: div,
  width: 500,
  height: 500
});
graph.read(Util.clone(data));
describe('graph util test', () => {
  it('isNode', () => {
    expect(Util.isNode()).not.equal(true);
    expect(Util.isNode({})).not.equal(true);
    expect(Util.isNode(graph.find('node1'))).equal(true);
  });
  it('isEdge', () => {
    expect(Util.isEdge()).not.equal(true);
    expect(Util.isEdge({})).not.equal(true);
    expect(Util.isEdge(graph.find('node2->node1'))).equal(true);
  });
  it('destroy', () => {
    graph.destroy();
  });
});
