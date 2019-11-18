const expect = require('chai').expect;
const G6 = require('../../../src');
const data = require('./data.json');

const div = document.createElement('div');
div.id = 'mds-layout';
document.body.appendChild(div);

describe.only('mds', () => {
  it('mds layout with default configs', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'mds'
      },
      width: 500,
      height: 500
    });
    graph.data(data);
    graph.render();
    expect(data.nodes[0].x != null).to.equal(true);
    graph.destroy();
  });

  it('mds with fixed link length', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'mds',
        center: [ 250, 250 ],
        linkDistance: 120
      },
      width: 500,
      height: 500
    });
    graph.data(data);
    graph.render();
    expect(data.nodes[0].x != null).to.equal(true);
    graph.destroy();
  });
});
