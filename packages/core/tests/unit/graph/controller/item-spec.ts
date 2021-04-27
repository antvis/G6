import Graph from '../../implement-graph';

const div = document.createElement('div');
div.id = 'item-controller';
document.body.appendChild(div);

describe('item controller', () => {
  const graph = new Graph({
    container: div,
    width: 500,
    height: 500,
    nodeStateStyles: {
      select: {},
      hover: {},
    },
  });
  it('init item controller', () => {
    const itemController = graph.get('itemController');
    expect(itemController).not.toBe(false);
  });

  it('add & remove node', () => {
    const node = graph.addItem('node', {
      type: 'circle',
      color: '#ccc',
      style: { x: 50, y: 50, r: 20, lineWidth: 2 },
    });
    expect(node).not.toBe(undefined);

    const nodes = graph.get('nodes');
    expect(nodes.length).toBe(1);

    expect(nodes[0]).toEqual(node);

    const node2 = graph.addItem('node', {
      type: 'rect',
      id: 'node0',
      color: '#666',
      style: { x: 100, y: 100, width: 100, height: 70 },
    });
    expect(node2).not.toBe(undefined);

    expect(nodes.length).toBe(2);

    expect(nodes[1]).toEqual(node2);

    graph.removeItem(node);

    expect(nodes.length).toBe(1);
    expect(nodes[0]).toEqual(node2);

    graph.removeItem(node2);
    expect(nodes.length).toBe(0);
  });
  it('remove node with multiple edges', () => {
    const node1 = graph.addItem('node', {
      id: 'node1',
      color: '#ccc',
      style: { x: 50, y: 50, r: 20, lineWidth: 2 },
    });
    const node2 = graph.addItem('node', {
      id: 'node2',
      type: 'circle',
      color: '#ccc',
      style: { x: 50, y: 150, r: 20, lineWidth: 2 },
    });
    graph.addItem('node', {
      id: 'node3',
      type: 'circle',
      color: '#ccc',
      style: { x: 50, y: 200, r: 20, lineWidth: 2 },
    });

    graph.addItem('edge', { id: 'edge1', source: 'node1', target: 'node2', type: 'line' });
    graph.addItem('edge', { id: 'edge2', source: 'node1', target: 'node3' });

    expect(node1.getEdges().length).toBe(2);
    expect(node2.getEdges().length).toBe(1);
    expect(graph.findById('edge1')).not.toBe(undefined);
    expect(graph.findById('edge2')).not.toBe(undefined);

    graph.removeItem(node1);

    expect(graph.findById('edge1')).toBe(undefined);
    expect(graph.findById('edge2')).toBe(undefined);
    expect(node2.getEdges().length).toBe(0);
    graph.clear();
  });
  it('add & remove edge', () => {
    graph.set('itemMap', {});
    const node1 = graph.addItem('node', {
      type: 'circle',
      color: '#ccc',
      x: 50,
      y: 50,
      size: 20,
      style: { lineWidth: 2 },
    });
    const node2 = graph.addItem('node', {
      type: 'rect',
      id: 'node4',
      x: 100,
      y: 100,
      color: '#666',
      size: [100, 70],
    });
    const edge = graph.addItem('edge', {
      id: 'edge3',
      source: node1.getID(),
      target: 'node4',
    });

    expect(graph.get('edges').length).toEqual(1);
    expect(graph.get('edges')[0]).toEqual(edge);

    expect(Object.keys(graph.get('itemMap')).length).toEqual(3);

    expect(graph.get('itemMap').edge3).toEqual(edge);
    expect(node1.getEdges().length).toEqual(1);
    expect(node2.getEdges().length).toEqual(1);
    graph.removeItem(edge);
    expect(graph.get('edges').length).toEqual(0);
  });
  // it('add edge of nodes that do not exist', () => {
  //   expect(graph.addItem('edge', { id: 'edge', source: 'notExist', target: 'notExist' })).not.toEqual(new Error());
  // });
  it('update', () => {
    const node = graph.addItem('node', {
      id: 'node5',
      x: 100,
      y: 100,
      size: 50,
      color: '#ccc',
      type: 'circle',
    });
    const group = node.get('group');
    let matrix = group.getMatrix();
    expect(matrix[6]).toBe(100);
    expect(matrix[7]).toBe(100);

    graph.update('node5', { x: 150, y: 150 });
    matrix = node.get('group').getMatrix();

    expect(matrix[6]).toBe(150);
    expect(matrix[7]).toBe(150);

    graph.update(node, { style: { fill: '#ccc' } });
    const shape = node.get('keyShape');
    expect(shape.attr('fill')).toEqual('#ccc');
  });
  it('fresh graph', done => {
    graph.clear();
    const node = graph.addItem('node', { id: 'node6', x: 100, y: 100, size: 50 });
    const node2 = graph.addItem('node', { id: 'node7', x: 100, y: 200, size: 50 });
    const node3 = graph.addItem('node', { id: 'node8', x: 300, y: 100, size: 50 });
    const edge = graph.addItem('edge', { id: 'edge4', source: 'node6', target: 'node7' });
    graph.paint();

    let path = edge.get('keyShape').attr('path');

    expect(path[0][1]).toBe(100);
    expect(path[0][2]).toBe(125.5);
    expect(path[1][1]).toBe(100);
    expect(path[1][2]).toBe(174.5);
    edge.setTarget(node3);
    graph.refresh();
    setTimeout(() => {
      path = edge.get('keyShape').attr('path');
      expect(path[0][1]).toBe(125.5);
      expect(path[0][2]).toBe(100);
      expect(path[1][1]).toBe(274.5);
      expect(path[1][2]).toBe(100);
      done();
    }, 800);
  });
  it('show & hide item', () => {
    const node = graph.addItem('node', { id: 'node9', x: 100, y: 100, size: 50 });
    const node2 = graph.addItem('node', { id: 'node10', x: 100, y: 100, size: 50 });
    const edge = graph.addItem('edge', { id: 'edge5', source: 'node9', target: 'node10' });
    graph.hideItem('node9');

    expect(node.isVisible()).toBe(false);
    expect(edge.isVisible()).toBe(false);

    graph.showItem(node);

    expect(node.isVisible()).toBe(true);
    expect(edge.isVisible()).toBe(true);
  });

  it('setItemState & clearItemStates', () => {
    const node = graph.addItem('node', { id: 'node11', x: 100, y: 100, size: 50 });
    const node2 = graph.addItem('node', { id: 'node12', x: 100, y: 100, size: 50 });

    graph.setItemState(node, 'select', true);
    expect(node.hasState('select')).toBe(true);
    expect(node2.hasState('select')).toBe(false);

    graph.clearItemStates(node, ['select']);
    expect(node.hasState('select')).toBe(false);

    graph.setItemState(node2, 'hover', true);
    expect(node2.hasState('hover')).toBe(true);

    graph.clearItemStates(node2, ['hover']);
    expect(node2.hasState('hover')).toBe(false);
  });
});
