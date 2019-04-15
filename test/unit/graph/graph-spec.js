const expect = require('chai').expect;
const G6 = require('../../../src');
const Base = require('../../../plugins/base');

// const Util = require('../../../src/util');

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('graph', () => {
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    pixelRatio: 2
  });
  it('new & destroy graph', () => {
    const inst = new G6.Graph({
      container: div,
      width: 500,
      height: 500
    });
    const length = div.childNodes.length;
    expect(inst).not.to.be.undefined;
    expect(inst).to.be.an.instanceof(G6.Graph);
    expect(length > 1).to.be.true;
    expect(inst.get('canvas')).not.to.be.undefined;
    expect(inst.get('group')).not.to.be.undefined;
    expect(inst.get('group').get('className')).to.equal('root-container');
    expect(inst.get('group').get('id').endsWith('-root')).to.be.true;
    const children = inst.get('group').get('children');
    expect(children.length).to.equal(2);
    expect(children[1].get('className')).to.equal('node-container');
    expect(children[0].get('className')).to.equal('edge-container');
    const nodes = inst.getNodes();
    expect(nodes).not.to.be.undefined;
    expect(nodes.length).to.equal(0);
    const edges = inst.getEdges();
    expect(edges).not.to.be.undefined;
    expect(edges.length).to.equal(0);
    const canvas = inst.get('canvas');
    inst.destroy();
    expect(inst._cfg).to.equal(null);
    expect(canvas.destroyed);
    expect(length - div.childNodes.length).to.equal(1);
  });

  const canvasMatrix = graph.get('canvas').getMatrix();
  it('translate', () => {
    graph.translate(100, 100);
    const matrix = graph.get('group').getMatrix();
    expect(canvasMatrix[6]).to.equal(0);
    expect(canvasMatrix[7]).to.equal(0);
    expect(matrix[6]).to.equal(100);
    expect(matrix[7]).to.equal(100);
    graph.get('group').resetMatrix();
  });
  it('zoom', () => {
    expect(canvasMatrix[0]).to.equal(2);
    expect(canvasMatrix[4]).to.equal(2);
    graph.zoom(3, { x: 100, y: 100 });
    expect(canvasMatrix[0]).to.equal(2);
    expect(canvasMatrix[4]).to.equal(2);
    const matrix = graph.get('group').getMatrix();
    expect(matrix[0]).to.equal(3);
    expect(matrix[4]).to.equal(3);
    expect(graph.getZoom()).to.equal(3);
    graph.get('group').resetMatrix();
  });
  it('zoomTo', () => {
    let matrix = graph.get('group').getMatrix();
    expect(matrix[0]).to.equal(1);
    expect(matrix[4]).to.equal(1);
    graph.zoomTo(2);
    matrix = graph.get('group').getMatrix();
    expect(matrix[0]).to.equal(2);
    expect(matrix[4]).to.equal(2);
    expect(matrix[6]).to.equal(0);
    expect(matrix[7]).to.equal(0);
    graph.zoomTo(1.5, { x: 250, y: 250 });
    matrix = graph.get('group').getMatrix();
    expect(matrix[0]).to.equal(1.5);
    expect(matrix[4]).to.equal(1.5);
    expect(matrix[6]).to.equal(62.5);
    expect(matrix[7]).to.equal(62.5);
  });
  it('change size', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500
    });
    expect(typeof graph.changeSize).to.equal('function');
    graph.changeSize(300, 300);
    expect(graph.get('width')).to.equal(300);
    expect(graph.get('height')).to.equal(300);
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
    graph.data(data);
    graph.render();
    expect(graph.get('nodes').length).to.equal(3);
    expect(graph.get('edges').length).to.equal(2);
    let map = graph.get('itemMap');
    expect(map.a).not.to.be.undefined;
    expect(map.b).not.to.be.undefined;
    expect(map.c).not.to.be.undefined;
    expect(map.d).not.to.be.undefined;
    const edges = graph.getEdges();
    expect(edges.length).to.equal(2);
    const nodes = graph.getNodes();
    expect(nodes.length).to.equal(3);
    expect(map.e).not.to.be.undefined;
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
    graph.changeData(data);
    map = graph.get('itemMap');
    expect(graph.get('nodes').length).to.equal(3);
    expect(graph.get('edges').length).to.equal(1);
    expect(map.a).to.be.undefined;
    expect(map.b).not.to.be.undefined;
    expect(map.c).not.to.be.undefined;
    expect(map.d).to.be.undefined;
    expect(map.e).not.to.be.undefined;
    expect(map.f).not.to.be.undefined;
    const exported = graph.save();
    expect(JSON.stringify(exported)).not.to.throw;
    expect(exported.nodes.length).to.equal(3);
    expect(exported.edges.length).to.equal(1);
    const edge = exported.edges[0];
    expect(edge.id).to.equal('e');
    expect(edge.source).to.equal('b');
    expect(edge.target).to.equal('c');
  });
  it('find', () => {
    graph.clear();
    graph.addItem('node', { id: 'node', x: 50, y: 100, size: 50, className: 'test test2' });
    const node = graph.addItem('node', { id: 'node2', x: 100, y: 100, size: 50, className: 'test' });
    const findNode = graph.find('node', node => {
      return node.get('model').x === 100;
    });
    expect(findNode).not.to.be.undefined;
    expect(findNode).to.equal(node);
  });
  it('findAll', () => {
    graph.clear();
    const node1 = graph.addItem('node', { id: 'node', x: 100, y: 100, size: 50, className: 'test test2' });
    const node2 = graph.addItem('node', { id: 'node2', x: 100, y: 100, size: 50, className: 'test' });
    const node3 = graph.addItem('node', { id: 'node2', x: 100, y: 100, size: 50 });
    node1.setState('active', true);
    node2.setState('selected', true);
    node3.setState('active', true);
    let nodes = graph.findAllByState('node', 'active');
    expect(nodes.length).to.equal(2);
    expect(nodes[0]).to.equal(node1);
    expect(nodes[1]).to.equal(node3);
    nodes = graph.findAllByState('node', 'selected');
    expect(nodes.length).to.equal(1);
    expect(nodes[0]).to.equal(node2);
  });
  it('refresh positions', () => {
    const data = { id: 'node', x: 100, y: 50, size: 50, className: 'test test2' };
    const node = graph.addItem('node', data);
    const group = node.get('group');
    expect(group.getMatrix()[6]).to.equal(100);
    expect(group.getMatrix()[7]).to.equal(50);
    data.x = 50;
    data.y = 100;
    graph.refreshPositions();
    expect(group.getMatrix()[6]).to.equal(50);
    expect(group.getMatrix()[7]).to.equal(100);
  });
  it('canvas point & model point convert', () => {
    const group = graph.get('group');
    let point = graph.getPointByCanvas(100, 100);
    expect(point.x).to.equal(100);
    expect(point.y).to.equal(100);
    group.translate(100, 100);
    point = graph.getPointByCanvas(100, 100);
    expect(point.x).to.equal(0);
    expect(point.y).to.equal(0);
    group.scale(1.5, 1.5);
    point = graph.getPointByCanvas(100, 100);
    expect(parseInt(point.x), 10).to.equal(-33);
    expect(parseInt(point.y), 10).to.equal(-33);
    group.resetMatrix();
    point = graph.getCanvasByPoint(100, 100);
    expect(point.x).to.equal(100);
    expect(point.y).to.equal(100);
    group.translate(100, 100);
    point = graph.getCanvasByPoint(0, 0);
    expect(point.x).to.equal(100);
    expect(point.y).to.equal(100);
    group.resetMatrix();
  });
  it('client point & model point convert', () => {
    const group = graph.get('group');
    const bbox = graph.get('canvas').get('el').getBoundingClientRect();
    let point = graph.getPointByClient(bbox.left + 100, bbox.top + 100);
    expect(point.x).to.equal(100);
    expect(point.y).to.equal(100);
    group.translate(100, 100);
    point = graph.getPointByClient(bbox.left + 100, bbox.top + 100);
    expect(point.x).to.equal(0);
    expect(point.y).to.equal(0);
    group.scale(1.5, 1.5);
    point = graph.getPointByClient(bbox.left + 100, bbox.top + 100);
    expect(parseInt(point.x), 10).to.equal(-33);
    expect(parseInt(point.y), 10).to.equal(-33);
    group.resetMatrix();
    point = graph.getClientByPoint(100, 100);
    expect(point.x).to.equal(bbox.left + 100);
    expect(point.y).to.equal(bbox.top + 100);
    group.translate(100, 100);
    point = graph.getClientByPoint(100, 100);
    expect(point.x).to.equal(bbox.left + 200);
    expect(point.y).to.equal(bbox.top + 200);
  });
  it('clear', () => {
    graph.destroy();
    expect(graph.destroyed).eql(true);
  });
});

