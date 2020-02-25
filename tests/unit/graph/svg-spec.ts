import { Graph, Layout, TreeGraph } from '../../../src';
import '../../../src/behavior';
import { scale, translate } from '../../../src/util/math';
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

  // TODO: edge shadow 相关没有恢复。canvas 与 svg 都存在该问题
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
        selected: {
          stroke: 'red',
          strokeOpacity: 1,
        },
        active: {
          stroke: 'green',
          shadowColor: '#000',
          lineWidth: 5,
          shadowBlur: 10,
          opacity: 0.1
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
    expect(edgeKeyShape.attr('shadowColor')).toEqual('#000');

    defaultGraph.setItemState(edge, 'active', false);

    expect(edgeKeyShape.attr('stroke')).toEqual('blue');
    // TODO: G svg 版本将 shadow 相关更新为 null，shadow 没有消失
    console.log(edgeKeyShape);
    // expect(edgeKeyShape.attr('shadowColor')).toBe(null);
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

    expect(label1Matrix[0]).toBe(0.28751589136689853);
    expect(label1Matrix[1]).toBe(0.9577758674196681);
    expect(label1Matrix[3]).toBe(-0.9577758674196681);
    expect(label1Matrix[4]).toBe(0.28751589136689853);
    expect(label1Matrix[6]).toBe(142.08905380311842);
    expect(label1Matrix[7]).toBe(8.99297948103171);
    const edge2 = graph.getEdges()[1];
    const label2 = edge2.get('group').get('children')[1];
    const label2Matrix = label2.attr('matrix');
    expect(label2Matrix).toBe(null);
  });

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

