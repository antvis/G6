const expect = require('chai').expect;
const G6 = require('../../../src');
const MDS = require('../../../plugins/mds');
const data = require('./data.json');

const div = document.createElement('div');
div.id = 'mds-layout';
document.body.appendChild(div);

describe('mds layout', () => {

  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500
  });
  it('mds layout with default configs', done => {
    const mds = new MDS({
      center: [ 250, 250 ]
    });
    mds.initPlugin(graph);
    mds.layout(data);
    expect(data.nodes[0].x != null).to.equal(true);
    done();
  });

  it('mds with fixed link length', done => {
    const mds = new MDS({
      center: [ 250, 250 ],
      linkDistance: 120
    });
    mds.initPlugin(graph);
    expect(data.nodes[0].x != null).to.equal(true);
    done();
  });

  it('mds update cfg and data', done => {
    const data2 = {
      nodes: [
        { id: '0' }, { id: '1' }
      ],
      edges: [
        { source: '0', target: '1' }
      ]
    };
    const mds = new MDS({
      center: [ 250, 250 ],
      linkDistance: 250
    });
    mds.initPlugin(graph);
    mds.layout(data2);
    data2.nodes = [
      { id: '0' }, { id: '1' }, { id: '2' }
    ];
    data2.edges = [
      { source: '0', target: '1' },
      { source: '1', target: '2' },
      { source: '0', target: '2' }
    ];
    mds.updateLayout({ gravity: 100, data: data2 });
    expect(data2.nodes[0].x != null).to.equal(true);
    done();
  });
});
