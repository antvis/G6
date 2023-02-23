import G6 from '../../src/index';
import { Behavior } from '../../src/types/behavior';
import { extend } from '../../src/util/extend';
const container = document.createElement('div');
document.querySelector('body').appendChild(container);


describe('click-select', () => {
  it('x', () => {
    const graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      data: {
        nodes: [
          { id: 'node1', data: { x: 100, y: 200, keyShape: { fill: "#0f0" } } },
          { id: 'node2', data: { x: 200, y: 250, keyShape: { fill: "#f00" } } }
        ],
        edges: [
          { id: 'edge1', source: 'node1', target: 'node2', data: { keyShape: { stroke: '#00f', lineWidth: 5 } } }
        ]
       },
      modes: {
        default: [ 'click-select' ],
      },
    });
    expect(true).toBe(true);
  });
});