describe('behaviors', () => {
  const graph = new Graph({
    container: div,
    width: 500,
    height: 500,
    renderer: 'svg',
    edgeStateStyles: {
      inactive: {
        opacity: 0.1
      },
      active: {
        stroke: '#000'
      }
    },
    nodeStateStyles: {
      inactive: {
        opacity: 0.1
      },
      active: {
        stroke: '#000',
        lineWidth: 2
      },
      selected: {
        fill: '#f00'
      }
    },
    modes: {
      default: ['activate-relations', 'brush-select', 'drag-node'],
      select: [{
        type: 'click-select',
        multiple: false
      }],
      multiSelect: [],
      tooltip: ['tooltip', 'edge-tooltip']
    }
  });
  const data = {
    nodes: [
      {
        id: 'node1',
        x: 50,
        y: 50,
        label: 'node1-label'
      },
      {
        id: 'node2',
        x: 80,
        y: 150,
        label: 'node2-label'
      },
      {
        id: 'node3',
        x: 180,
        y: 120,
        label: 'node3-label'
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
          startArrow: {
            path: 'M 10,0 L -10,-10 L -10,10 Z',
            d: 10
          },
          endArrow: true,
          lineWidth: 3
        },
      },
    ],
  };
  graph.data(data);
  graph.render();
  const item = graph.getNodes()[0];
  // TODO: 用 emit 的方式可以成功，但鼠标事件没有响应，等待 G 修复 svg 元素鼠标事件
  it('active-relations', () => {
    graph.emit('node:mouseenter', { item })
    const itemKeyShape = item.get('group').get('children')[0];
    expect(itemKeyShape.attr('stroke')).toBe('#000');
    expect(itemKeyShape.attr('lineWidth')).toBe(2);
    const relativeNode = graph.getNodes()[1];
    const relativeNodeKeyShape = relativeNode.get('group').get('children')[0];
    expect(relativeNodeKeyShape.attr('stroke')).toBe('#000');
    expect(relativeNodeKeyShape.attr('lineWidth')).toBe(2);
    const relativeEdge = graph.getEdges()[0];
    const relativeEdgeKeyShape = relativeEdge.get('group').get('children')[0];
    expect(relativeEdgeKeyShape.attr('stroke')).toBe('#000');

    const unrelativeNode = graph.getNodes()[2];
    const unrelativeNodeKeyShape = unrelativeNode.get('group').get('children')[0];
    expect(unrelativeNodeKeyShape.attr('lineWidth')).toBe(1);
    expect(unrelativeNodeKeyShape.attr('stroke')).toBe('#5B8FF9');
    expect(unrelativeNodeKeyShape.attr('opacity')).toBe(0.1);
    const unrelativeEdge = graph.getEdges()[1];
    const unrelativeEdgeKeyShape = unrelativeEdge.get('group').get('children')[0];
    expect(unrelativeEdgeKeyShape.attr('stroke')).toBe('#e2e2e2');
    expect(unrelativeEdgeKeyShape.attr('opacity')).toBe(0.1);

    graph.emit('node:mouseleave', { item });
    expect(itemKeyShape.attr('stroke')).toBe('#5B8FF9');
    expect(itemKeyShape.attr('lineWidth')).toBe(1);
    expect(unrelativeNodeKeyShape.attr('lineWidth')).toBe(1);
    expect(unrelativeNodeKeyShape.attr('stroke')).toBe('#5B8FF9');
    expect(unrelativeNodeKeyShape.attr('opacity')).toBe(1);

  });
  // TODO: 用 emit 的方式可以成功，但鼠标事件没有响应，等待 G 修复 svg 元素鼠标事件
  it('click-select', () => {
    graph.setMode('select');
    graph.emit('node:click', { item })
    const itemKeyShape = item.get('group').get('children')[0];
    expect(itemKeyShape.attr('fill')).toBe('#f00');

    const item2 = graph.getNodes()[1];
    const item2KeyShape = item2.get('group').get('children')[0];
    expect(item2KeyShape.attr('fill')).toBe('#C6E5FF');

    graph.emit('node:click', { item: item2 })
    expect(item2KeyShape.attr('fill')).toBe('#f00');
    expect(itemKeyShape.attr('fill')).toBe('#C6E5FF');

    graph.emit('node:click', { item: item2 })
    expect(item2KeyShape.attr('fill')).toBe('#C6E5FF');

    // multiple select
    graph.addBehaviors(['click-select'], 'multiSelect');
    graph.setMode('multiSelect');
    graph.emit('keydown', { key: 'shift' })
    graph.emit('node:click', { item });
    graph.emit('node:click', { item: item2 });
    expect(itemKeyShape.attr('fill')).toBe('#f00');
    expect(item2KeyShape.attr('fill')).toBe('#f00');
    
    graph.emit('canvas:click');
    expect(itemKeyShape.attr('fill')).toBe('#C6E5FF');
    expect(item2KeyShape.attr('fill')).toBe('#C6E5FF');

  });
  // TODO: 用 emit 的方式可以成功，但鼠标事件没有响应，等待 G 修复 svg 元素鼠标事件
  it('brush-select', () => {
    graph.setMode('default');

    graph.once('nodeselectchange', (evt) => {
      expect(evt.selectedItems.edges.length).toBe(4);
      expect(evt.selectedItems.nodes.length).toBe(3);
    });

    graph.emit('keydown', { key: 'shift' });
    // should not start when it start at an item
    graph.emit('dragstart', { item, canvasX: 0, canvasY: 0, x: 0, y: 0 });
    graph.emit('drag', { canvasX: 300, canvasY: 300, x: 300, y: 300 });
    graph.emit('dragend', { canvasX: 300, canvasY: 300, x: 300, y: 300 });
    graph.emit('keyup', { key: 'shift' });
    const itemKeyShape = item.get('group').get('children')[0];
    expect(itemKeyShape.attr('fill')).toBe('#C6E5FF');


    // TODO: the brush does not disappear when the keyup, it is because the g-svg does not destroy the svg tag when element.remove(true) is called
    graph.emit('keydown', { key: 'shift' });
    graph.emit('dragstart', { canvasX: 0, canvasY: 0, x: 0, y: 0 });
    graph.emit('drag', { canvasX: 300, canvasY: 300, x: 300, y: 300 });
    graph.emit('dragend', { canvasX: 300, canvasY: 300, x: 300, y: 300 });
    graph.emit('keyup', { key: 'shift' });
    expect(itemKeyShape.attr('fill')).toBe('#f00');
    const item2KeyShape = graph.getNodes()[1].get('group').get('children')[0];
    expect(item2KeyShape.attr('fill')).toBe('#f00');

    graph.once('nodeselectchange', evt => {
      expect(evt.select).toBe(false);
      expect(evt.selectedItems.edges.length).toBe(0);
      expect(evt.selectedItems.nodes.length).toBe(0);
    });

    graph.emit('canvas:click', { })
    expect(itemKeyShape.attr('fill')).toBe('#C6E5FF');
    expect(item2KeyShape.attr('fill')).toBe('#C6E5FF');
  });

  // TODO: 用 emit 的方式可以成功，但鼠标事件没有响应，等待 G 修复 svg 元素鼠标事件
  it('drag-node', () => {
    graph.emit('node:dragstart', { item, target: item, x: 0, y: 0});
    graph.emit('node:drag', { item, target: item, x: 50, y: 150});
    graph.emit('node:drag', { item, target: item, x: 50, y: 250});
    graph.emit('node:dragend', { item, target: item, x: 50, y: 250});
    expect(item.getModel().x).toBe(100);
    expect(item.getModel().y).toBe(300);
    const edge = graph.getEdges()[0];
    expect(edge.getModel().startPoint.x).toBe(98.61228093904431);
    expect(edge.getModel().startPoint.y).toBe(289.5921070428323);

    // multiple selected nodes to drag
    const item2 = graph.getNodes()[1];
    graph.setItemState(item, 'selected', true);
    graph.setItemState(item2, 'selected', true);
    graph.emit('node:dragstart', { item, target: item, x: 0, y: 0});
    graph.emit('node:drag', { item, target: item, x: 50, y: 50});
    graph.emit('node:dragend', { item, target: item, x: 50, y: 50});
    expect(item.getModel().x).toBe(150);
    expect(item.getModel().y).toBe(350);
    expect(item2.getModel().x).toBe(130);
    expect(item2.getModel().y).toBe(200);
  });

  // TODO: 用 emit 的方式可以成功，但鼠标事件没有响应，等待 G 修复 svg 元素鼠标事件
  it('tooltip edge-tooltip', () => {
    graph.setMode('tooltip');
    graph.emit('node:mouseenter', { item, canvasX: 150, canvasY: 350 });
    const tooltipCon = document.getElementsByClassName('g6-node-tooltip')[0] as HTMLElement;
    expect(tooltipCon.style.left).toBe('162px');
    expect(tooltipCon.style.top).toBe('328px');
    graph.emit('node:mouseleave', { item, canvasX: 150, canvasY: 350 });
    expect(tooltipCon.style.visibility).toBe('hidden');

    // edge-tooltip
    const edge = graph.getEdges()[0];
    graph.emit('edge:mouseenter', { item: edge, canvasX: 100, canvasY: 300 });
    const edgeTooltipCon = document.getElementsByClassName('g6-edge-tooltip')[0] as HTMLElement;
    expect(edgeTooltipCon.style.left).toBe('112px');
    expect(edgeTooltipCon.style.top).toBe('278px');
    graph.emit('node:mouseleave', { item: edge, canvasX: 150, canvasY: 350 });
    expect(tooltipCon.style.visibility).toBe('hidden');
    graph.destroy();
  });
});


