
import G6 from '../../../src'
import '../../../src/behavior'
import { scale, translate } from '../../../src/util/math'
import { GraphData } from '../../../types';

const div = document.createElement('div');
div.id = 'global-spec';
document.body.appendChild(div);

describe('graph', () => {
  const globalGraph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    modes: {
      default: ['drag-node']
    }
  });
  
  it('new & destroy graph', () => {
    const inst = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: ['drag-node']
      }
    });
    const length = div.childNodes.length;

    expect(inst).not.toBe(undefined)
    expect(inst instanceof G6.Graph).toBe(true);
    expect(length > 1).toBe(true);

    expect(inst.get('canvas')).not.toBe(undefined)
    expect(inst.get('group')).not.toBe(undefined)

    expect(inst.get('group').get('className')).toEqual('root-container');
    expect(inst.get('group').get('id').endsWith('-root')).toBe(true);

    const children = inst.get('group').get('children');
    expect(children.length).toBe(4);
    expect(children[1].get('className')).toEqual('edge-container');
    expect(children[0].get('className')).toEqual('custom-group-container');

    const nodes = inst.getNodes();
    expect(nodes).not.toBe(undefined)
    expect(nodes.length).toBe(0);

    const edges = inst.getEdges();
    expect(edges).not.toBe(undefined)
    expect(edges.length).toBe(0);

    const canvas = inst.get('canvas');
    inst.destroy();

    expect(inst.destroyed).toBe(true)
    expect(canvas.destroyed).toBe(true);
    expect(length - div.childNodes.length).toBe(1);
  });

  it('translate', () => {
    const canvasMatrix = globalGraph.get('canvas').getMatrix();
    globalGraph.translate(100, 100);

    const matrix = globalGraph.get('group').getMatrix();

    expect(canvasMatrix).toBe(null)
    expect(matrix[6]).toBe(100);
    expect(matrix[7]).toBe(100);

    globalGraph.get('group').resetMatrix();
  });

  it('zoom', () => {
    globalGraph.zoom(3, { x: 100, y: 100 });

    const matrix = globalGraph.get('group').getMatrix()

    expect(matrix[0]).toBe(3);
    expect(matrix[4]).toBe(3);
    expect(matrix[6]).toBe(-200);
    expect(matrix[7]).toBe(-200);
    expect(globalGraph.getZoom()).toBe(3);

    globalGraph.get('group').resetMatrix();
  });

  it('zoomTo', () => {
    let matrix = globalGraph.get('group').getMatrix();
    expect(matrix).toBe(null);

    globalGraph.zoomTo(2);

    matrix = globalGraph.get('group').getMatrix();
    expect(matrix[0]).toBe(2);
    expect(matrix[4]).toBe(2);
    expect(matrix[6]).toBe(0);
    expect(matrix[7]).toBe(0);

    globalGraph.zoomTo(1.5, { x: 250, y: 250 });
    matrix = globalGraph.get('group').getMatrix();

    expect(matrix[0]).toBe(1.5);
    expect(matrix[4]).toBe(1.5);
    expect(matrix[6]).toBe(62.5);
    expect(matrix[7]).toBe(62.5);
  });

  it('change size', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500
    });

    expect(graph.get('width')).toBe(500)
    expect(graph.get('height')).toBe(500)

    expect(typeof graph.changeSize).toEqual('function');
    graph.changeSize(300, 300);

    expect(graph.get('width')).toBe(300);
    expect(graph.get('height')).toBe(300);
    
    graph.destroy();
  });

  it('data & changeData & save', () => {
    const data = {
      nodes: [{
        id: 'a',
        shape: 'circle',
        color: '#333',
        x: 30,
        y: 30,
        size: 20,
        label: 'a'
      }, {
        id: 'b',
        shape: 'ellipse',
        color: '#666',
        x: 50,
        y: 60,
        size: [ 30, 40 ],
        label: 'b'
      }, {
        id: 'c',
        shape: 'rect',
        color: '#999',
        x: 100,
        y: 70,
        size: 20,
        label: 'c'
      }],
      edges: [{
        source: 'a',
        target: 'b',
        id: 'd'
      }, {
        source: 'a',
        target: 'c',
        id: 'e'
      }]
    };
    globalGraph.data(data);
    globalGraph.render();
    expect(globalGraph.get('nodes').length).toBe(3);
    expect(globalGraph.get('edges').length).toBe(2);
    let map = globalGraph.get('itemMap');
    expect(map.a).not.toBe(undefined);
    expect(map.b).not.toBe(undefined);
    expect(map.c).not.toBe(undefined);
    expect(map.d).not.toBe(undefined);
    const edges = globalGraph.getEdges();
    expect(edges.length).toBe(2);
    const nodes = globalGraph.getNodes();
    expect(nodes.length).toBe(3);
    expect(map.e).not.toBe(undefined);
    data.nodes.splice(0, 1);
    data.edges.splice(0, 1);
    data.edges[0].source = 'b';
    data.nodes.push({
      id: 'f',
      shape: 'circle',
      color: '#333',
      x: 100,
      y: 80,
      size: 30,
      label: 'f'
    });
    globalGraph.changeData(data);
    map = globalGraph.get('itemMap');
    expect(globalGraph.get('nodes').length).toBe(3);
    expect(globalGraph.get('edges').length).toBe(1);
    expect(map.a).toBe(undefined);
    expect(map.b).not.toBe(undefined);
    expect(map.c).not.toBe(undefined);
    expect(map.d).toBe(undefined);
    expect(map.e).not.toBe(undefined);
    expect(map.f).not.toBe(undefined);
    const exported: GraphData = globalGraph.save() as GraphData;
    // expect(JSON.stringify(exported)).not.to.throw;
    expect(exported.nodes.length).toBe(3);
    expect(exported.edges.length).toBe(1);
    const edge = exported.edges[0];
    expect(edge.id).toBe('e');
    expect(edge.source).toBe('b');
    expect(edge.target).toBe('c');
  });

  it('find', () => {
    globalGraph.clear();
    globalGraph.addItem('node', { id: 'node', x: 50, y: 100, size: 50, className: 'test test2' });
    const item = globalGraph.addItem('node', { id: 'node2', x: 100, y: 100, size: 50, className: 'test' });
    
    const findNode = globalGraph.find('node', (node: any) => {
      return node.get('model').x === 100;
    });

    expect(findNode).not.toBe(undefined);
    expect(findNode).toEqual(item);
  });

  it('findAll', () => {
    globalGraph.clear();
    const node1 = globalGraph.addItem('node', { id: 'node', x: 100, y: 100, size: 50, className: 'test test2' });
    const node2 = globalGraph.addItem('node', { id: 'node2', x: 100, y: 100, size: 50, className: 'test' });
    const node3 = globalGraph.addItem('node', { id: 'node2', x: 100, y: 100, size: 50 });
    
    node1.setState('active', true);
    node2.setState('selected', true);
    node3.setState('active', true);

    let nodes = globalGraph.findAllByState('node', 'active');

    expect(nodes.length).toEqual(2);

    expect(nodes[0]).toEqual(node1);
    expect(nodes[1]).toEqual(node3);

    nodes = globalGraph.findAllByState('node', 'selected');
    expect(nodes.length).toEqual(1);
    expect(nodes[0]).toEqual(node2);
  });

  it('refresh positions', () => {
    const data = { id: 'node', x: 100, y: 50, size: 50, className: 'test test2' };
    const node = globalGraph.addItem('node', data);
    const group = node.get('group');
    
    expect(group.getMatrix()[6]).toBe(100);
    expect(group.getMatrix()[7]).toBe(50);

    data.x = 50;
    data.y = 100;

    globalGraph.refreshPositions();
    expect(group.getMatrix()[6]).toBe(50);
    expect(group.getMatrix()[7]).toBe(100);
  });

  it('canvas point & model point convert', () => {
    const group = globalGraph.get('group');
    let point = globalGraph.getPointByCanvas(100, 100);
    expect(point.x).toBe(100);
    expect(point.y).toBe(100);

    translate(group, {
      x: 100,
      y: 100
    });

    point = globalGraph.getPointByCanvas(100, 100);
    expect(point.x).toBe(0);
    expect(point.y).toBe(0);

    scale(group, [1.5, 1.5]);

    point = globalGraph.getPointByCanvas(100, 100);
    expect(point.x).toBe(-33.33333333333334);
    expect(point.y).toBe(-33.33333333333334);

    group.resetMatrix();

    point = globalGraph.getCanvasByPoint(100, 100);
    expect(point.x).toBe(100);
    expect(point.y).toBe(100);

    translate(group, {
      x: 100,
      y: 100
    });

    point = globalGraph.getCanvasByPoint(0, 0);
    expect(point.x).toBe(100);
    expect(point.y).toBe(100);
    
    group.resetMatrix();
  });

  it('client point & model point convert', () => {
    const group = globalGraph.get('group');
    const bbox = globalGraph.get('canvas').get('el').getBoundingClientRect();

    let point = globalGraph.getPointByClient(bbox.left + 100, bbox.top + 100);

    expect(point.x).toBe(100);
    expect(point.y).toBe(100);

    translate(group, {
      x: 100,
      y: 100
    });

    point = globalGraph.getPointByClient(bbox.left + 100, bbox.top + 100);
    expect(point.x).toBe(0);
    expect(point.y).toBe(0);

    scale(group, [1.5, 1.5]);
    point = globalGraph.getPointByClient(bbox.left + 100, bbox.top + 100);

    expect(point.x).toBe(-33.33333333333334);
    expect(point.y).toBe(-33.33333333333334);

    group.resetMatrix();

    point = globalGraph.getClientByPoint(100, 100);
    
    expect(point.x).toBe(bbox.left + 100);
    expect(point.y).toBe(bbox.top + 100);

    translate(group, {
      x: 100,
      y: 100
    });

    point = globalGraph.getClientByPoint(100, 100);
    
    expect(point.x).toBe(bbox.left + 200);
    expect(point.y).toBe(bbox.top + 200);
  });

  it('clear', () => {
    globalGraph.destroy();
    expect(globalGraph.destroyed).toBe(true);
  });
})

