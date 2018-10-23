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
graph.source(Util.clone(data));
graph.render();

describe('item test', () => {
  it('getParent', () => {
    const node = graph.find('node1');
    const parent = node.getParent();
    expect(parent.id).equal('group1');
  });
  it('destroy', () => {
    graph.destroy();
  });
});