describe('layouts', () => {
  const data = {
    nodes: [
      {
        id: 'node1'
      },
      {
        id: 'node2'
      },
      {
        id: 'node3'
      },
      {
        id: 'node4'
      },
      {
        id: 'node5'
      },
    ],
    edges: [
      {
        source: 'node1',
        target: 'node2'
      },
      {
        source: 'node2',
        target: 'node3'
      },
      {
        source: 'node1',
        target: 'node3'
      },
      {
        source: 'node1',
        target: 'node4'
      },
      {
        source: 'node4',
        target: 'node5'
      },
    ],
  };

  it('without layout', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      renderer: 'svg'
    });
    graph.data(data);
    graph.render();
    const item = graph.getNodes()[0];
    expect(item.getModel().x).not.toBe(null);
    expect(item.getModel().x).not.toBe(undefined);
    expect(item.getModel().y).not.toBe(null);
    expect(item.getModel().y).not.toBe(undefined);
    graph.destroy();
  });
  it('with force layout', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      renderer: 'svg',
      layout: {
        type: 'force'
      }
    });
    graph.data(data);
    graph.render();
    const item = graph.getNodes()[0];
    expect(item.getModel().x).not.toBe(null);
    expect(item.getModel().x).not.toBe(undefined);
    expect(item.getModel().y).not.toBe(null);
    expect(item.getModel().y).not.toBe(undefined);
    graph.destroy();
  });
  it('with fruchterman layout', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      renderer: 'svg',
      layout: {
        type: 'fruchterman'
      }
    });
    graph.data(data);
    graph.render();
    const item = graph.getNodes()[0];
    expect(item.getModel().x).not.toBe(null);
    expect(item.getModel().x).not.toBe(undefined);
    expect(item.getModel().y).not.toBe(null);
    expect(item.getModel().y).not.toBe(undefined);
    graph.destroy();
  });
  it('with radial layout', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      renderer: 'svg',
      layout: {
        type: 'radial'
      }
    });
    graph.data(data);
    graph.render();
    const item = graph.getNodes()[0];
    expect(item.getModel().x).toBe(250);
    expect(item.getModel().y).toBe(250);
    graph.destroy();
  });
  it('with circular layout', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      renderer: 'svg',
      layout: {
        type: 'circular'
      }
    });
    graph.data(data);
    graph.render();
    const item = graph.getNodes()[0];
    expect(item.getModel().x).not.toBe(null);
    expect(item.getModel().x).not.toBe(undefined);
    expect(item.getModel().y).not.toBe(null);
    expect(item.getModel().y).not.toBe(undefined);
    graph.destroy();
  });
  it('with grid layout', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      renderer: 'svg',
      layout: {
        type: 'grid'
      }
    });
    graph.data(data);
    graph.render();
    const item = graph.getNodes()[0];
    expect(item.getModel().x).toBe(125);
    expect(item.getModel().y).toBe(83.33333333333333);
    graph.destroy();
  });
  it('with concentric layout', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      renderer: 'svg',
      layout: {
        type: 'concentric'
      }
    });
    graph.data(data);
    graph.render();
    const item = graph.getNodes()[0];
    expect(item.getModel().x).toBe(250);
    expect(item.getModel().y).toBe(250);
    graph.destroy();
  });
  it('with mds layout', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      renderer: 'svg',
      layout: {
        type: 'mds'
      }
    });
    graph.data(data);
    graph.render();
    const item = graph.getNodes()[0];
    expect(item.getModel().x).toBe(238.07642639877923);
    expect(item.getModel().y).toBe(250);
    graph.destroy();
  });
  it('with dagre layout', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      renderer: 'svg',
      layout: {
        type: 'dagre'
      },
      defaultEdge: {
        type: 'polyline'
      }
    });
    graph.data(data);
    graph.render();
    const item = graph.getNodes()[0];
    expect(item.getModel().x).not.toBe(null);
    expect(item.getModel().x).not.toBe(undefined);
    expect(item.getModel().y).not.toBe(null);
    expect(item.getModel().y).not.toBe(undefined);
    graph.destroy();
  });
  // TODO: 没有清空 polyline
  it('change layout', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      // renderer: 'svg',
      layout: {
        type: 'circular'
      }
    });
    graph.data(data);
    graph.render();
    data.edges.forEach((edge: any) => {
      edge.type = 'line';
    });
    
    graph.updateLayout({
      type: 'force'
    });
    expect(graph.get('layoutController').layoutMethod.type).toBe('force');
    graph.destroy();
  });
  it('subgraph layout', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      layout: {
        type: 'grid'
      }
    });
    graph.data(data);
    graph.render();

    data.nodes.forEach((node: any) => {
      node.label = node.id;
    });
    const subdata = {
      nodes: [ data.nodes[0], data.nodes[1], data.nodes[2] ],
      edges: [ data.edges[0],  data.edges[1] ]
    };
    const gridLayout = new Layout['circular']({
      center: [ 250, 250 ]
    });
    gridLayout.init(subdata);
    gridLayout.execute();
    graph.positionsAnimate();
    const item = graph.getNodes()[0];
    expect(item.getModel().x).not.toBe(null);
    expect(item.getModel().x).not.toBe(undefined);
    expect(item.getModel().y).not.toBe(null);
    expect(item.getModel().y).not.toBe(undefined);
    graph.destroy();
  });
});


