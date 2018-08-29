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
graph.source(Util.cloneDeep(data));
graph.render();

describe('node item test', () => {
  it('getInEdges', () => {
    const node = graph.find('node1');
    expect(node.getInEdges().length).equal(1);
  });
  it('getOutEdges', () => {
    const node = graph.find('node1');
    expect(node.getOutEdges().length).equal(0);
  });
  it('getBBox', () => {
    const node = graph.find('node1');
    expect(node.getBBox()).to.deep.equal({
      centerX:
      100,
      centerY:
      100,
      height:
      41,
      maxX:
      120.5,
      maxY:
      120.5,
      minX:
      79.5,
      minY:
      79.5,
      width:
      41
    });
  });
  it('labeloffset', () => {
    const node = graph.find('node1');
    graph.update(node, {
      label: 'node1',
      labelOffsetX: 10,
      labelOffsetY: 10
    });
    expect(node.getLabel().attr('x')).to.almost.eql(10);
    expect(node.getLabel().attr('y')).to.almost.eql(10);
  });
  it('destroy', () => {
    graph.destroy();
  });
});
