import '../../../src/behavior';
import '../../../src/shape';

import Simulate from 'event-simulate';
import Graph from '../../../src/graph/graph';
import { INode } from '../../../src/interface/item';

const div = document.createElement('div');
div.id = 'drag-spec';
document.body.appendChild(div);

describe('drag-node', () => {
  it('drag node', () => {
    const graph: Graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-node',
            enableDelegate: true,
          },
        ],
      },
    });
    const data = {
      nodes: [
        {
          id: 'node',
          x: 50,
          y: 50,
        },
      ],
    };
    graph.data(data);
    graph.render();
    const node = graph.addItem('node', {
      color: '#666',
      x: 50,
      y: 50,
      r: 20,
      style: { lineWidth: 2, fill: '#666' },
    });
    graph.emit('node:dragstart', { x: 100, y: 100, item: node });
    graph.emit('node:drag', { x: 120, y: 120, item: node });
    const dragMatrix = node.get('group').getMatrix();
    expect(dragMatrix[6]).toEqual(50);
    expect(dragMatrix[7]).toEqual(50);

    graph.emit('node:dragend', { x: 120, y: 120, item: node });
    const matrix = node.get('group').getMatrix();
    expect(matrix[0]).toEqual(1);
    expect(matrix[6]).toEqual(70);
    expect(matrix[7]).toEqual(70);
    graph.destroy();
  });
  it('drag locked node', () => {
    const graph: Graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-node',
            enableDelegate: true,
          },
        ],
      },
    });
    const data = {
      nodes: [
        {
          id: 'node',
          x: 50,
          y: 50,
        },
      ],
    };
    graph.data(data);
    graph.render();
    const node: INode = graph.addItem('node', {
      color: '#666',
      x: 50,
      y: 50,
      r: 20,
      style: { lineWidth: 2, fill: '#666' },
    }) as INode;
    graph.paint();
    node.lock();
    graph.emit('node:dragstart', { x: 100, y: 100, item: node });
    graph.emit('node:drag', { x: 120, y: 120, item: node });
    graph.emit('node:dragend', { x: 120, y: 120, item: node });
    const dragMatrix = node.get('group').getMatrix();
    expect(dragMatrix[6]).toEqual(50);
    expect(dragMatrix[7]).toEqual(50);
    graph.destroy();
  });
  it('drag a unselected node', () => {
    const graph: Graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      defaultNode: {
        size: 10,
      },
      nodeStateStyles: {
        selected: {
          stroke: '#f00',
          lineWidth: 2,
        },
      },
      modes: {
        default: [
          {
            type: 'drag-node',
            enableDelegate: true,
          },
        ],
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
          x: 50,
          y: 100,
        },
        {
          id: 'node3',
          x: 100,
          y: 50,
        },
      ],
    };
    graph.data(data);
    graph.render();
    graph.getNodes().forEach((node, i) => {
      if (i < 2) {
        graph.setItemState(node, 'selected', true);
      }
    });
    graph.paint();
    const node = graph.getNodes()[2];
    graph.emit('node:dragstart', { x: 100, y: 50, item: node });
    graph.emit('node:drag', { x: 120, y: 120, item: node });
    graph.emit('node:drag', { x: 150, y: 150, item: node });
    const dragMatrix = node.get('group').getMatrix();
    expect(dragMatrix[6]).toEqual(100);
    expect(dragMatrix[7]).toEqual(50);

    graph.emit('node:dragend', { x: 200, y: 200, item: node });
    const matrix = node.get('group').getMatrix();
    expect(matrix[0]).toEqual(1);
    expect(matrix[6]).toEqual(200);
    expect(matrix[7]).toEqual(200);
    graph.destroy();
  });
  it('drag selected nodes', () => {
    const graph: Graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      defaultNode: {
        size: 10,
      },
      nodeStateStyles: {
        selected: {
          stroke: '#f00',
          lineWidth: 2,
        },
      },
      modes: {
        default: [
          {
            type: 'drag-node',
            enableDelegate: true,
          },
        ],
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
          x: 50,
          y: 100,
        },
        {
          id: 'node3',
          x: 100,
          y: 50,
        },
      ],
    };
    graph.data(data);
    graph.render();
    graph.getNodes().forEach((node, i) => {
      if (i < 2) {
        graph.setItemState(node, 'selected', true);
      }
    });
    graph.paint();
    const node0 = graph.getNodes()[0];
    graph.emit('node:dragstart', { x: 50, y: 50, item: node0 });
    graph.emit('node:drag', { x: 120, y: 120, item: node0 });
    graph.emit('node:drag', { x: 150, y: 150, item: node0 });
    const dragMatrix = node0.get('group').getMatrix();
    expect(dragMatrix[6]).toEqual(50);
    expect(dragMatrix[7]).toEqual(50);

    graph.emit('node:dragend', { x: 200, y: 200, item: node0 });
    const matrix = node0.get('group').getMatrix();
    expect(matrix[0]).toEqual(1);
    expect(matrix[6]).toEqual(200);
    expect(matrix[7]).toEqual(200);
    graph.destroy();
  });
  it('drag one selected node', () => {
    const graph: Graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      defaultNode: {
        size: 10,
      },
      nodeStateStyles: {
        selected: {
          stroke: '#f00',
          lineWidth: 2,
        },
      },
      modes: {
        default: [
          {
            type: 'drag-node',
          },
        ],
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
          x: 50,
          y: 100,
        },
        {
          id: 'node3',
          x: 100,
          y: 50,
        },
      ],
    };
    graph.data(data);
    graph.render();
    const node0 = graph.getNodes()[0];
    graph.setItemState(graph.getNodes()[0], 'selected', true);
    graph.paint();
    graph.emit('node:dragstart', { x: 50, y: 50, item: node0 });
    graph.emit('node:drag', { x: 150, y: 150, item: node0 });
    const dragMatrix = node0.get('group').getMatrix();
    expect(dragMatrix[6]).toEqual(150);
    expect(dragMatrix[7]).toEqual(150);

    // if the enableDelegate is false, dragend will not change the node position
    graph.emit('node:dragend', { x: 200, y: 200, item: node0 });
    const matrix = node0.get('group').getMatrix();
    expect(matrix[0]).toEqual(1);
    expect(matrix[6]).toEqual(150);
    expect(matrix[7]).toEqual(150);
    graph.destroy();
  });
  it('delegate drag node with edge', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-node',
            enableDelegate: true,
            delegateStyle: {
              fillOpacity: 0.8,
            },
          },
        ],
      },
    });
    const source = graph.addItem('node', {
      id: 'source',
      color: '#666',
      x: 50,
      y: 50,
      size: 20,
      style: { lineWidth: 2, fill: '#666', opacity: 0.1 },
    });
    const target = graph.addItem('node', {
      id: 'target',
      color: '#666',
      x: 300,
      y: 300,
      size: 20,
      type: 'rect',
      style: { lineWidth: 2, fill: '#666', opacity: 0.1 },
    });
    const edge = graph.addItem('edge', { source, target });

    let path = edge.get('group').get('children')[0].attr('path');
    expect(path[0][1]).toEqual(57.77817459305202);
    expect(path[0][2]).toEqual(57.77817459305202);
    expect(path[1][1]).toEqual(289);
    expect(path[1][2]).toEqual(300);
    graph.emit('node:dragstart', { x: 100, y: 100, item: source });
    graph.emit('node:drag', { x: 120, y: 120, item: source });
    path = edge.get('group').get('children')[0].attr('path');
    expect(path[0][1]).toEqual(57.77817459305202);
    expect(path[0][2]).toEqual(57.77817459305202);
    expect(path[1][1]).toEqual(289);
    expect(path[1][2]).toEqual(300);
    graph.emit('node:dragend', { x: 140, y: 140, item: source });
    path = edge.get('group').get('children')[0].attr('path');
    expect(path[0][1]).toEqual(97.77817459305203);
    expect(path[0][2]).toEqual(97.77817459305203);
    expect(path[1][1]).toEqual(289);
    expect(path[1][2]).toEqual(300);
    graph.destroy();
  });
  it('drag node without size', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-node',
            enableDelegate: true,
          },
        ],
      },
    });
    let clicked = false;
    graph.on('node:click', () => {
      clicked = true;
    });
    const node = graph.addItem('node', {
      id: 'source',
      color: '#666',
      x: 50,
      y: 50,
      style: { lineWidth: 2, fill: '#666' },
    });
    graph.emit('node:dragstart', { x: 100, y: 100, item: node });
    graph.emit('node:drag', { x: 120, y: 120, item: node });
    graph.emit('node:dragend', { x: 120, y: 120, item: node });
    expect(clicked).toBe(false);
    graph.destroy();
  });

  it('drag node & edge & label', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-node',
            delegateStyle: {
              fillOpacity: 0.8,
            },
          },
        ],
      },
    });
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
    const edge = graph.addItem('edge', {
      source,
      target,
      label: 'test label',
      labelCfg: { autoRotate: true },
    });
    const label = edge.get('group').find((g) => {
      return g.get('className') === 'edge-label';
    });
    expect(label).not.toBe(undefined);
    let matrix = label.getMatrix();
    expect(matrix[0]).toEqual(0.6196324480014811);
    expect(matrix[1]).toEqual(0.7848921132128235);
    expect(matrix[3]).toEqual(-0.7848921132128235);
    expect(matrix[4]).toEqual(0.6196324480014811);
    graph.emit('node:dragstart', { x: 100, y: 100, item: target });
    graph.emit('node:drag', { x: 120, y: 120, item: target });
    graph.emit('node:dragend', { x: 80, y: 120, item: target });
    matrix = label.getMatrix();
    expect(matrix[0]).toEqual(0.627307162629268);
    expect(matrix[1]).toEqual(0.7787719330548688);
    expect(matrix[3]).toEqual(-0.7787719330548688);
    expect(matrix[4]).toEqual(0.627307162629268);
    graph.destroy();
  });

  it('prevent default, enabledStack', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      enabledStack: true,
      modes: {
        default: [
          {
            type: 'drag-node',
            enableDelegate: false,
            shouldUpdate: (e) => {
              expect(e).not.toBe(undefined);
              return false;
            },
          },
        ],
      },
    });
    const node = graph.addItem('node', {
      color: '#666',
      x: 50,
      y: 50,
      r: 20,
      style: { lineWidth: 2, fill: '#666' },
    });
    graph.paint();
    graph.emit('node:dragstart', { x: 100, y: 100, item: node });
    graph.emit('node:drag', { x: 120, y: 120, item: node });
    const matrix = node.get('group').getMatrix();
    expect(matrix[0]).toEqual(1);
    expect(matrix[6]).toEqual(50);
    expect(matrix[7]).toEqual(50);
    graph.emit('node:dragend', { x: 120, y: 120, item: node });
    const stack = graph.getUndoStack();
    expect(stack.linkedList.head).not.toBe(null);
    graph.destroy();
  });
  it('prevent begin', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-node',
            enableDelegate: false,
            shouldBegin: (e) => {
              expect(e).not.toBe(undefined);
              return false;
            },
          },
        ],
      },
    });
    const node = graph.addItem('node', {
      color: '#666',
      x: 50,
      y: 50,
      r: 20,
      style: { lineWidth: 2, fill: '#666' },
    });
    graph.paint();
    graph.emit('node:dragstart', { x: 100, y: 100, item: node });
    graph.emit('node:drag', { x: 120, y: 120, item: node });
    const matrix = node.get('group').getMatrix();
    expect(matrix[0]).toEqual(1);
    expect(matrix[6]).toEqual(50);
    expect(matrix[7]).toEqual(50);
    graph.destroy();
  });
  it('drag new added node without config position', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-node',
            delegateStyle: {
              fillOpacity: 0.8,
            },
          },
        ],
      },
      defaultNode: {
        type: 'rect',
        size: [114, 54],
        style: {
          radius: 4,
        },
      },
    });
    graph.render();
    const node = graph.addItem('node', {
      id: 'node1',
    });

    graph.emit('node:dragstart', { x: 0, y: 0, item: node });
    graph.emit('node:drag', { x: 120, y: 120, item: node });
    graph.emit('node:dragend', { x: 120, y: 120, item: node });
    const matrix = node.get('group').getMatrix();
    expect(matrix[0]).toEqual(1);
    expect(matrix[6]).toEqual(120);
    expect(matrix[7]).toEqual(120);
    graph.destroy();
  });
  it('drag node not update edge', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-node',
            delegate: false,
            updateEdge: false,
          },
        ],
      },
    });
    const src = graph.addItem('node', {
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
    const edge = graph.addItem('edge', {
      source: src,
      target,
      label: 'test label',
      labelCfg: { autoRotate: true },
    });
    const keyShape = edge.get('keyShape');
    const path = keyShape.attr('path');
    graph.emit('node:dragstart', { item: src, x: 55, y: 55 });
    graph.emit('node:drag', { item: src, x: 66, y: 66 });
    expect(keyShape.attr('path')).toEqual(path);
    graph.destroy();
  });

  // FIXME: 第一次拖拽节点出画布后，节点行为正确。再次回到画布上，仍然处于 G 的 drag 状态，从而无法触发 dragStart。再次拖动才可以
  it('out of range', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: ['drag-node'],
      },
    });
    const node = graph.addItem('node', {
      color: '#666',
      x: 50,
      y: 50,
      r: 20,
      style: { lineWidth: 2, fill: '#666' },
    });
    const node1 = graph.addItem('node', {
      color: '#666',
      x: 150,
      y: 50,
      r: 20,
      style: { lineWidth: 2, fill: '#666' },
    });
    graph.emit('node:dragstart', { x: 100, y: 100, item: node });
    expect(node.getContainer().getMatrix()[6]).toEqual(50);
    expect(node.getContainer().getMatrix()[7]).toEqual(50);
    graph.emit('canvas:mouseleave', { x: 600, y: 600, item: node });
    Simulate.simulate(document.body, 'mouseup', {
      clientY: 100,
      clientX: 100,
    });
    expect(node.getContainer().getMatrix()[6]).toEqual(50);
    expect(node.getContainer().getMatrix()[7]).toEqual(50);
    graph.updateItem(node, { x: 50, y: 50 });
    expect(node.getContainer().getMatrix()[6]).toEqual(50);
    expect(node.getContainer().getMatrix()[7]).toEqual(50);
    Simulate.simulate(document.body, 'mouseup', {
      clientY: 100,
      clientX: 100,
    });
    expect(node.getContainer().getMatrix()[6]).toEqual(50);
    expect(node.getContainer().getMatrix()[7]).toEqual(50);
    graph.destroy();
  });

  it('unbind', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: ['drag-node'],
      },
    });
    graph.removeBehaviors('drag-node', 'default');
    const node = graph.addItem('node', {
      color: '#666',
      x: 50,
      y: 50,
      r: 20,
      style: { lineWidth: 2, fill: '#666' },
    });
    graph.emit('node:dragstart', { x: 100, y: 100, item: node });
    graph.emit('node:drag', { x: 120, y: 120, item: node });
    const matrix = node.get('group').getMatrix();
    expect(matrix[0]).toEqual(1);
    expect(matrix[6]).toEqual(50);
    expect(matrix[7]).toEqual(50);
    graph.destroy();
  });

  it('drag anchorpoint', () => {
    const graph: Graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-node',
            enableDelegate: false,
          },
        ],
      },
    });
    const data = {
      nodes: [
        {
          id: 'node',
          x: 50,
          y: 50,
          linkPoints: {
            right: true,
          },
          style: {
            fill: '#f00',
          },
        },
        {
          id: 'node2',
          x: 50,
          y: 150,
          linkPoints: {
            right: true,
          },
        },
      ],
    };
    graph.data(data);
    graph.render();

    graph.on('node:click', (e) => {
      // console.log(e);
      // console.log(graph.getNodes()[0].get('group').get('children')[1]);
    });
    const node = graph.getNodes()[0];
    const anchorPoint = node.get('group').get('children')[1];

    graph.emit('node:dragstart', { x: 100, y: 100, target: anchorPoint });
    graph.emit('node:drag', { x: 120, y: 120, target: anchorPoint });
    graph.emit('node:dragend', { x: 120, y: 120, target: anchorPoint });
    const dragMatrix = node.get('group').getMatrix();
    expect(dragMatrix[6]).toEqual(50);
    expect(dragMatrix[7]).toEqual(50);
    graph.destroy();
  });

  it('drop on combo, drop on canvas', () => {
    const graph: Graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'drag-node',
            enableDelegate: false,
          },
        ],
      },
    });
    const data = {
      nodes: [
        {
          id: 'node',
          x: 50,
          y: 50,
          linkPoints: {
            right: true,
          },
          style: {
            fill: '#f00',
          },
        },
        {
          id: 'node2',
          x: 50,
          y: 150,
          linkPoints: {
            right: true,
          },
        },
      ],
      combos: [{ id: 'combo1' }],
    };
    graph.data(data);
    graph.render();

    const node = graph.getNodes()[0];
    const combo = graph.getCombos()[0];

    graph.emit('node:dragstart', { x: 100, y: 100, item: node });
    graph.emit('node:drag', { x: 120, y: 120, item: node });
    graph.emit('combo:drop', { x: 120, y: 120, item: combo });
    graph.emit('node:dragend', { x: 120, y: 120, item: node });
    expect(combo.getChildren().nodes.length).toBe(1);

    graph.emit('node:dragstart', { x: 100, y: 100, item: node });
    graph.emit('node:drag', { x: 120, y: 120, item: node });
    graph.emit('canvas:drop', { x: 120, y: 120 });
    graph.emit('node:dragend', { x: 120, y: 120, item: node });
    expect(combo.getChildren().nodes.length).toBe(0);
    graph.destroy();
  });

  xit('temperal!! test for dragover, dragleave', () => {
    const graph: Graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      // modes: {
      //   default: [{
      //     type: 'drag-node',
      //     enableDelegate: false
      //   }]
      // },
    });

    const canvas = graph.get('canvas');
    const group = canvas.addGroup(); // node-group
    const circle1Group = group.addGroup();
    const circle2Group = group.addGroup();
    const circle1 = circle1Group.addShape('circle', {
      attrs: {
        fill: '#f00',
        x: 100,
        y: 100,
        r: 30,
      },
      draggable: true,
      // name: 'circle1'
    });
    const circle2 = circle2Group.addShape('circle', {
      attrs: {
        fill: '#0f0',
        x: 100,
        y: 200,
        r: 30,
      },
      draggable: true,
      // name: 'circle2'
    });
    canvas.on('drag', (e) => {
      circle1.attr('x', e.x);
      circle1.attr('y', e.y);
    });
    // group.on('dragover', e => {
    //   console.log('circle2 dragover');
    // });
    // group.on('dragleave', e => {
    //   console.log('circle2 dragleave');
    // });
    // canvas.on('*', e => {
    //   if (e.type === 'mouseleave') {
    //     console.log('mouseleave');
    //   }
    //   if (e.type === 'dragleave') {
    //     console.log('dragleave');
    //   }
    // });
    graph.paint();
    canvas.draw();
  });
});