describe('built-in items', () => {
  const data = {
    nodes: [
      {
        id: 'node1',
        type: 'circle',
        x: 50,
        y: 50
      },
      {
        id: 'node2',
        type: 'rect',
        x: 200,
        y: 50
      },
      {
        id: 'node3',
        type: 'ellipse',
        x: 350,
        y: 50
      },
      {
        id: 'node4',
        type: 'star',
        x: 50,
        y: 150
      },
      {
        id: 'node5',
        type: 'diamond',
        x: 200,
        y: 150
      },
      {
        id: 'node6',
        type: 'triangle',
        x: 350,
        y: 150
      },
      {
        id: 'node7',
        type: 'modelRect',
        x: 150,
        y: 300
      },
    ],
    edges: [
      {
        source: 'node1',
        target: 'node2',
        type: 'line'
      },
      {
        source: 'node2',
        target: 'node3',
        type: 'quadratic'
      },
      {
        source: 'node3',
        target: 'node4',
        type: 'cubic'
      },
      {
        source: 'node4',
        target: 'node5',
        type: 'cubic-horizontal'
      },
      {
        source: 'node4',
        target: 'node7',
        type: 'cubic-vertical'
      },
      {
        source: 'node6',
        target: 'node7',
        type: 'arc'
      },
      {
        source: 'node1',
        target: 'node1',
        type: 'loop'
      },
      {
        source: 'node6',
        target: 'node7',
        type: 'polyline'
      },
    ],
  };
  data.nodes.forEach((node: any, i) => {
    node.label = `node-${i+1}`
  });

  const graph = new Graph({
    container: div,
    width: 500,
    height: 500,
    renderer: 'svg'
  });

  it('default style', () => {
    graph.data(data);
    graph.render();
    const item = graph.getNodes()[0];
    expect(item.getModel().x).not.toBe(null);
    expect(item.getModel().x).not.toBe(undefined);
    expect(item.getModel().y).not.toBe(null);
    expect(item.getModel().y).not.toBe(undefined);
  });
  it('update node style', () => {
    graph.data(data);
    graph.render();
    const item = graph.getNodes()[0];
    graph.updateItem(item, {
      style: {
        stroke: '#f00',
        lineWidth: 3,
        fill: '#0f0'
      },
      linkPoints: {
        top: true,
        left: true,
        fill: '#fff',
        stroke: '#333',
        lineWidth: 1,
        size: 6
      }
    });
    expect(item.get('group').get('children').length).toBe(4);

    const modelRect = graph.getNodes()[6];
    graph.updateItem(modelRect, {
      style: {
        fill: '#ccc',
        shadowColor: '#0f0',
        shadowBlur: 50,
        shadowOffsetX: 50
      },
      linkPoints: {
        right: true,
        left: true,
        fill: '#fff',
        stroke: '#f00',
        lineWidth: 1,
        size: 6
      },
      description: 'description for it',
      descriptionCfg: {
        style: {
          // TODO: G svg fontSize 小于 12 报错
          // fontSize: 10,
          fill: '#000'
        }
      }
    });
    expect(modelRect.get('group').get('children').length).toBe(8);
  });

  it('update edge style', () => {
    // loop
    const loop = graph.getEdges()[6];
    graph.updateItem(loop, {
      style: {
        endArrow: true
      },
      loopCfg: {
        position: 'left',
        dist: 100,
        clockwise: false,
      }
    });
    const loopShape = loop.get('group').get('children')[0];
    expect(loopShape.attr('endArrow')).toBe(true);

    const cubic = graph.getEdges()[2];
    graph.updateItem(cubic, {
      label: 'cubic label',
      labelCfg: {
        autoRotate: true
      },
      style: {
        stroke: '#f00',
        lineWidth: 2
      }
    });
    const cubicShape = cubic.get('group').get('children')[0];
    const cubicTextShape = cubic.get('group').get('children')[1];
    expect(cubicShape.attr('stroke')).toBe('#f00');
    expect(cubicTextShape.attr('text')).toBe('cubic label');

    const polyline = graph.getEdges()[7];
    graph.updateItem(polyline.getSource(), {
      anchorPoints: [[ 0, 1 ]]
    });
    graph.updateItem(polyline.getTarget(), {
      anchorPoints: [[ 1, 0.5 ]]
    });
    graph.updateItem(polyline, {
      controlPoints: [ { x: 315, y: 300 } ],
      sourceAnchor: 0,
      targetAnchor: 0,
      style: {
        stroke: '#000',
        lineWidth: 3
      }
    });
    const polylineShape = polyline.get('group').get('children')[0];
    expect(polylineShape.attr('path')[0][1]).toBe(314.85898208618164);
    expect(polylineShape.attr('path')[0][2]).toBe(185.14101791381836);
    expect(polylineShape.attr('path')[1][1]).toBe(315);
    expect(polylineShape.attr('path')[1][2]).toBe(300);
    expect(polylineShape.attr('path')[2][1]).toBe(243);
    expect(polylineShape.attr('path')[2][2]).toBe(300);
  });
});


