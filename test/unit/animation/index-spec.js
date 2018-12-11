const G6 = require('../../../src/index');
// const chai = require('chai');
// const expect = chai.expect;
const Util = G6.Util;
const Animation = require('../../../src/animation/');
const div = document.createElement('div');
document.body.appendChild(div);

describe('animation test', () => {
  const data = {
    nodes: [{
      id: 'node1',
      x: 100,
      y: 200
    }, {
      id: 'node2',
      x: 300,
      y: 200
    }],
    edges: [{
      target: 'node2',
      source: 'node1'
    }]
  };
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500
  });
  graph.read(data);
  const item = graph.find('node1');
  const group = item.getGraphicGroup();
  it('all', () => {
    Util.each(Animation, animation => {
      animation({ item, element: group, done: () => {} });
    });
    graph.destroy();
  });
});
