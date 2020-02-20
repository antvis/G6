import { Graph } from '../../../src';
import '../../../src/behavior';
import { scale, translate } from '../../../src/util/math';
import { GraphData, Item } from '../../../src/types';
import Plugin from '../../../src/plugins';
import { timerOut } from '../util/timeOut';

const div = document.createElement('div');
div.id = 'global-spec';
document.body.appendChild(div);

describe('graph', () => {
  const globalGraph = new Graph({
    container: div,
    width: 500,
    height: 500,
    renderer: 'svg',
    modes: {
      default: ['drag-node'],
    },
  });

  it('invalid container', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new Graph({} as any); 
    }).toThrowError('invalid container');
  });

  it('new & destroy graph', () => {
    const inst = new Graph({
      container: div,
      width: 500,
      height: 500,
      renderer: 'svg',
      modes: {
        default: ['drag-node'],
      },
    });
    const length = div.childNodes.length;

    expect(inst).not.toBe(undefined);
    expect(inst instanceof Graph).toBe(true);
    expect(length > 1).toBe(true);

    expect(inst.get('canvas')).not.toBe(undefined);
    expect(inst.get('group')).not.toBe(undefined);

    expect(inst.get('group').get('className')).toEqual('root-container');
    expect(
      inst
        .get('group')
        .get('id')
        .endsWith('-root'),
    ).toBe(true);

    const children = inst.get('group').get('children');
    expect(children.length).toBe(4);
    expect(children[1].get('className')).toEqual('edge-container');
    expect(children[0].get('className')).toEqual('custom-group-container');

    const nodes = inst.getNodes();
    expect(nodes).not.toBe(undefined);
    expect(nodes.length).toBe(0);

    const edges = inst.getEdges();
    expect(edges).not.toBe(undefined);
    expect(edges.length).toBe(0);

    const canvas = inst.get('canvas');
    inst.destroy();

    expect(inst.destroyed).toBe(true);
    expect(canvas.destroyed).toBe(true);
    expect(length - div.childNodes.length).toBe(1);
  });

  it('render with data & toDataURL & downloadImage', () => {
    const inst = new Graph({
      container: div,
      width: 500,
      height: 500,
      renderer: 'svg',
      // TODO: 加上布局就会没清空就重新绘制，两个 SVG 版本 G 的 bug 造成：
      // 1. canvas.draw() 没清空之前的内容。
      // 2. canvas.set('autoDraw', false) 没起效。
      layout: {
        type: 'dagre'
      }
    });

    const data = {
      nodes: [
        {
          id: 'node1',
          label: 'node1',
          x: 100,
          y: 100,
        },
        {
          id: 'node2',
          x: 200,
          y: 140,
        },
        {
          id: 'node3',
          x: 200,
          y: 180,
        },
      ],
      edges: [
        {
          id: 'edge1',
          source: 'node1',
          target: 'node2',
        },
        {
          id: 'edge2',
          source: 'node1',
          target: 'node1',
        },
        {
          id: 'edge3',
          source: 'node2',
          target: 'node2',
        },
      ],
    };

    inst.data(data);
    inst.render();

    const url = inst.toDataURL();
    expect(url).not.toBe(null);

    // close to avoid alert
    // inst.downloadImage('graph-image');
    inst.destroy();
  });

  it('groupByTypes false', () => {

    const inst = new Graph({
      container: div,
      width: 500,
      height: 500,
      renderer: 'svg',
      groupByTypes: false
    });

    const data = {
      nodes: [
        {
          id: 'node1',
          label: 'node1',
          x: 100,
          y: 100,
        },
        {
          id: 'node2',
          x: 200,
          y: 140,
        },
        {
          id: 'node3',
          x: 200,
          y: 180,
        },
      ],
      edges: [
        {
          id: 'edge1',
          source: 'node1',
          target: 'node2',
        },
        {
          id: 'edge2',
          source: 'node1',
          target: 'node1',
        },
        {
          id: 'edge3',
          source: 'node2',
          target: 'node2',
        },
      ],
    };
    inst.data(data);
    inst.render();

    const nodeGroup = inst.get('nodeGroup');
    const edgeGroup = inst.get('edgeGroup');

    expect(nodeGroup).toBe(undefined);
    expect(edgeGroup).toBe(undefined);

    const node = inst.findById('node1');
    const edge = inst.findById('edge1');

    const group1 = node.get('group').getParent();
    const group2 = edge.get('group').getParent();

    expect(group1).toEqual(group2);
    inst.destroy();
  });

  it('translate', () => {
    const data = {
      nodes: [
        {
          id: 'node1',
          label: 'node1',
          x: 100,
          y: 100,
        },
        {
          id: 'node2',
          x: 200,
          y: 140,
        }
      ],
      edges: [
        {
          id: 'edge1',
          source: 'node1',
          target: 'node2',
        },
      ],
    };
    globalGraph.data(data);
    globalGraph.render();

    const canvasMatrix = globalGraph.get('canvas').getMatrix();
    globalGraph.translate(200, 100);

    const matrix = globalGraph.get('group').getMatrix();

    expect(canvasMatrix).toBe(null);
    expect(matrix[6]).toBe(200);
    expect(matrix[7]).toBe(100);

    globalGraph.get('group').resetMatrix();
  });

  it('moveTo', () => {
    let group = globalGraph.get('group');
    expect(group.get('x')).toBe(undefined);
    expect(group.get('y')).toBe(undefined);
    globalGraph.moveTo(100, 200);

    group = globalGraph.get('group');
    const matrix = globalGraph.get('group').getMatrix();

    expect(matrix).not.toBe(null);
    expect(group.get('x')).toBe(100);
    expect(group.get('y')).toBe(200);

    globalGraph.get('group').resetMatrix();
  });

  it('zoom', () => {
    globalGraph.zoom(3, { x: 100, y: 100 });

    const matrix = globalGraph.get('group').getMatrix();

    expect(matrix[0]).toBe(3);
    expect(matrix[4]).toBe(3);
    expect(matrix[6]).toBe(-200);
    expect(matrix[7]).toBe(-200);
    expect(globalGraph.getZoom()).toBe(3);

    globalGraph.get('group').resetMatrix();
  });

  it('minZoom & maxZoom', () => {
    const graph = new Graph({
      container: div,
      minZoom: 2,
      maxZoom: 5,
      width: 500,
      height: 500,
      renderer: 'svg',
    });

    const data = {
      nodes: [
        {
          id: 'node',
        },
      ],
    };

    graph.data(data);
    graph.render();

    let matrix = graph.get('group').getMatrix();
    expect(matrix).toBe(null);

    graph.zoom(0.5, { x: 100, y: 100 });
    matrix = graph.get('group').getMatrix();
    expect(matrix).toBe(null);

    graph.zoom(5.5);
    matrix = graph.get('group').getMatrix();
    expect(matrix).toBe(null);
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
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      renderer: 'svg',
    });

    expect(graph.get('width')).toBe(500);
    expect(graph.get('height')).toBe(500);

    expect(typeof graph.changeSize).toEqual('function');
    graph.changeSize(300, 300);

    expect(graph.get('width')).toBe(300);
    expect(graph.get('height')).toBe(300);

    graph.destroy();
  });

  it('find', () => {
    globalGraph.clear();
    globalGraph.addItem('node', { id: 'node', x: 50, y: 100, size: 50, className: 'test test2' });
    const item = globalGraph.addItem('node', {
      id: 'node2',
      x: 100,
      y: 100,
      size: 50,
      className: 'test',
    });

    const findNode = globalGraph.find('node', (node: any) => node.get('model').x === 100);

    expect(findNode).not.toBe(undefined);
    expect(findNode).toEqual(item);
  });

  it('findAll', () => {
    globalGraph.clear();
    const node1 = globalGraph.addItem('node', {
      id: 'node',
      x: 100,
      y: 100,
      size: 50,
      className: 'test test2',
    });
    const node2 = globalGraph.addItem('node', {
      id: 'node2',
      x: 100,
      y: 100,
      size: 50,
      className: 'test',
    });
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

  it('removeItem', () => {
    let removeNode = globalGraph.findById('remove-item');
    expect(removeNode).toBe(undefined);

    const data = { id: 'remove-item', x: 10, y: 50, size: 50, className: 'test test2' };
    const node = globalGraph.addItem('node', data);

    expect(node).not.toBe(undefined);

    globalGraph.removeItem('remove-item');
    removeNode = globalGraph.findById('remove-item');
    expect(removeNode).toBe(undefined);
  });

  it('canvas point & model point convert', () => {
    const group = globalGraph.get('group');
    let point = globalGraph.getPointByCanvas(100, 100);
    expect(point.x).toBe(100);
    expect(point.y).toBe(100);

    translate(group, {
      x: 100,
      y: 100,
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
      y: 100,
    });

    point = globalGraph.getCanvasByPoint(0, 0);
    expect(point.x).toBe(100);
    expect(point.y).toBe(100);

    group.resetMatrix();
  });

  it('client point & model point convert', () => {
    const group = globalGraph.get('group');
    const bbox = globalGraph
      .get('canvas')
      .get('el')
      .getBoundingClientRect();

    let point = globalGraph.getPointByClient(bbox.left + 100, bbox.top + 100);

    expect(point.x).toBe(100);
    expect(point.y).toBe(100);

    translate(group, {
      x: 100,
      y: 100,
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
      y: 100,
    });

    point = globalGraph.getClientByPoint(100, 100);

    expect(point.x).toBe(bbox.left + 200);
    expect(point.y).toBe(bbox.top + 200);
  });

  it('clear', () => {
    globalGraph.destroy();
    expect(globalGraph.destroyed).toBe(true);
  });
});