describe('tree graph', () => {
  const data = {
    isRoot: true,
    id: 'Root',
    label: 'root',
    children: [
      {
        id: 'SubTreeNode1',
        label: 'SubTreeNode1',
        children: [
          {
            id: 'SubTreeNode1.1',
            label: 'SubTreeNode1.1',
          },
          {
            id: 'SubTreeNode1.2',
            label: 'SubTreeNode1.2',
          },
        ],
      },
      {
        id: 'SubTreeNode2',
        label: 'SubTreeNode2',
      },
    ],
  };

  const graph = new TreeGraph({
    container: div,
    width: 500,
    height: 500,
    renderer: 'svg',
    layout: {
      type: 'dendrogram',
      direction: 'LR', // H / V / LR / RL / TB / BT
      nodeSep: 50,
      rankSep: 100,
    },
    modes: {
      default: ['drag-canvas', 'drag-node', 'collapse-expand'],
    },
  });

  it('render', () => {
    graph.data(data);
    graph.render();
    graph.fitView(50);
    const item = graph.findById('SubTreeNode1');
    expect(item.getModel().x).not.toBe(null);
    expect(item.getModel().x).not.toBe(undefined);
    expect(item.getModel().y).not.toBe(null);
    expect(item.getModel().y).not.toBe(undefined);
  });

  it('collapse-expand', () => {
    const item = graph.findById('SubTreeNode1');
    graph.emit('node:click', { item })
    expect(item.getModel().collapsed).toBe(true);
    setTimeout(() => {
      graph.emit('node:click', { item })
      expect(item.getModel().collapsed).toBe(false);
    }, 500);
  });
});


