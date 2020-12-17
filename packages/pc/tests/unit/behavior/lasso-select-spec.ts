import '../../../src/behavior';
// import '../../../src/shape';
import Graph from '../../../src/graph/graph';

describe('lasso-select', () => {
  const div = document.createElement('div');
  div.id = 'lasso-select-spec';
  document.body.appendChild(div);
  const data = {
    nodes: [
      { id: 'node1', x: 100, y: 100, label: 'node1' },
      { id: 'node2', x: 120, y: 80 },
      { id: 'node3', x: 150, y: 150 },
    ],
    edges: [
      { id: 'edge1', source: 'node1', target: 'node2' },
      { id: 'edge2', source: 'node1', target: 'node3' },
    ],
  };
  const graph = new Graph({
    container: div,
    width: 500,
    height: 500,
    modes: { default: ['lasso-select'] },
  });
  graph.data(data);
  graph.render();
  const node1 = graph.findById('node1');
  const node2 = graph.findById('node2');
  const edge1 = graph.findById('edge1');

  it('default configs', () => {
    graph.addBehaviors(['lasso-select'], 'default');

    // 模拟选中node1
    graph.emit('keydown', { canvasX: 20, canvasY: 20, key: 'shift' });
    graph.emit('dragstart', { x: 50, y: 50 });
    graph.emit('drag', { x: 50, y: 120 });
    graph.emit('drag', { x: 110, y: 120 });
    graph.emit('dragend', { x: 110, y: 50 });
    graph.emit('keyup', { key: 'shift' });

    let selectedNodes = graph.findAllByState('node', 'selected');
    expect(selectedNodes.length).toEqual(1);
    expect(selectedNodes[0] === node1).toBe(true);

    let selectedEdges = graph.findAllByState('edge', 'selected');
    expect(selectedEdges.length).toEqual(0);

    // 模拟选中node1, node2, edge1
    graph.emit('keydown', { canvasX: 20, canvasY: 20, key: 'shift' });
    graph.emit('dragstart', { x: 50, y: 50 });
    graph.emit('drag', { x: 50, y: 120 });
    graph.emit('drag', { x: 130, y: 120 });
    graph.emit('drag', { x: 130, y: 50 });
    graph.emit('dragend', { x: 130, y: 50 });
    graph.emit('keyup', { key: 'shift' });

    selectedNodes = graph.findAllByState('node', 'selected');
    expect(selectedNodes.length).toEqual(2);
    expect(selectedNodes.indexOf(node1) > -1).toBe(true);
    expect(selectedNodes.indexOf(node2) > -1).toBe(true);

    selectedEdges = graph.findAllByState('edge', 'selected');
    expect(selectedEdges.length).toEqual(1);
    expect(selectedEdges[0] === edge1).toBe(true);
  });
  it('modify cfgs', () => {
    let triggered = false;
    graph.addBehaviors(
      [
        {
          type: 'lasso-select',
          selectedState: 'customState',
          includeEdges: false,
          trigger: 'drag',
          onSelect() {
            triggered = true;
          },
        },
      ],
      'default',
    );
    graph.emit('keydown', { canvasX: 20, canvasY: 20, key: 'shift' });
    graph.emit('dragstart', { x: 50, y: 50 });
    graph.emit('drag', { x: 50, y: 120 });
    graph.emit('drag', { x: 110, y: 120 });
    graph.emit('dragend', { x: 110, y: 50 });
    graph.emit('keyup', { key: 'shift' });
    let selectedNodes = graph.findAllByState('node', 'customState');
    expect(selectedNodes.length).toEqual(1);
    expect(selectedNodes[0] === node1).toBe(true);

    const selectedEdges = graph.findAllByState('edge', 'customState');
    expect(selectedEdges.length).toEqual(0);
  });
  it('invalid trigger, multiple is false', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'lasso-select',
            trigger: 'abc',
            multiple: false,
          },
        ],
      },
    });
    graph.addItem('node', {
      color: '#666',
      x: 50,
      y: 50,
      size: 20,
      style: { lineWidth: 2, fill: '#666' },
    });
    graph.paint();
    expect(graph.get('modeController').currentBehaves[0].trigger).toEqual('shift');
    graph.destroy();
  });
});
