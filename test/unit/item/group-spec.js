const Graph = require('../../../src/graph');
const Util = require('../../../src/util/');
const expect = require('chai').expect;
const div = document.createElement('div');
let data = require('../../fixtures/sample-graph-data.json');
data = Util.cloneDeep(data);
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
data.edges.push({
  id: 'node1->node4',
  target: 'node1',
  source: 'node4'
});
graph.source(data);
graph.render();

describe('group item test', () => {
  it('getCrossEdges', () => {
    expect(graph.find('group1').getCrossEdges().length).eql(1);
  });
  it('getInnerEdges', () => {
    expect(graph.find('group1').getInnerEdges().length).eql(2);
  });
  it('destroy', () => {
    graph.destroy();
  });
});