describe('all node link center', () => {
  const graph = new Graph({
    container: div,
    width: 500,
    height: 500,
    linkCenter: true,
    renderer: 'svg',
  });

  it('init', () => {
    expect(graph.get('linkCenter')).toBe(true);

    graph.data({
      nodes: [
        {
          id: '1',
          x: 10,
          y: 10,
        },
        {
          id: '2',
          x: 100,
          y: 100,
        },
      ],
      edges: [{ id: 'e1', source: '1', target: '2' }],
    });
    graph.render();

    const edge = graph.findById('e1');
    expect(edge.get('keyShape').attr('path')).toEqual([
      ['M', 10, 10],
      ['L', 100, 100],
    ]);
  });

  it('loop', () => {
    graph.set('linkCenter', false);

    const node = graph.addItem('node', {
      id: 'circleNode',
      x: 150,
      y: 150,
      style: { fill: 'yellow' },
      anchorPoints: [
        [0, 0],
        [0, 1],
      ],
    });

    const edge1 = graph.addItem('edge', {
      id: 'edge',
      source: node,
      target: node,
      type: 'loop',
      loopCfg: {
        position: 'top',
        dist: 60,
        clockwise: true,
      },
      style: { endArrow: true },
    });

    const edge2 = graph.addItem('edge', {
      id: 'edge1',
      source: node,
      target: node,
      type: 'loop',
      loopCfg: {
        position: 'top-left',
        dist: 60,
        clockwise: false,
      },
      style: { endArrow: true },
    });

    const edge3 = graph.addItem('edge', {
      id: 'edge2',
      source: node,
      target: node,
      type: 'loop',
      loopCfg: {
        position: 'top-right',
        dist: 60,
      },
      style: { endArrow: true },
    });

    const edge4 = graph.addItem('edge', {
      id: 'edge4',
      source: node,
      target: node,
      type: 'loop',
      loopCfg: {
        position: 'right',
        dist: 60,
        clockwise: true,
      },
      style: { endArrow: true },
    });

    const edgeWithAnchor = graph.addItem('edge', {
      id: 'edge5',
      source: node,
      target: node,
      type: 'loop',
      sourceAnchor: 0,
      targetAnchor: 1,
      loopCfg: {
        position: 'bottom-right',
        dist: 60,
        clockwise: true,
      },
      style: { endArrow: true },
    });

    graph.addItem('edge', {
      id: 'edge6',
      source: node,
      target: node,
      type: 'loop',
      loopCfg: {
        position: 'bottom',
        dist: 60,
        clockwise: true,
      },
      style: { endArrow: true },
    });

    graph.addItem('edge', {
      id: 'edge7',
      source: node,
      target: node,
      type: 'loop',
      loopCfg: {
        position: 'bottom-left',
        dist: 60,
        clockwise: true,
      },
      style: { endArrow: true },
    });

    graph.addItem('edge', {
      id: 'edge8',
      source: node,
      target: node,
      type: 'loop',
      loopCfg: {
        position: 'left',
        dist: 60,
        clockwise: true,
      },
      style: { endArrow: true },
    });

    const edgeShape = edge1.getKeyShape().attr('path');
    const edge2Shape = edge2.getKeyShape().attr('path');

    expect(edge2Shape[0][1]).toEqual(edgeShape[0][1]);
    expect(edge2Shape[0][2]).toEqual(edgeShape[0][2]);
    expect(edge3.getKeyShape().attr('path')[1][0]).toEqual('C');
    expect(edge3.getKeyShape().attr('path')[0][1]).toEqual(edgeShape[1][5]);
    expect(edge4.getKeyShape().attr('path')[0][1]).toEqual(edge3.getKeyShape().attr('path')[1][5]);
    expect(edge4.getKeyShape().attr('path')[0][2]).toEqual(edge3.getKeyShape().attr('path')[1][6]);

    const pathWithAnchor = edgeWithAnchor.getKeyShape().attr('path');
    expect(pathWithAnchor[0][1]).toEqual(139.5);
    expect(pathWithAnchor[0][2]).toEqual(139.5);
    expect(pathWithAnchor[1][0]).toEqual('C');
    expect(pathWithAnchor[1][5]).toEqual(139.5);
    expect(pathWithAnchor[1][6]).toEqual(160.5);
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

    graph.clearItemStates('a', ['a']);
    expect(graph.findAllByState('node', 'a').length).toBe(0);
    expect(graph.findAllByState('node', 'b').length).toBe(1);

    graph.clearItemStates(node, 'b');
    expect(graph.findAllByState('node', 'b').length).toBe(0);
  });

  it('default node & edge style', () => {
    const defaultGraph = new Graph({
      container: div,
      width: 500,
      height: 500,
      renderer: 'svg',
      defaultNode: {
        style: {
          fill: 'red',
          stroke: 'blue',
        },
      },
      nodeStateStyles: {
        default: {
          fill: 'red',
          stroke: 'blue',
        },
        selected: {
          fill: 'green',
          stroke: 'red',
        },
      },
      defaultEdge: {
        style: {
          stroke: 'blue',
          strokeOpacity: 0.5,
        },
      },
      edgeStateStyles: {
        default: {
          stroke: 'blue',
          strokeOpacity: 0.5,
        },
        selected: {
          stroke: 'red',
          strokeOpacity: 1,
        },
        active: {
          stroke: 'green',
          shadowColor: '#ccc',
        },
      },
    });

    const node = defaultGraph.addItem('node', {
      id: 'node1',
      x: 100,
      y: 100,
      type: 'rect',
      label: 'test label',
      style: {
        stroke: '#666',
      },
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
    const defaultGraph = new Graph({
      container: div,
      width: 500,
      height: 500,
      renderer: 'svg',
      defaultNode: {
        type: 'rect',
        size: [60, 40],
        color: '#ccc',
        labelCfg: {
          position: 'right',
          offset: 5,
          style: {
            fontSize: 14,
            fill: 'blue',
          },
        },
      },
      defaultEdge: {
        type: 'cubic',
        color: '#666',
      },
    });
    const node = defaultGraph.addItem('node', { id: 'node1', x: 100, y: 150, label: '111' });
    let model = node.get('model');

    expect(model.id).toEqual('node1');
    expect(model.x).toEqual(100);
    expect(model.y).toEqual(150);
    expect(model.type).toEqual('rect');
    expect(model.size[0]).toEqual(60);
    expect(model.size[1]).toEqual(40);
    expect(model.color).toEqual('#ccc');
    expect(model.labelCfg.position).toEqual('right');
    expect(model.labelCfg.style.fill).toEqual('blue');

    const node2 = defaultGraph.addItem('node', {
      id: 'node2',
      x: 150,
      y: 100,
      label: '222',
      color: '#666',
      type: 'circle',
    });

    model = node2.get('model');
    expect(model.type).toEqual('circle');
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

    const edge = defaultGraph.addItem('edge', {
      id: 'edge',
      source: 'node1',
      target: 'node2',
      type: 'line',
    });
    model = edge.get('model');

    expect(model.id).toEqual('edge');
    expect(model.source).toEqual('node1');
    expect(model.type).toEqual('line');
    expect(model.color).toEqual('#666');

    defaultGraph.destroy();

    expect(defaultGraph.destroyed).toBe(true);
  });
});

describe('plugins & layout', () => {
  it('add & remove plugins', () => {
    const graph = new Graph({
      container: div,
      height: 500,
      width: 500,
      renderer: 'svg',
    });

    const data = {
      nodes: [
        {
          id: 'node',
          label: 'node',
        },
      ],
    };

    graph.data(data);
    graph.render();

    let plugins = graph.get('plugins');
    expect(plugins.length).toBe(0);

    const minimap = new Plugin.Minimap({
      size: [200, 200],
    });

    graph.addPlugin(minimap);
    plugins = graph.get('plugins');
    expect(plugins.length).toBe(1);

    graph.removePlugin(minimap);
    plugins = graph.get('plugins');
    expect(plugins.length).toBe(0);

    graph.destroy();
    expect(graph.destroyed).toBe(true);
  });

  it('graph animate', () => {
    const graph = new Graph({
      container: div,
      height: 500,
      width: 500,
      renderer: 'svg'
    });

    const data = {
      nodes: [
        {
          id: 'node',
          label: 'node',
          groupId: 'g1',
          x: 100,
          y: 100
        },
        {
          id: 'node1',
          groupId: 'g2',
          x: 50,
          y: 150
        },
      ],
      groups: [
        {
          id: 'g1',
          title: 'cokkdl',
        },
        {
          id: 'g2',
        },
      ],
    };

    graph.data(data);
    graph.render();

    graph.stopAnimate();
    const isAnimating = graph.isAnimating();
    expect(isAnimating).toBe(false);

    graph.collapseGroup('g1');

    let gnode = graph.findById('node');

    expect(gnode.get('visible')).toBe(false);

    const g2Node = graph.findById('node1');
    expect(g2Node.get('visible')).toBe(true);

    graph.expandGroup('g1');

    timerOut(() => {
      gnode = graph.findById('node');
      expect(gnode.get('visible')).toBe(true);
    }, 500);
  });
});

describe('auto rotate label on edge', () => {
  const graph = new Graph({
    container: div,
    width: 500,
    height: 500,
    renderer: 'svg',
    defaultNode: {
      style: {
        opacity: 0.8
      }
    },
    modes: {
      default: ['drag-node', 'zoom-canvas', 'drag-canvas'],
    },
  });
  const data = {
    nodes: [
      {
        id: 'node1',
        x: 50,
        y: 50,
      },
      {
        id: 'node2',
        x: 80,
        y: 150,
      },
      {
        id: 'node3',
        x: 180,
        y: 120,
      },
    ],
    edges: [
      {
        source: 'node1',
        target: 'node2',
        label: 'node1-node2',
        style: {
          startArrow: true,
          endArrow: true,
        },
        labelCfg: {
          autoRotate: true,
        },
      },
      {
        source: 'node2',
        target: 'node3',
        label: 'node2-node3',
        style: {
          startArrow: true,
          endArrow: true,
          lineWidth: 8
        },
      },
    ],
  };
  it('render', () => {
    graph.data(data);
    graph.render();
    const edge1 = graph.getEdges()[0];
    const label1 = edge1.get('group').get('children')[1];
    const label1Matrix = label1.attr('matrix');
    console.log(label1Matrix);
    console.log(graph.getEdges());

    // const group = edge1.get('group');//graph.get('edgeGroup');
    // group.addShape('path', {
    //   className: 'edge-shape',
    //   name: 'edge-shape',
    //   attrs: {
    //     endArrow: true,
    //     lineWidth: 3,
    //     path: [["M", 90.05717599482209, 146.98284720155337], ["L", 169.9428240051779, 123.01715279844663]],
    //     startArrow: true,
    //     stroke: "#000",
    //   }
    // });

    // const group2 = graph.get('edgeGroup');//.addGroup();
    // group2.addShape('path', {
    //   className: 'edge-shape',
    //   name: 'edge-shape',
    //   attrs: {
    //     endArrow: true,
    //     lineWidth: 1,
    //     path: [["M", 90.05717599482209, 146.98284720155337], ["L", 169.9428240051779, 123.01715279844663]],
    //     startArrow: true,
    //     stroke: "#f00",
    //   }
    // });
    // console.log(group2);

    // expect(label1Matrix[0]).toBe(0.2873478855664496);
    // expect(label1Matrix[1]).toBe(0.9578262852211201);
    // expect(label1Matrix[3]).toBe(-0.9578262852211201);
    // expect(label1Matrix[4]).toBe(0.2873478855664496);
    // expect(label1Matrix[6]).toBe(142.10501596029277);
    // expect(label1Matrix[7]).toBe(9.006502903982238);
    // const edge2 = graph.getEdges()[1];
    // const label2 = edge2.get('group').get('children')[1];
    // const label2Matrix = label2.attr('matrix');
    // expect(label2Matrix).toBe(null);
  });

  // TODO：emit 的方式时节点拖动正确，但是鼠标事件没有响应
  it('drag node', () => {
    const node = graph.getNodes()[1];
    graph.emit('node:dragstart', { x: 80, y: 150, item: node });
    graph.emit('node:drag', { x: 200, y: 200, item: node });
    graph.emit('node:dragend', { x: 200, y: 200, item: node });
    const edge1 = graph.getEdges()[0];
    const label1 = edge1.get('group').get('children')[1];
    const label1Matrix = label1.attr('matrix');
    expect(label1Matrix[0]).toBe(0.7071067811865476);
    expect(label1Matrix[1]).toBe(0.7071067811865475);
    expect(label1Matrix[3]).toBe(-0.7071067811865475);
    expect(label1Matrix[4]).toBe(0.7071067811865476);
    expect(label1Matrix[6]).toBe(124.99999999999999);
    expect(label1Matrix[7]).toBe(-51.77669529663689);
    const edge2 = graph.getEdges()[1];
    const label2 = edge2.get('group').get('children')[1];
    const label2Matrix = label2.attr('matrix');
    expect(label2Matrix).toBe(null);
  });

  // TODO: 现在 zoom 还有幻影，因为 G 的 set('autoDraw') 不管用
  it('zoom and pan', () => {
    graph.zoom(0.5);
    graph.moveTo(100, 120);
    const group = graph.get('group');
    const groupMatrix = group.attr('matrix');
    expect(groupMatrix[0]).toBe(0.5);
    expect(groupMatrix[4]).toBe(0.5);
    expect(groupMatrix[6]).toBe(100);
    expect(groupMatrix[7]).toBe(120);
  });
});


// 这里可以发现边的箭头没有绘制出来，审查元素 svg 标签下面没有 defs。但打印出的 shape 看似没有问题。
// 测试时把 test-live 界面滚动条滚到最下面可以看到图
describe.only('auto rotate label on edge', () => {
  const graph = new Graph({
    container: div,
    width: 500,
    height: 500,
    renderer: 'svg',
    defaultNode: {
      style: {
        opacity: 0.2
      }
    }
  });
  const data = {
    nodes: [
      {
        id: 'node2',
        x: 80,
        y: 150,
      },
      {
        id: 'node3',
        x: 180,
        y: 120,
      },
    ],
    edges: [
      {
        source: 'node2',
        target: 'node3',
        style: {
          startArrow: true,
          endArrow: true,
          lineWidth: 1
        },
      },
    ],
  };
  it.only('render', () => {
    graph.data(data);
    graph.render();
    // 打印该边的 group
    console.log(graph.getEdges()[0].get('group'));
  });
});