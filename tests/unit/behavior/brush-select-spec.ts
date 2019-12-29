import '../../../src/behavior'
import '../../../src/shape'
import Graph from '../../../src/graph/graph'

describe('brush-select', () => {
  const div = document.createElement('div');
  div.id = 'activate-relations-spec';
  document.body.appendChild(div);
  const graph = new Graph({
    container: div,
    width: 500,
    height: 500,
    pixelRatio: 2,
    modes: { default: [ 'zoom-canvas' ] }
  });
  const node1 = graph.addItem('node', { id: 'node1', x: 100, y: 100, label: 'node1' });
  const node2 = graph.addItem('node', { id: 'node2', x: 200, y: 200, label: 'node2' });
  const node3 = graph.addItem('node', { id: 'node3', x: 80, y: 150, label: 'node3' });
  graph.addItem('edge', { source: 'node1', target: 'node2' });
  const edge1 = graph.addItem('edge', { source: 'node1', target: 'node3' });
  it('default configs', () => {
    graph.addBehaviors([ 'brush-select' ], 'default');
    graph.emit('keydown', { canvasX: 20, canvasY: 20, key: 'shift' });
    graph.emit('mousedown', { canvasX: 20, canvasY: 20 });
    graph.emit('mousemove', { canvasX: 120, canvasY: 120 });
    // 只选中一个节点，没有边被选中
    graph.emit('mouseup', { canvasX: 120, canvasY: 120, x: 120, y: 120 });
    let selectedNodes = graph.findAllByState('node', 'selected');
    expect(selectedNodes.length).toEqual(1);
    expect(selectedNodes[0] === node1).toBe(true);

    let selectedEdges = graph.findAllByState('edge', 'selected');
    expect(selectedEdges.length).toEqual(0);

    // 选中两个节点，一条边
    graph.emit('keydown', { canvasX: 20, canvasY: 20 });
    graph.emit('mousedown', { canvasX: 20, canvasY: 20 });
    graph.emit('mouseup', { canvasX: 120, canvasY: 160, x: 120, y: 160 });

    selectedNodes = graph.findAllByState('node', 'selected');
    expect(selectedNodes.length).toEqual(2);
    expect(selectedNodes[1] === node3).toBe(true);

    selectedEdges = graph.findAllByState('edge', 'selected');
    expect(selectedEdges.length).toEqual(1);
    expect(selectedEdges[0] === edge1).toBe(true);

    graph.emit('canvas:click');
    selectedNodes = graph.findAllByState('node', 'selected');
    expect(selectedNodes.length).toEqual(0);

    selectedEdges = graph.findAllByState('edge', 'selected');
    expect(selectedEdges.length).toEqual(0);

    graph.translate(200, 200);
    graph.emit('mousedown', { canvasX: 20, canvasY: 20 });
    graph.emit('mousemove', { canvasX: 120, canvasY: 120 });
    graph.emit('mouseup', { canvasX: 120, canvasY: 120, x: -80, y: -80 });
    selectedNodes = graph.findAllByState('node', 'selected');
    expect(selectedNodes.length).toEqual(0);
    // translate到圆点，以防影响后续的测试
    graph.translate(-200, -200);
    graph.removeBehaviors([ 'brush-select' ], 'default');
  });
  it('modify cfgs', () => {
    let triggered = false;
    graph.translate(-200, -200);
    graph.addBehaviors([{
      type: 'brush-select',
      selectedState: 'customState',
      includeEdges: false,
      trigger: 'drag',
      onSelect() {
        triggered = true;
      }
    }], 'default');
    graph.emit('mousedown', { canvasX: -110, canvasY: -120 });
    graph.emit('mousemove', { canvasX: 300, canvasY: 300 });
    graph.emit('mouseup', { canvasX: 300, canvasY: 300, x: 300, y: 300 });
    let selectedNodes = graph.findAllByState('node', 'customState');
    expect(selectedNodes.length).toEqual(2);
    expect(selectedNodes[0] === node1).toBe(true);
    expect(selectedNodes[1] === node2).toBe(true);

    const selectedEdges = graph.findAllByState('edge', 'customState');
    expect(selectedEdges.length).toEqual(0);

    graph.emit('canvas:click');
    selectedNodes = graph.findAllByState('node', 'customState');
    expect(selectedNodes.length).toEqual(0);
    expect(triggered).toBe(true);
  });
});