describe('all node link center', () => {
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    pixelRatio: 2,
    linkCenter: true
  });
  it('init', () => {
    expect(graph.get('linkCenter')).equal(true);
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
    expect(edge.get('keyShape').attr('path')).eqls([[ 'M', 10, 10 ], [ 'L', 100, 100 ]]);
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
    const edgeShape = edge1.getKeyShape().attr('path');
    expect(edge2.getKeyShape().attr('path')[0][1]).to.equal(edgeShape[0][1]);
    expect(edge2.getKeyShape().attr('path')[0][2]).to.equal(edgeShape[0][2]);
    expect(edge3.getKeyShape().attr('path')[1][0]).to.equal('C');
    expect(edge3.getKeyShape().attr('path')[0][1]).to.equal(edgeShape[1][5]);
    expect(edge4.getKeyShape().attr('path')[0][1]).to.equal(edge3.getKeyShape().attr('path')[1][5]);
    expect(edge4.getKeyShape().attr('path')[0][2]).to.equal(edge3.getKeyShape().attr('path')[1][6]);
    const pathWithAnchor = edgeWithAnchor.getKeyShape().attr('path');
    expect(pathWithAnchor[0][1]).to.equal(129.5);
    expect(pathWithAnchor[0][2]).to.equal(129.5);
    expect(pathWithAnchor[1][0]).to.equal('C');
    expect(pathWithAnchor[1][5]).to.equal(129.5);
    expect(pathWithAnchor[1][6]).to.equal(170.5);
  });
  it('clear states', () => {
    graph.clear();
    const node = graph.addItem('node', { id: 'a', x: 50, y: 100, size: 50 });
    graph.setItemState(node, 'a', true);
    graph.setItemState(node, 'b', true);
    expect(graph.findAllByState('node', 'a').length).eql(1);
    graph.clearItemStates(node);

    expect(graph.findAllByState('node', 'a').length).eql(0);
    expect(graph.findAllByState('node', 'b').length).eql(0);

    graph.setItemState(node, 'a', true);
    graph.setItemState(node, 'b', true);

    graph.clearItemStates(node, 'a');
    expect(graph.findAllByState('node', 'a').length).eql(0);
    expect(graph.findAllByState('node', 'b').length).eql(1);
  });
  it('default node & edge style', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      nodeStyle: {
        default: {
          fill: 'red',
          stroke: 'blue'
        },
        selected: {
          fill: 'green',
          stroke: 'red'
        }
      },
      edgeStyle: {
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
    const node = graph.addItem('node', {
      id: 'node1',
      x: 100,
      y: 100,
      shape: 'rect',
      label: 'test label',
      style: {
        stroke: '#666'
      }
    });
    graph.on('node:click', e => {
      e.item.setState('selected', true);
      e.item.refresh();
    });
    graph.paint();
    const keyShape = node.get('keyShape');
    expect(keyShape.type).to.equal('rect');
    expect(keyShape.attr('fill')).to.equal('red');
    expect(keyShape.attr('stroke')).to.equal('#666');
    graph.setItemState(node, 'selected', true);
    expect(keyShape.attr('fill')).to.equal('green');
    expect(keyShape.attr('fillStyle')).to.equal('green');
    expect(keyShape.attr('stroke')).to.equal('red');
    expect(keyShape.attr('strokeStyle')).to.equal('red');
    graph.setItemState(node, 'selected', false);
    expect(keyShape.attr('fill')).to.equal('red');
    expect(keyShape.attr('fillStyle')).to.equal('red');
    expect(keyShape.attr('stroke')).to.equal('#666');
    expect(keyShape.attr('strokeStyle')).to.equal('#666');
    graph.updateItem(node, { style: { fill: '#ccc', stroke: '#444' } });
    expect(keyShape.attr('fill')).to.equal('#ccc');
    graph.setItemState(node, 'selected', true);
    expect(keyShape.attr('fill')).to.equal('green');
    expect(keyShape.attr('fillStyle')).to.equal('green');
    expect(keyShape.attr('stroke')).to.equal('red');
    expect(keyShape.attr('strokeStyle')).to.equal('red');
    graph.setItemState(node, 'selected', false);
    expect(keyShape.attr('fill')).to.equal('#ccc');
    expect(keyShape.attr('fillStyle')).to.equal('#ccc');
    expect(keyShape.attr('stroke')).to.equal('#444');
    expect(keyShape.attr('strokeStyle')).to.equal('#444');
    graph.addItem('node', { id: 'node2' });
    const edge = graph.addItem('edge', { id: 'edge', source: node, target: 'node2' });
    const edgeKeyShape = edge.get('keyShape');
    expect(edgeKeyShape.attr('stroke')).to.equal('blue');
    expect(edgeKeyShape.attr('strokeOpacity')).to.equal(0.5);
    graph.setItemState(edge, 'selected', true);
    expect(edgeKeyShape.attr('stroke')).to.equal('red');
    expect(edgeKeyShape.attr('strokeStyle')).to.equal('red');
    expect(edgeKeyShape.attr('strokeOpacity')).to.equal(1);
    graph.setItemState(edge, 'selected', false);
    expect(edgeKeyShape.attr('stroke')).to.equal('blue');
    expect(edgeKeyShape.attr('strokeStyle')).to.equal('blue');
    expect(edgeKeyShape.attr('strokeOpacity')).to.equal(0.5);
    // 测试default状态不存在的属性
    expect(edgeKeyShape.attr('shadowColor')).to.be.undefined;
    graph.setItemState(edge, 'active', true);
    expect(edgeKeyShape.attr('stroke')).to.equal('green');
    expect(edgeKeyShape.attr('shadowColor')).to.equal('#ccc');
    graph.setItemState(edge, 'active', false);
    expect(edgeKeyShape.attr('stroke')).to.equal('blue');
    expect(edgeKeyShape.attr('shadowColor')).to.be.null;
    graph.destroy();
  });
  it('graph with default cfg', () => {
    const graph = new G6.Graph({
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
    const node = graph.addItem('node', { id: 'node1', x: 100, y: 150, label: '111' });
    let model = node.get('model');
    expect(model.id).to.equal('node1');
    expect(model.x).to.equal(100);
    expect(model.y).to.equal(150);
    expect(model.shape).to.equal('rect');
    expect(model.size[0]).to.equal(60);
    expect(model.size[1]).to.equal(40);
    expect(model.color).to.equal('#ccc');
    expect(model.labelCfg.position).to.equal('right');
    expect(model.labelCfg.style.fill).to.equal('blue');
    const node2 = graph.addItem('node', { id: 'node2', x: 150, y: 100, label: '222', color: '#666', shape: 'circle' });
    model = node2.get('model');
    expect(model.shape).to.equal('circle');
    expect(model.size[0]).to.equal(60);
    expect(model.size[1]).to.equal(40);
    expect(model.color).to.equal('#666');
    model.size[1] = 50;
    expect(model.size[1]).to.equal(50);
    expect(node.get('model').size[1]).to.equal(40);
    expect(model.labelCfg.position).to.equal('right');
    expect(model.labelCfg.style.fill).to.equal('blue');
    model.labelCfg.position = 'left';
    model.labelCfg.style.fill = 'red';
    expect(node.get('model').labelCfg.position).to.equal('right');
    expect(node.get('model').labelCfg.style.fill).to.equal('blue');
    const edge = graph.addItem('edge', { id: 'edge', source: 'node1', target: 'node2', shape: 'line' });
    model = edge.get('model');
    expect(model.id).to.equal('edge');
    expect(model.source).to.equal('node1');
    expect(model.shape).to.equal('line');
    expect(model.color).to.equal('#666');
    graph.destroy();
  });
  it('regist plugin', () => {
    let count = 0;
    class Plugin extends Base {
      getDefaultCfg() {
        return {
          b: { d: 2 }
        };
      }
      getEvents() {
        return { event: 'handler' };
      }
      handler() {
        count++;
      }
    }
    const plugin = new Plugin({ a: 1, b: { c: 2 } });
    expect(plugin.get('a')).to.equal(1);
    expect(plugin.get('b').c).to.equal(2);
    expect(plugin.get('b').d).to.equal(2);
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [ plugin ]
    });
    expect(graph.get('plugins').length).to.equal(1);
    graph.emit('event');
    expect(count).to.equal(1);
    plugin.destroyPlugin();
    graph.emit('event');
    expect(count).to.equal(1);
  });
  it('clear', () => {
    graph.destroy();
    expect(graph.destroyed).eql(true);
  });
});
