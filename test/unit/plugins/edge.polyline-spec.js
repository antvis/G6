const G6 = require('../../../src/index');
const expect = require('chai').expect;
require('../../../plugins/edge.polyline/');
const div = document.createElement('div');
document.body.appendChild(div);
div.setAttribute('data-test-spec', 'plugin/edge.polyline-spec.js');

describe('edge polyline test', () => {
  it('polyline', () => {
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
        shape: 'polyline'
      }]
    };
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500
    });
    graph.read(data);
    expect(graph.find('node1->node2').getKeyShape().attr('path')).deep.eql([
      [
        'M',
        119.88792125297931,
        195.0280196867552
      ],
      [
        'L',
        130.5,
        195.0280196867552
      ],
      [
        'L',
        130.5,
        154.9719803132448
      ],
      [
        'L',
        280.1120787470207,
        154.9719803132448
      ]
    ]);
    graph.destroy();
  });
  it('polyline-round', () => {
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
        shape: 'polyline-round'
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
        119.88792125297931,
        195.0280196867552
      ],
      [
        'L',
        121.5,
        195.0280196867552
      ],
      [
        'Q',
        130.5,
        195.0280196867552,
        130.5,
        186.0280196867552
      ],
      [
        'L',
        130.5,
        186.0280196867552
      ],
      [
        'L',
        130.5,
        163.9719803132448
      ],
      [
        'Q',
        130.5,
        154.9719803132448,
        139.5,
        154.9719803132448
      ],
      [
        'L',
        139.5,
        154.9719803132448
      ],
      [
        'L',
        280.1120787470207,
        154.9719803132448
      ]
    ]);
    graph.destroy();
  });
});