describe('all node link center', () => {
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    linkCenter: true
  });

  it('init', () => {
    expect(graph.get('linkCenter')).toBe(true);

    graph.data({
      nodes: [{
        id: '1',
        x: 10,
        y: 10
      }, {
        id: '2',
        x: 100,
        y: 100
      }],
      edges: [
        { id: 'e1', source: '1', target: '2' }
      ]
    });
    graph.render();

    const edge = graph.findById('e1');
    expect(edge.get('keyShape').attr('path')).toEqual([[ 'M', 10, 10 ], [ 'L', 100, 100 ]]);
  });

  it('loop', () => {
    graph.set('linkCenter', false);

    const node = graph.addItem('node', { id: 'circleNode', x: 150, y: 150, style: { fill: 'yellow' }, anchorPoints: [[ 0, 0 ], [ 0, 1 ]] });
    
    const edge1 = graph.addItem('edge', { id: 'edge', source: node, target: node, shape: 'loop',
      loopCfg: {
        position: 'top',
        dist: 60,
        clockwise: true
      }, style: { endArrow: true }
    });

    const edge2 = graph.addItem('edge', { id: 'edge1', source: node, target: node, shape: 'loop',
      loopCfg: {
        position: 'top-left',
        dist: 60,
        clockwise: false
      }, style: { endArrow: true }
    });

    const edge3 = graph.addItem('edge', { id: 'edge2', source: node, target: node, shape: 'loop',
      loopCfg: {
        position: 'top-right',
        dist: 60
      }, style: { endArrow: true }
    });

    const edge4 = graph.addItem('edge', { id: 'edge4', source: node, target: node, shape: 'loop',
      loopCfg: {
        position: 'right',
        dist: 60,
        clockwise: true
      }, style: { endArrow: true }
    });

    const edgeWithAnchor = graph.addItem('edge', { id: 'edge5', source: node, target: node, shape: 'loop', sourceAnchor: 0, targetAnchor: 1,
      loopCfg: {
        position: 'bottom-right',
        dist: 60,
        clockwise: true
      }, style: { endArrow: true }
    });

    graph.addItem('edge', { id: 'edge6', source: node, target: node, shape: 'loop',
      loopCfg: {
        position: 'bottom',
        dist: 60,
        clockwise: true
      }, style: { endArrow: true }
    });

    graph.addItem('edge', { id: 'edge7', source: node, target: node, shape: 'loop',
      loopCfg: {
        position: 'bottom-left',
        dist: 60,
        clockwise: true
      }, style: { endArrow: true }
    });

    graph.addItem('edge', { id: 'edge8', source: node, target: node, shape: 'loop',
      loopCfg: {
        position: 'left',
        dist: 60,
        clockwise: true
      }, style: { endArrow: true }
    });

    // graph.paint()

    const edgeShape = edge1.getKeyShape().attr('path');
    const edge2Shape = edge2.getKeyShape().attr('path')

    expect(edge2Shape[0][1]).toEqual(edgeShape[0][1]);
    expect(edge2Shape[0][2]).toEqual(edgeShape[0][2]);
    expect(edge3.getKeyShape().attr('path')[1][0]).toEqual('C');
    expect(edge3.getKeyShape().attr('path')[0][1]).toEqual(edgeShape[1][5]);
    expect(edge4.getKeyShape().attr('path')[0][1]).toEqual(edge3.getKeyShape().attr('path')[1][5]);
    expect(edge4.getKeyShape().attr('path')[0][2]).toEqual(edge3.getKeyShape().attr('path')[1][6]);

    const pathWithAnchor = edgeWithAnchor.getKeyShape().attr('path');
    expect(pathWithAnchor[0][1]).toEqual(119.5);
    expect(pathWithAnchor[0][2]).toEqual(119.5);
    expect(pathWithAnchor[1][0]).toEqual('C');
    expect(pathWithAnchor[1][5]).toEqual(119.5);
    expect(pathWithAnchor[1][6]).toEqual(180.5);
  });

  it('clear states', () => {
    graph.clear();
    const node = graph.addItem('node', { id: 'a', x: 50, y: 100, size: 50 });

    graph.setItemState(node, 'a', true);
    graph.setItemState(node, 'b', true);

    expect(graph.findAllByState('node', 'a').length).toBe(1);
    graph.clearItemStates(node);

    expect(graph.findAllByState('node', 'a').length).toBe(0);
    expect(graph.findAllByState('node', 'b').length).toBe(0);

    graph.setItemState(node, 'a', true);
    graph.setItemState(node, 'b', true);

    graph.clearItemStates(node, ['a']);
    expect(graph.findAllByState('node', 'a').length).toBe(0);
    expect(graph.findAllByState('node', 'b').length).toBe(1);
  });

  it('default node & edge style', () => {
    const defaultGraph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      defaultNode: {
        style: {
          fill: 'red',
          stroke: 'blue'
        }
      },
      nodeStateStyles: {
        default: {
          fill: 'red',
          stroke: 'blue'
        },
        selected: {
          fill: 'green',
          stroke: 'red'
        }
      },
      defaultEdge: {
        style: {
          stroke: 'blue',
          strokeOpacity: 0.5
        }
      },
      edgeStateStyles: {
        default: {
          stroke: 'blue',
          strokeOpacity: 0.5
        },
        selected: {
          stroke: 'red',
          strokeOpacity: 1
        },
        active: {
          stroke: 'green',
          shadowColor: '#ccc'
        }
      }
    });

    const node = defaultGraph.addItem('node', {
      id: 'node1',
      x: 100,
      y: 100,
      shape: 'rect',
      label: 'test label',
      style: {
        stroke: '#666'
      }
    });

    defaultGraph.on('node:click', e => {
      e.item.setState('selected', true);
      e.item.refresh();
    });

    defaultGraph.paint();

    const keyShape = node.get('keyShape');
    
    expect(keyShape.get('type')).toEqual('rect');
    expect(keyShape.attr('fill')).toEqual('red');
    expect(keyShape.attr('stroke')).toEqual('#666');

    defaultGraph.setItemState(node, 'selected', true);

    expect(keyShape.attr('fill')).toEqual('green');
    expect(keyShape.attr('fillStyle')).toBe(undefined);
    expect(keyShape.attr('stroke')).toEqual('red');
    expect(keyShape.attr('strokeStyle')).toBe(undefined);

    defaultGraph.setItemState(node, 'selected', false);

    expect(keyShape.attr('fill')).toEqual('red');
    expect(keyShape.attr('fillStyle')).toBe(undefined);
    expect(keyShape.attr('stroke')).toEqual('#666');
    expect(keyShape.attr('strokeStyle')).toBe(undefined);

    defaultGraph.updateItem(node, { style: { fill: '#ccc', stroke: '#444' } });

    expect(keyShape.attr('fill')).toEqual('#ccc');

    defaultGraph.setItemState(node, 'selected', true);

    expect(keyShape.attr('fill')).toEqual('green');
    expect(keyShape.attr('fillStyle')).toBe(undefined);
    expect(keyShape.attr('stroke')).toEqual('red');
    expect(keyShape.attr('strokeStyle')).toBe(undefined);

    defaultGraph.setItemState(node, 'selected', false);

    expect(keyShape.attr('fill')).toEqual('#ccc');
    expect(keyShape.attr('fillStyle')).toBe(undefined);
    expect(keyShape.attr('stroke')).toEqual('#444');
    expect(keyShape.attr('strokeStyle')).toBe(undefined);

    defaultGraph.addItem('node', { id: 'node2' });
    const edge = defaultGraph.addItem('edge', { id: 'edge', source: node, target: 'node2' });

    const edgeKeyShape = edge.get('keyShape');
    expect(edgeKeyShape.attr('stroke')).toEqual('blue');
    expect(edgeKeyShape.attr('strokeOpacity')).toEqual(0.5);

    defaultGraph.setItemState(edge, 'selected', true);

    expect(edgeKeyShape.attr('stroke')).toEqual('red');
    expect(edgeKeyShape.attr('strokeOpacity')).toEqual(1);

    defaultGraph.setItemState(edge, 'selected', false);
    expect(edgeKeyShape.attr('stroke')).toEqual('blue');
    expect(edgeKeyShape.attr('strokeOpacity')).toEqual(0.5);

    // 测试default状态不存在的属性
    expect(edgeKeyShape.attr('shadowColor')).toBe(undefined);
    defaultGraph.setItemState(edge, 'active', true);

    expect(edgeKeyShape.attr('stroke')).toEqual('green');
    expect(edgeKeyShape.attr('shadowColor')).toEqual('#ccc');

    defaultGraph.setItemState(edge, 'active', false);

    expect(edgeKeyShape.attr('stroke')).toEqual('blue');
    expect(edgeKeyShape.attr('shadowColor')).toBe(null);
    defaultGraph.destroy();
  });

  it('graph with default cfg', () => {
    const defaultGraph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      defaultNode: {
        shape: 'rect',
        size: [ 60, 40 ],
        color: '#ccc',
        labelCfg: {
          position: 'right',
          offset: 5,
          style: {
            fontSize: 14,
            fill: 'blue'
          }
        }
      },
      defaultEdge: {
        shape: 'cubic',
        color: '#666'
      }
    });
    const node = defaultGraph.addItem('node', { id: 'node1', x: 100, y: 150, label: '111' });
    let model = node.get('model');

    expect(model.id).toEqual('node1');
    expect(model.x).toEqual(100);
    expect(model.y).toEqual(150);
    expect(model.shape).toEqual('rect');
    expect(model.size[0]).toEqual(60);
    expect(model.size[1]).toEqual(40);
    expect(model.color).toEqual('#ccc');
    expect(model.labelCfg.position).toEqual('right');
    expect(model.labelCfg.style.fill).toEqual('blue');

    const node2 = defaultGraph.addItem('node', { id: 'node2', x: 150, y: 100, label: '222', color: '#666', shape: 'circle' });

    model = node2.get('model');
    expect(model.shape).toEqual('circle');
    expect(model.size[0]).toEqual(60);
    expect(model.size[1]).toEqual(40);
    expect(model.color).toEqual('#666');

    model.size[1] = 50;

    expect(model.size[1]).toEqual(50);
    expect(node.get('model').size[1]).toEqual(40);
    expect(model.labelCfg.position).toEqual('right');
    expect(model.labelCfg.style.fill).toEqual('blue');

    model.labelCfg.position = 'left';
    model.labelCfg.style.fill = 'red';

    expect(node.get('model').labelCfg.position).toEqual('right');
    expect(node.get('model').labelCfg.style.fill).toEqual('blue');

    const edge = defaultGraph.addItem('edge', { id: 'edge', source: 'node1', target: 'node2', shape: 'line' });
    model = edge.get('model');

    expect(model.id).toEqual('edge');
    expect(model.source).toEqual('node1');
    expect(model.shape).toEqual('line');
    expect(model.color).toEqual('#666');

    defaultGraph.destroy();

    expect(defaultGraph.destroyed).toBe(true)
  });
})