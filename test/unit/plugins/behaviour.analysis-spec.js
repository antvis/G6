const G6 = require('../../../src/index');
const expect = require('chai').expect;
const Util = G6.Util;
require('../../../plugins/behaviour.analysis/');
document.body.appendChild(Util.createDOM(`
  <div id='mountNode'></div>
`));
describe('behaviour analysis test', () => {
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
    container: 'mountNode',
    width: 500,
    height: 500,
    modes: {
      default: [ 'panCanvas' ]
    }
  });
  graph.read(data);
  it('panCanvas', () => {

  });
});
