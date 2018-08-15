const G6 = require('../../../src/index');
const expect = require('chai').expect;
const Util = G6.Util;
require('../../../plugins/edge.quadraticCurve/');
document.body.appendChild(Util.createDOM(`
  <div id='mountNode'></div>
`));
describe('edge quadraticCurve test', () => {
  it('quadraticCurve', () => {
    const data = {
      nodes: [{
        id: 'node1',
        x: 100,
        y: 200
      }, {
        id: 'node2',
        x: 300,
        y: 150
      }],
      edges: [{
        id: 'node1->node2',
        target: 'node2',
        source: 'node1',
        shape: 'quadraticCurve'
      }]
    };
    const graph = new G6.Graph({
      container: 'mountNode',
      width: 500,
      height: 500
    });
    graph.read(data);
    expect(graph.find('node1->node2').getKeyShape().attr('path')).deep.eql([
      [
        'M',
        120.31067823928494,
        202.77963117341807
      ],
      [
        'Q',
        210.0140098433776,
        215.05603937351034,
        283.3868750469453,
        162.01058197150297
      ]
    ]);
    graph.destroy();
  });
});
