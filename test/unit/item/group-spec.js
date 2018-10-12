const Graph = require('../../../src/graph');
const chai = require('chai');
const expect = chai.expect;
const chaiAlmost = require('chai-almost');
const Util = require('../../../src/util/');
const div = document.createElement('div');
let data = require('../../fixtures/sample-graph-data.json');
chai.use(chaiAlmost(0.1));
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
  it('label offset', () => {
    const group = graph.find('group1');
    graph.update(group, {
      label: 'group1',
      labelOffsetX: 10,
      labelOffsetY: 10
    });
    expect(group.getLabel().attr('x')).to.almost.eql(87.5);
    expect(group.getLabel().attr('y')).to.almost.eql(57.5);
  });
  it('label rotate', () => {
    const group = graph.find('group1');
    graph.update(group, {
      label: 'group1',
      labelRotate: Math.PI / 2
    });
    expect(group.getLabel().getMatrix()).to.almost.deep.eql([ 6.123233995736766e-17, 1, 0, -1, 6.123233995736766e-17, 0, 170.0079803466797, -43.00798034667969, 1 ]);
  });
  it('destroy', () => {
    graph.destroy();
  });
});