// describe.only('custom group', () => {
//   const data = {
//     nodes: [
//       {
//         id: 'node1',
//         label: 'node1',
//         groupId: 'group1',
//         x: 100,
//         y: 100,
//       },
//       {
//         id: 'node2',
//         label: 'node2',
//         groupId: 'group1',
//         x: 150,
//         y: 100,
//       },
//       {
//         id: 'node3',
//         label: 'node3',
//         groupId: 'group2',
//         x: 300,
//         y: 100,
//       },
//       {
//         id: 'node7',
//         groupId: 'p1',
//         x: 200,
//         y: 200,
//       },
//       {
//         id: 'node6',
//         groupId: 'bym',
//         label: 'rect',
//         x: 100,
//         y: 300,
//         type: 'rect',
//       },
//       {
//         id: 'node9',
//         label: 'noGroup',
//         x: 300,
//         y: 210,
//       },
//     ],
//   };
//   const graph = new Graph({
//     container: div,
//     width: 500,
//     height: 500,
//     // renderer: 'svg',
//     modes: {
//       default: [ 'collapse-expand-group', 'drag-node-with-group', 'drag-group' ],
//     },
//   });

//   it('render', () => {
//     graph.data(data);
//     graph.render();
//   });

//   // it('collapse-expand-group', () => {
//   //   const item = graph.findById('SubTreeNode1');
//   //   graph.emit('node:click', { item })
//   //   expect(item.getModel().collapsed).toBe(true);
//   //   setTimeout(() => {
//   //     graph.emit('node:click', { item })
//   //     expect(item.getModel().collapsed).toBe(false);
//   //   }, 500);
//   // });
// });