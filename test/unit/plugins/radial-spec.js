const expect = require('chai').expect;
const G6 = require('../../../src');
const Radial = require('../../../plugins/radial');
const data = require('./data.json');

const div = document.createElement('div');
div.id = 'radial-layout';
document.body.appendChild(div);

describe('radial layout', () => {

  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500
  });
  it('radial layout with default configs', done => {
    const fruch = new Radial({
      center: [ 250, 250 ]
    });
    fruch.initPlugin(graph);
    fruch.layout(data);
    expect(data.nodes[0].x != null);
    done();
  });

  it('radial with fixed focusNode, unit radius, link length, and max iteration', done => {
    const radial = new Radial({
      center: [ 250, 250 ],
      maxIteration: 10000,
      focusNode: data.nodes[2],
      unitRadius: 100,
      linkDistance: 100
    });
    radial.initPlugin(graph);
    expect(data.nodes[0].x != null);
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
    radial.updateLayout({ unitRadius: 80, linkDistance: 70, focusNode: data.nodes[1], data });
    expect(data.nodes[0].x != null);
    done();
  });
});
