const expect = require('chai').expect;
const G6 = require('../../../src');
const Radial = require('../../../plugins/radial');
const data = require('./data.json');

const div = document.createElement('div');
div.id = 'radial-layout';
document.body.appendChild(div);

function mathEqual(a, b) {
  return Math.abs(a - b) < 1;
}

describe('radial layout', () => {

  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500
  });
  it('radial layout with default configs', done => {
    const radial = new Radial({
      center: [ 250, 250 ]
    });
    radial.initPlugin(graph);
    radial.layout(data);
    expect(mathEqual(data.nodes[0].x, 250)).to.equal(true);
    expect(mathEqual(data.nodes[0].y, 250)).to.equal(true);
    done();
  });

  it('radial with fixed focusNode, unit radius, link length, and max iteration', done => {
    const unitRadius = 100;
    const radial = new Radial({
      center: [ 250, 250 ],
      maxIteration: 10,
      focusNode: data.nodes[2],
      unitRadius,
      linkDistance: 100
    });
    radial.initPlugin(graph);
    radial.layout(data);
    expect(mathEqual(data.nodes[2].x, 250)).to.equal(true);
    expect(mathEqual(data.nodes[2].y, 250)).to.equal(true);
    const vx = data.nodes[0].x - data.nodes[2].x;
    const vy = data.nodes[0].y - data.nodes[2].y;
    const distToFocus = Math.sqrt(vx * vx + vy * vy);
    expect(mathEqual(distToFocus % unitRadius - unitRadius, 0)
      || mathEqual(distToFocus % unitRadius, 0)).to.equal(true);
    done();
  });

  it('radial with fixed id focusNode', done => {
    const radial = new Radial({
      center: [ 250, 250 ],
      focusNode: 'Belgium'
    });
    let focusNodeIndex = -1;
    data.nodes.forEach((node, i) => {
      if (node.id === 'Belgium') focusNodeIndex = i;
      return;
    });
    radial.initPlugin(graph);
    expect(mathEqual(data.nodes[focusNodeIndex].x, 250)).to.equal(true);
    expect(mathEqual(data.nodes[focusNodeIndex].y, 250)).to.equal(true);
    done();
  });

  it('radial update cfg and data', done => {
    const radial = new Radial({
      center: [ 250, 250 ],
      maxIteration: 120
    });
    radial.initPlugin(graph);
    radial.layout(data);
    data.nodes = [
      { id: '0' }, { id: '1' }, { id: '2' }
    ];
    data.edges = [
      { source: '0', target: '1' },
      { source: '1', target: '2' },
      { source: '0', target: '2' }
    ];
    const newUnitRadius = 80;
    radial.updateLayout({ center: [ 100, 150 ], unitRadius: newUnitRadius, linkDistance: 70, focusNode: data.nodes[1], data });
    expect(mathEqual(data.nodes[1].x, 100)).to.equal(true);
    expect(mathEqual(data.nodes[1].y, 150)).to.equal(true);
    const vx = data.nodes[2].x - data.nodes[1].x;
    const vy = data.nodes[2].y - data.nodes[1].y;
    const distToFocus = Math.sqrt(vx * vx + vy * vy);
    expect(mathEqual(distToFocus % newUnitRadius - newUnitRadius, 0)
     || mathEqual(distToFocus % newUnitRadius, 0)).to.equal(true);
    done();
  });
});
