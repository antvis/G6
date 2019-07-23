const expect = require('chai').expect;
const G6 = require('../../../src');
const Fruchterman = require('../../../plugins/fruchterman');
const data = require('./data.json');

const div = document.createElement('div');
div.id = 'fruchterman-layout';
document.body.appendChild(div);

describe('fruchterman layout', () => {

  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500
  });
  it('fruchterman layout with default configs', done => {
    const fruch = new Fruchterman({
      center: [ 250, 250 ]
    });
    fruch.initPlugin(graph);
    fruch.layout(data);
    expect(data.nodes[0].x != null).to.equal(true);
    done();
  });

  it('fruchterman with fixed gravity and max iteration', done => {
    const fruch = new Fruchterman({
      center: [ 250, 250 ],
      maxIteration: 8000,
      gravity: 100
    });
    fruch.initPlugin(graph);
    expect(data.nodes[0].x != null).to.equal(true);
    done();
  });

  it('fruch update cfg and data', done => {
    const fruch = new Fruchterman({
      center: [ 250, 250 ]
    });
    fruch.initPlugin(graph);
    fruch.layout(data);
    data.nodes = [
      { id: '0' }, { id: '1' }, { id: '2' }
    ];
    data.edges = [
      { source: '0', target: '1' },
      { source: '1', target: '2' },
      { source: '0', target: '2' }
    ];
    fruch.updateLayout({ gravity: 100, data });
    expect(data.nodes[0].x != null).to.equal(true);
    done();
  });
});
