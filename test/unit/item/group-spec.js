const Graph = require('../../../src/graph');
const chai = require('chai');
const expect = chai.expect;
const chaiAlmost = require('chai-almost');
const Util = require('../../../src/util/');
const div = document.createElement('div');
let data = require('../../fixtures/sample-graph-data.json');
chai.use(chaiAlmost());
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
  it('labeloffset', () => {
    const group = graph.find('group1');
    graph.update(group, {
      label: 'group1',
      labelOffsetX: 10,
      labelOffsetY: 10
    });
    expect(group.getLabel().attr('x')).to.almost.eql(87.5);
    expect(group.getLabel().attr('y')).to.almost.eql(57.5);
  });
  it('destroy', () => {
    graph.destroy();
  });
});
