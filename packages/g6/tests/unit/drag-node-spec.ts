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
          { id: 'node2', data: { x: 200, y: 250, keyShape: { fill: "#f00" } } },
          { id: 'node3', data: { x: 200, y: 100, keyShape: { fill: "#00f" } } },
        ],
        edges: [
          { id: 'edge1', source: 'node1', target: 'node2', data: { keyShape: { stroke: '#00f', lineWidth: 5 } } }
        ]
      },
      nodeState: {
        selected: {
          keyShape: {
            stroke: '#0f0',
            lineWidth: 2
          }
        },
        highlight: {
          keyShape: {
            stroke: '#00f',
            r: 30,
            opacity: 0.5
          }
        }
      },
      modes: {
        default: [ {
          type: 'drag-node',
          key: '1',
          enableTransient: true,
          // hideRelatedEdges: true,
          // enableDelegate: true,
          // debounce: 50,
        }, { type: 'click-select', key: '2', eventName: 'selected', multiple: true, trigger: 'shift' } ],
      },
    });
    graph.on('selected', console.log);
    expect(true).toBe(true);
  });
});
