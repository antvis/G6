import '../../../src/behavior';
import { scale, translate } from '../../../src/util/math';
import { GraphData, Item } from '../../../src/types';
import Graph from '../implement-graph';

const div = document.createElement('div');
div.id = 'global-spec';
document.body.appendChild(div);

describe('graph', () => {
  const globalGraph = new Graph({
    container: div,
    width: 500,
    height: 500,
    modes: {
      default: ['drag-node'],
    },
  });
  const data = {
    nodes: [
      {
        id: 'node1',
        x: 150,
        y: 50,
        label: 'node1',
      },
      {
        id: 'node2',
        x: 200,
        y: 150,
        label: 'node2',
      },
      {
        id: 'node3',
        x: 100,
        y: 150,
        label: 'node3',
      },
    ],
    edges: [
      {
        source: 'node1',
        target: 'node2',
      },
      {
        source: 'node2',
        target: 'node3',
      },
      {
        source: 'node3',
        target: 'node1',
      },
    ],
  };
  globalGraph.data(data);
  globalGraph.render();

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

  it('new Graph without width & height', () => {
    const container = document.createElement('div');
    container.id = 'autoWH';
    container.style.height = '200px';
    document.body.appendChild(container);
    const graph = new Graph({
      container: container,
    });

    const data = {
      nodes: [
        {
          id: 'node',
          label: 'width',
          x: 200,
          y: 150,
        },
      ],
    };
    graph.data(data);
    graph.render();

    const domContainer = graph.getContainer();
    expect(domContainer.style.width).toEqual('');
    expect(domContainer.style.height).toEqual('200px');
    const canvas = graph.get('canvas');
    // expect(canvas.get('width')).toBe(539);
    expect(canvas.get('height')).toBe(200);
    graph.destroy();
    expect(graph.destroyed).toBe(true);
  });

  it('render without data', () => {
    const inst = new Graph({
      container: div,
      width: 500,
      height: 500,
    });

    inst.data(null);

    expect(() => {
      inst.render();
    }).toThrowError('data must be defined first');
  });

  it('translate', () => {
    const canvasMatrix = globalGraph.get('canvas').getMatrix();
    globalGraph.translate(100, 100);

    const matrix = globalGraph.get('group').getMatrix();

    expect(canvasMatrix).toBe(null);
    expect(matrix[6]).toBe(100);
    expect(matrix[7]).toBe(100);

    globalGraph.get('group').resetMatrix();
  });

  it('moveTo', () => {
    let group = globalGraph.get('group');
    let bbox = group.getCanvasBBox();

    globalGraph.moveTo(100, 100);

    group = globalGraph.get('group');
    bbox = group.getCanvasBBox();

    expect(bbox.x).toBe(100);
    expect(bbox.y).toBe(100);

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
    });

    expect(graph.get('width')).toBe(500);
    expect(graph.get('height')).toBe(500);

    expect(typeof graph.changeSize).toEqual('function');
    graph.changeSize(300, 300);

    expect(graph.get('width')).toBe(300);
    expect(graph.get('height')).toBe(300);

    // 专门用于测试使用非 number 类型 会报错的情况 // TODO 可以移走这个测试, TS 本身就限制了类型参数
    // expect(() => {
    //   graph.changeSize('x', 10);
    // }).toThrowError(
    //   'invalid canvas width & height, please make sure width & height type is number',
    // );

    graph.destroy();
  });

  it('getCurrentMode', () => {
    const mode = globalGraph.getCurrentMode();
    expect(mode).toBe('default');
  });

  it('data & changeData & save', () => {
    const data = {
      nodes: [
        {
          id: 'a',
          type: 'circle',
          color: '#333',
          x: 30,
          y: 30,
          size: 20,
          label: 'a',
        },
        {
          id: 'b',
          type: 'ellipse',
          color: '#666',
          x: 50,
          y: 60,
          size: [30, 40],
          label: 'b',
        },
        {
          id: 'c',
          type: 'rect',
          color: '#999',
          x: 100,
          y: 70,
          size: 20,
          label: 'c',
        },
      ],
      edges: [
        {
          source: 'a',
          target: 'b',
          id: 'd',
        },
        {
          source: 'a',
          target: 'c',
          id: 'e',
        },
      ],
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
      type: 'circle',
      color: '#333',
      x: 100,
      y: 80,
      size: 30,
      label: 'f',
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

  it('change data with null', () => {
    const data = {
      nodes: [
        {
          id: 'a',
          type: 'circle',
          color: '#333',
          x: 30,
          y: 30,
          size: 20,
          label: 'a',
        },
        {
          id: 'b',
          type: 'ellipse',
          color: '#666',
          x: 50,
          y: 60,
          size: [30, 40],
          label: 'b',
        },
        {
          id: 'c',
          type: 'rect',
          color: '#999',
          x: 100,
          y: 70,
          size: 20,
          label: 'c',
        },
      ],
      edges: [
        {
          source: 'a',
          target: 'b',
          id: 'd',
        },
        {
          source: 'a',
          target: 'c',
          id: 'e',
        },
      ],
    };
    globalGraph.data(data);
    globalGraph.render();
    const newData = null;
    const nodeNumBeforeChange = globalGraph.getNodes().length;
    globalGraph.changeData(newData);
    const nodeNumAfterChange = globalGraph.getNodes().length;
    expect(nodeNumBeforeChange).toBe(nodeNumAfterChange);
  });

  it('change data with animate', () => {
    const data = {
      nodes: [
        {
          id: 'a',
          type: 'circle',
          color: '#333',
          x: 30,
          y: 30,
          size: 20,
          label: 'a',
        },
        {
          id: 'b',
          type: 'ellipse',
          color: '#666',
          x: 50,
          y: 60,
          size: [30, 40],
          label: 'b',
        },
        {
          id: 'c',
          type: 'rect',
          color: '#999',
          x: 100,
          y: 70,
          size: 20,
          label: 'c',
        },
      ],
      edges: [
        {
          source: 'a',
          target: 'b',
          id: 'd',
        },
        {
          source: 'a',
          target: 'c',
          id: 'e',
        },
      ],
    };
    globalGraph.data(data);
    globalGraph.render();
    globalGraph.set('animate', true);
    data.nodes[0].x = 100;
    data.nodes[0].y = 100;
    globalGraph.changeData(data);
    const nodeModel = globalGraph.getNodes()[0].getModel();
    expect(nodeModel.x).toBe(100);
    expect(nodeModel.y).toBe(100);
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
    const node3 = globalGraph.addItem('node', { id: 'node3', x: 100, y: 100, size: 50 });

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
    const data = { id: 'node4', x: 100, y: 50, size: 50, className: 'test test2' };
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
    nodeStateStyles: {
      a: {
        fill: 'red',
      },
      b: {
        stroke: 'red',
      },
    },
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
    expect(edge.get('keyShape').attr('path')).toEqual([['M', 10, 10], ['L', 100, 100]]);
  });

  it('loop', () => {
    graph.set('linkCenter', false);

    const node = graph.addItem('node', {
      id: 'circleNode',
      x: 150,
      y: 150,
      style: { fill: 'yellow' },
      anchorPoints: [[0, 0], [0, 1]],
    });

    const edge1 = graph.addItem('edge', {
      id: 'edge',
      source: 'circleNode',
      target: 'circleNode',
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
      source: 'circleNode',
      target: 'circleNode',
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
      source: 'circleNode',
      target: 'circleNode',
      type: 'loop',
      loopCfg: {
        position: 'top-right',
        dist: 60,
      },
      style: { endArrow: true },
    });

    const edge4 = graph.addItem('edge', {
      id: 'edge4',
      source: 'circleNode',
      target: 'circleNode',
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
      source: 'circleNode',
      target: 'circleNode',
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
      source: 'circleNode',
      target: 'circleNode',
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
      source: 'circleNode',
      target: 'circleNode',
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
      source: 'circleNode',
      target: 'circleNode',
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
    graph.clearItemStates(node, ['a', 'b']);

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
      type: 'simple-rect',
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
    // addItem 时候 model 中的 style 会和 defaultNode 中定义的做 merge
    expect(keyShape.attr('fill')).toEqual('red');
    expect(keyShape.attr('stroke')).toEqual('#666');

    defaultGraph.setItemState(node, 'selected', true);

    expect(keyShape.attr('fill')).toEqual('green');
    expect(keyShape.attr('fillStyle')).toBe(undefined);
    expect(keyShape.attr('stroke')).toEqual('red');
    expect(keyShape.attr('strokeStyle')).toBe(undefined);

    defaultGraph.setItemState(node, 'selected', false);

    // addItem 时候 model 中的 style 会和 defaultNode 中定义的做 merge
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
    const edge = defaultGraph.addItem('edge', { id: 'edge', source: 'node1', target: 'node2' });

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
    expect(edgeKeyShape.attr('shadowColor')).toBe(undefined);
    defaultGraph.destroy();
  });

  it('graph with default cfg', () => {
    const defaultGraph = new Graph({
      container: div,
      width: 500,
      height: 500,
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

describe('mapper fn', () => {
  const graph = new Graph({
    container: div,
    width: 500,
    height: 500,
    defaultNode: {
      type: 'circle',
      style: {
        fill: 'red',
        opacity: 1,
      },
    },
  });

  it('node & edge mapper', () => {
    graph.node(node => ({
      id: `${node.id}Mapped`,
      size: [30, 30],
      label: node.id,
      type: 'simple-rect',
      style: { fill: node.value === 100 ? '#666' : '#ccc' },
      labelCfg: {
        style: { fill: '#666' },
      },
    }));

    graph.edge(edge => ({
      id: `edge${edge.id}`,
      label: edge.id,
      labelCfg: {
        position: 'start',
      },
      style: {
        fill: '#ccc',
        opacity: 0.5,
      },
    }));

    const node: Item = graph.addItem('node', { id: 'node', x: 100, y: 100, value: 100 });

    expect(node.get('id')).toEqual('nodeMapped');

    let keyShape = node.getKeyShape();
    expect(keyShape.attr('width')).toEqual(30);
    expect(keyShape.attr('height')).toEqual(30);
    expect(keyShape.attr('fill')).toEqual('#666');

    const container = node.getContainer();
    let label = container.find(element => element.get('className') === 'node-label');
    expect(label).not.toBe(undefined);
    expect(label.attr('text')).toEqual('node');
    expect(label.attr('fill')).toEqual('#666');

    graph.addItem('node', { id: 'node2', x: 200, y: 200 });

    const edge = graph.addItem('edge', { id: 'edge', source: 'nodeMapped', target: 'node2Mapped' });

    keyShape = edge.getKeyShape();
    expect(keyShape.attr('fill')).toEqual('#ccc');
    expect(keyShape.attr('opacity')).toEqual(0.5);
    expect(keyShape.get('type')).toEqual('path');

    label = edge.getContainer().find(element => element.get('className') === 'edge-label');
    expect(label).not.toBe(undefined);
    expect(label.attr('text')).toEqual('edge');
    expect(label.attr('x')).toEqual(115.5);
    expect(label.attr('y')).toEqual(100);

    graph.updateItem(node, { value: 50 });
    expect(node.getKeyShape().attr('fill')).toEqual('#ccc');
  });

  it('node & edge mapper with states', () => {
    graph.node(node => ({
      type: 'rect',
      label: node.id,
      style: {
        fill: '#666',
        opacity: 1,
      },
      stateStyles: {
        selected: { fill: 'blue' },
        custom: { fill: 'green', opacity: 0.5 },
      },
    }));

    graph.edge(() => ({
      stateStyles: {
        selected: { lineWidth: 2 },
        custom: { opacity: 0.5 },
      },
    }));

    const node = graph.addItem('node', { id: 'node', x: 50, y: 50 });

    let keyShape = node.getKeyShape();
    expect(keyShape.attr('fill')).toEqual('#666');
    expect(node.getContainer().find(element => element.get('className') === 'node-label')).not.toBe(
      undefined,
    );

    graph.setItemState(node, 'selected', true);
    expect(keyShape.attr('blue'));

    graph.setItemState(node, 'custom', true);
    expect(keyShape.attr('green'));

    // clear all states of  the item
    graph.clearItemStates(node);
    expect(keyShape.attr('fill')).toEqual('#666');

    const edge = graph.addItem('edge', { id: 'edge2', source: 'node', target: 'node2Mapped' });

    keyShape = edge.getKeyShape();
    expect(keyShape.attr('stroke')).toEqual('rgb(224, 224, 224)');
    expect(keyShape.attr('lineWidth')).toEqual(1);
    expect(keyShape.attr('fillOpacity')).toEqual(1);

    graph.setItemState(edge, 'selected', true);
    expect(keyShape.attr('stroke')).toEqual('rgb(95, 149, 255)');
    expect(keyShape.attr('lineWidth')).toEqual(2);
    expect(keyShape.attr('fillOpacity')).toEqual(1);

    graph.setItemState(edge, 'custom', true);
    expect(keyShape.attr('stroke')).toEqual('rgb(95, 149, 255)');
    expect(keyShape.attr('lineWidth')).toEqual(2);
    expect(keyShape.attr('opacity')).toEqual(0.5);
  });
});

describe('auto rotate label on edge', () => {
  const graph = new Graph({
    container: div,
    width: 500,
    height: 500,
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
    expect(label1Matrix[0]).toBe(0.2873478855664496);
    expect(label1Matrix[1]).toBe(0.9578262852211201);
    expect(label1Matrix[3]).toBe(-0.9578262852211201);
    expect(label1Matrix[4]).toBe(0.2873478855664496);
    expect(label1Matrix[6]).toBe(142.10501596029277);
    expect(label1Matrix[7]).toBe(9.006502903982238);
    const edge2 = graph.getEdges()[1];
    const label2 = edge2.get('group').get('children')[1];
    const label2Matrix = label2.attr('matrix');
    expect(label2Matrix).toBe(null);
  });

  // it.only('drag node', () => {

  //   const node = graph.getNodes()[1];
  //   graph.emit('node:dragstart', { x: 80, y: 150, item: node });
  //   graph.emit('node:drag', { x: 200, y: 200, item: node });
  //   graph.emit('node:dragend', { x: 200, y: 200, item: node });
  //   const edge1 = graph.getEdges()[0];
  //   const label1 = edge1.get('group').get('children')[1];
  //   const label1Matrix = label1.attr('matrix');
  //   console.log(label1Matrix);
  //   expect(label1Matrix[0]).toBe(0.7071067811865476);
  //   expect(label1Matrix[1]).toBe(0.7071067811865475);
  //   expect(label1Matrix[3]).toBe(-0.7071067811865475);
  //   expect(label1Matrix[4]).toBe(0.7071067811865476);
  //   expect(label1Matrix[6]).toBe(124.99999999999999);
  //   expect(label1Matrix[7]).toBe(-51.77669529663689);
  //   const edge2 = graph.getEdges()[1];
  //   const label2 = edge2.get('group').get('children')[1];
  //   const label2Matrix = label2.attr('matrix');
  //   expect(label2Matrix).toBe(null);
  // });

  it('zoom and pan', () => {
    graph.zoom(0.5);
    graph.moveTo(100, 120);
    const group = graph.get('group');
    const groupMatrix = group.attr('matrix');
    expect(groupMatrix[0]).toBe(0.5);
    expect(groupMatrix[4]).toBe(0.5);
    const bbox = graph.get('group').getCanvasBBox();
    expect(bbox.x).toBe(100);
    expect(bbox.y).toBe(120);
  });
});

describe('node Neighbors', () => {
  const graph = new Graph({
    container: 'global-spec',
    width: 500,
    height: 500,
  });
  const data = {
    nodes: [
      {
        id: 'A',
      },
      {
        id: 'B',
      },
      {
        id: 'C',
      },
      {
        id: 'D',
      },
      {
        id: 'E',
      },
      {
        id: 'F',
      },
      {
        id: 'G',
      },
      {
        id: 'H',
      },
    ],
    edges: [
      {
        source: 'A',
        target: 'B',
      },
      {
        source: 'B',
        target: 'C',
      },
      {
        source: 'C',
        target: 'G',
      },
      {
        source: 'A',
        target: 'D',
      },
      {
        source: 'A',
        target: 'E',
      },
      {
        source: 'E',
        target: 'F',
      },
      {
        source: 'F',
        target: 'D',
      },
    ],
  };

  graph.data(data);
  graph.render();

  it('getSourceNeighbors', () => {
    const neighbors = graph.getNeighbors('B', 'target');
    expect(neighbors.length).toBe(1);
    expect(neighbors[0].getID()).toEqual('C');

    const neighborE = graph.getNeighbors('A', 'target');
    expect(neighborE.length).toBe(3);
    expect(neighborE[0].getID()).toEqual('B');
  });

  it('getTargetNeighbors', () => {
    const neighbors = graph.getNeighbors('B', 'source');
    expect(neighbors.length).toBe(1);
    expect(neighbors[0].getID()).toEqual('A');

    const neighborE = graph.getNeighbors('E', 'source');
    expect(neighborE.length).toBe(1);
    expect(neighborE[0].getID()).toEqual('A');
  });

  it('getNeighbors', () => {
    const neighbors = graph.getNeighbors('B');
    expect(neighbors.length).toBe(2);
    expect(neighbors[0].getID()).toEqual('A');
    expect(neighbors[1].getID()).toEqual('C');
  });

  it('getNodeDegree', () => {
    let degree = graph.getNodeDegree('A');
    expect(degree).toEqual(3);
    graph.addItem('node', {
      id: 'test',
      label: 'testNode',
    });
    degree = graph.getNodeDegree('test');
    expect(degree).toEqual(0);
  });
});

describe('redo stack & undo stack', () => {
  it('default stack is undefined', () => {
    const graph = new Graph({
      container: 'global-spec',
      width: 500,
      height: 500,
    });

    expect(graph.getUndoStack()).toBe(undefined);
    expect(graph.getRedoStack()).toBe(undefined);
  });

  const graph = new Graph({
    container: 'global-spec',
    width: 500,
    height: 500,
    enabledStack: true,
  });

  it('undo & redo stack is not null', () => {
    expect(graph.getUndoStack()).not.toBe(null);
    expect(graph.getRedoStack()).not.toBe(null);
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
        label: 'node2',
        x: 300,
        y: 100,
      },
    ],
  };

  graph.data(data);
  graph.render();

  it('fill undo stack', () => {
    // redo 后，undo stack 有一条数据
    let stackData = graph.getStackData();
    let undoStack = stackData.undoStack;
    let redoStack = stackData.redoStack;
    expect(undoStack.length).toBe(1);
    expect(undoStack[0].action).toEqual('render');
    expect(undoStack[0].data.after.nodes.length).toEqual(2);
    expect(redoStack.length).toBe(0);

    // update 后，undo stack 中有 2 条数据，一条 render，一条 update
    graph.update('node1', {
      x: 120,
      y: 200,
    });

    stackData = graph.getStackData();
    undoStack = stackData.undoStack;
    expect(undoStack.length).toBe(2);

    let firstStackData = undoStack[0];
    expect(firstStackData.action).toEqual('update');
    expect(firstStackData.data.after.nodes[0].id).toEqual('node1');
    expect(firstStackData.data.after.nodes[0].x).toEqual(120);
    expect(firstStackData.data.after.nodes[0].y).toEqual(200);

    // 执行 update 后，undo stack 中有3条数据
    graph.update('node2', {
      x: 120,
      y: 350,
    });

    stackData = graph.getStackData();
    undoStack = stackData.undoStack;
    expect(undoStack.length).toBe(3);

    firstStackData = undoStack[0];
    expect(firstStackData.action).toEqual('update');
    expect(firstStackData.data.after.nodes[0].id).toEqual('node2');
    expect(firstStackData.data.after.nodes[0].x).toEqual(120);
    expect(firstStackData.data.after.nodes[0].y).toEqual(350);

    // addItem 后，undo 栈中有4条数据，1个render、2个update、1个add
    graph.addItem('node', {
      id: 'node3',
      label: 'node3',
      x: 150,
      y: 150,
    });

    stackData = graph.getStackData();
    undoStack = stackData.undoStack;
    expect(undoStack.length).toBe(4);

    firstStackData = undoStack[0];
    expect(firstStackData.action).toEqual('add');
    expect(firstStackData.data.after.nodes[0].id).toEqual('node3');
    expect(firstStackData.data.after.nodes[0].x).toEqual(150);
    expect(firstStackData.data.after.nodes[0].y).toEqual(150);

    // hideItem 后，undo 栈中有5条数据，1个render、2个update、1个add、1个visible
    graph.hideItem('node1');

    stackData = graph.getStackData();
    undoStack = stackData.undoStack;
    expect(undoStack.length).toBe(5);

    firstStackData = undoStack[0];
    expect(firstStackData.action).toEqual('visible');
    expect(firstStackData.data.after.nodes[0].id).toEqual('node1');

    // remove 后，undo 栈中有6条数据，1个render、2个update、1个add、1个visible、1个delete
    graph.remove('node2');

    stackData = graph.getStackData();
    undoStack = stackData.undoStack;
    expect(undoStack.length).toBe(6);

    firstStackData = undoStack[0];
    expect(firstStackData.action).toEqual('delete');
    expect(firstStackData.data.before.nodes[0].id).toEqual('node2');
    expect(firstStackData.data.before.nodes[0].itemType).toEqual('node');
  });

  it('clear stack', () => {
    graph.clearStack();
    let stackData = graph.getStackData();
    let undoStack = stackData.undoStack;
    let redoStack = stackData.redoStack;

    expect(undoStack.length).toBe(0);
    expect(redoStack.length).toBe(0);
  });

  it('add edge', () => {
    const source = graph.addItem('node', {
      id: 'source',
      color: '#666',
      x: 50,
      y: 50,
      style: { lineWidth: 2, fill: '#666' },
    });
    const target = graph.addItem('node', {
      id: 'target',
      color: '#666',
      x: 300,
      y: 300,
      type: 'rect',
      style: { lineWidth: 2, fill: '#666' },
    });
    graph.addItem('edge', {
      source,
      target,
      label: 'test label',
      labelCfg: { autoRotate: true },
    });

    graph.destroy();
  });
});
