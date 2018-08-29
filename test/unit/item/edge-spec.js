const Graph = require('../../../src/graph');
const chai = require('chai');
const expect = chai.expect;
const chaiAlmost = require('chai-almost');
const Util = require('../../../src/util/');
const div = document.createElement('div');
const data = require('../../fixtures/sample-graph-data.json');
chai.use(chaiAlmost());
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
  it('labeloffset', () => {
    const edge = graph.find('node2->node1');
    graph.update(edge, {
      label: 'node2->node1',
      labelOffsetX: 10,
      labelOffsetY: 10
    });
    expect(edge.getLabel().attr('x')).to.almost.eql(162.23606797749977);
    expect(edge.getLabel().attr('y')).to.almost.eql(136.11803398874991);
  });
  it('destroy', () => {
    graph.destroy();
  });
});
