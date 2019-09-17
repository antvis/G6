const expect = require('chai').expect;
const G6 = require('../../../src');

// const Util = require('../../../src/util');

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

const data = {
  nodes: [
    {
      id: '0'
    },
    {
      id: '1'
    }
  ],
  edges: [
  ]
};

describe('random by default', () => {
  it('new graph without layout', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500
    });
    graph.data(data);
    graph.render();
    expect(graph.getNodes()[0].getModel().x).not.to.be.undefined;
    expect(graph.getNodes()[0].getModel().y).not.to.be.undefined;
    expect(graph.getNodes()[1].getModel().x).not.to.be.undefined;
    expect(graph.getNodes()[1].getModel().y).not.to.be.undefined;
  });
});
