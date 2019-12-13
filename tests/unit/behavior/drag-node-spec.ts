import '../../../src/behavior'
import Behavior from '../../../src/behavior/behavior'
import { IBehavior } from '../../../src/interface/behavior';

import Simulate from 'event-simulate';
import Graph from '../../../src/graph/graph'
import { G } from '@antv/g/lib'


const div = document.createElement('div');
div.id = 'drag-spec';
document.body.appendChild(div);

describe('drag-node', () => {
  it('drag node', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [{
          type: 'drag-node',
          delegate: false
        }]
      },
      pixelRatio: 2
    });
    const node = graph.addItem('node', { color: '#666', x: 50, y: 50, r: 20, style: { lineWidth: 2, fill: '#666' } });
    graph.paint();
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
  it('delegate drag node with edge', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      renderer: 'svg',
      modes: {
        default: [{
          type: 'drag-node',
          delegateStyle: {
            fillOpacity: 0.8
          }
        }]
      },
      pixelRatio: 2
    });
    const src = graph.addItem('node', { id: 'source', color: '#666', x: 50, y: 50, size: 20, style: { lineWidth: 2, fill: '#666' } });
    const target = graph.addItem('node', { id: 'target', color: '#666', x: 300, y: 300, size: 20, shape: 'rect', style: { lineWidth: 2, fill: '#666' } });
    const edge = graph.addItem('edge', { source: src, target });
    graph.paint();
    let path = edge.get('group').get('children')[0].attr('path');
    expect(path[0][1]).toEqual(57.77817459305202);
    expect(path[0][2]).toEqual(57.77817459305202);
    expect(path[1][1]).toEqual(289);
    expect(path[1][2]).toEqual(289);
    graph.emit('node:dragstart', { x: 100, y: 100, item: src });
    graph.emit('node:drag', { x: 120, y: 120, item: src });
    path = edge.get('group').get('children')[0].attr('path');
    expect(path[0][1]).toEqual(57.77817459305202);
    expect(path[0][2]).toEqual(57.77817459305202);
    expect(path[1][1]).toEqual(289);
    expect(path[1][2]).toEqual(289);
    const delegateShape = src.get('delegateShape');
    expect(delegateShape).not.toBe(undefined);
    graph.emit('node:dragend', { x: 140, y: 140, item: src });
    path = edge.get('group').get('children')[0].attr('path');
    expect(path[0][1]).toEqual(97.77817459305203);
    expect(path[0][2]).toEqual(97.77817459305203);
    expect(path[1][1]).toEqual(289);
    expect(path[1][2]).toEqual(289);
    expect(!!src.get('delegateShape')).toBe(false);
    graph.destroy();
  });
  it('drag node without size', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      renderer: 'svg',
      modes: {
        default: [{ type: 'drag-node' }]
      },
      pixelRatio: 2
    });
    let clicked = false;
    graph.on('node:click', () => {
      clicked = true;
    });
    const node = graph.addItem('node', { id: 'source', color: '#666', x: 50, y: 50, style: { lineWidth: 2, fill: '#666' } });
    graph.emit('node:dragstart', { x: 100, y: 100, item: node });
    graph.emit('node:drag', { x: 120, y: 120, item: node });
    const delegateShape: G.Group = node.get('delegateShape');
    const bbox = delegateShape.getBBox();
    expect(bbox.width).toEqual(63);
    expect(bbox.height).toEqual(63);
    graph.emit('node:dragend', { x: 120, y: 120, item: node });
    expect(clicked).toBe(false);
    expect(node.get('delegateShape')).toBe(null);
  });
  // TODO: wait for .findByClassName defined by G
  // it('drag node & edge & label', () => {
  //   const graph = new Graph({
  //     container: div,
  //     width: 500,
  //     height: 500,
  //     renderer: 'svg',
  //     modes: {
  //       default: [{
  //         type: 'drag-node',
  //         delegateStyle: {
  //           fillOpacity: 0.8
  //         }
  //       }]
  //     },
  //     pixelRatio: 2
  //   });
  //   const src = graph.addItem('node', { id: 'source', color: '#666', x: 50, y: 50, style: { lineWidth: 2, fill: '#666' } });
  //   const target = graph.addItem('node', { id: 'target', color: '#666', x: 300, y: 300, shape: 'rect', style: { lineWidth: 2, fill: '#666' } });
  //   const edge = graph.addItem('edge', { source: src, target, label: 'test label', labelCfg: { autoRotate: true } });
  //   const label = edge.get('group').findByClassName('edge-label');
  //   expect(label).not.toBe(undefined);
  //   let matrix = label.getMatrix();
  //   expect(matrix[0]).toEqual(0.7071067811865476);
  //   expect(matrix[1]).toEqual(0.7071067811865475);
  //   expect(matrix[3]).toEqual(-0.7071067811865475);
  //   expect(matrix[4]).toEqual(0.7071067811865476);
  //   graph.emit('node:dragstart', { x: 100, y: 100, item: target });
  //   graph.emit('node:drag', { x: 120, y: 120, item: target });
  //   graph.emit('node:dragend', { x: 80, y: 120, item: target });
  //   matrix = label.getMatrix();
  //   expect(matrix[0]).toEqual(0.6484664555997507);
  //   expect(matrix[1]).toEqual(0.7612432304867457);
  //   expect(matrix[3]).toEqual(-0.7612432304867457);
  //   expect(matrix[4]).toEqual(0.6484664555997507);
  // });
  it('prevent default', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [{
          type: 'drag-node',
          delegate: false,
          shouldUpdate: e => { expect(e).not.toBe(undefined); return false; }
        }]
      },
      pixelRatio: 2
    });
    const node = graph.addItem('node', { color: '#666', x: 50, y: 50, r: 20, style: { lineWidth: 2, fill: '#666' } });
    graph.paint();
    graph.emit('node:dragstart', { x: 100, y: 100, item: node });
    graph.emit('node:drag', { x: 120, y: 120, item: node });
    const matrix = node.get('group').getMatrix();
    expect(matrix[0]).toEqual(1);
    expect(matrix[6]).toEqual(50);
    expect(matrix[7]).toEqual(50);
  });
  it('drag node not update edge', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [{
          type: 'drag-node',
          delegate: false,
          updateEdge: false
        }]
      },
      pixelRatio: 2
    });
    const src = graph.addItem('node', { id: 'source', color: '#666', x: 50, y: 50, style: { lineWidth: 2, fill: '#666' } });
    const target = graph.addItem('node', { id: 'target', color: '#666', x: 300, y: 300, shape: 'rect', style: { lineWidth: 2, fill: '#666' } });
    const edge = graph.addItem('edge', { source: src, target, label: 'test label', labelCfg: { autoRotate: true } });
    const keyShape: G.Shape = edge.get('keyShape');
    const path = keyShape.attr('path');
    graph.emit('node:dragstart', { item: src, x: 55, y: 55 });
    graph.emit('node:drag', { item: src, x: 66, y: 66 });
    expect(keyShape.attr('path')).toEqual(path);
  });
  it('out of range', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [ 'drag-node' ]
      },
      pixelRatio: 2
    });
    const node = graph.addItem('node', { color: '#666', x: 50, y: 50, r: 20, style: { lineWidth: 2, fill: '#666' } });
    graph.emit('node:dragstart', { x: 100, y: 100, item: node });
    expect(node.getContainer().getMatrix()[6]).toEqual(50);
    expect(node.getContainer().getMatrix()[7]).toEqual(50);
    graph.emit('canvas:mouseleave', { x: 600, y: 600, item: node });
    Simulate.simulate(document.body, 'mouseup', {
      clientY: 100,
      clientX: 100
    });
    expect(node.getContainer().getMatrix()[6]).toEqual(550);
    expect(node.getContainer().getMatrix()[7]).toEqual(550);
    // TODO
    // graph.updateItem(node, { x: 50, y: 50 });
    // expect(node.getContainer().getMatrix()[6]).toEqual(50);
    // expect(node.getContainer().getMatrix()[7]).toEqual(50);
    // Simulate.simulate(document.body, 'mouseup', {
    //   clientY: 100,
    //   clientX: 100
    // });
    // expect(node.getContainer().getMatrix()[6]).toEqual(50);
    // expect(node.getContainer().getMatrix()[7]).toEqual(50);
  });
  // TODO
  // it('unbind', () => {
  //   const graph = new Graph({
  //     container: div,
  //     width: 500,
  //     height: 500,
  //     modes: {
  //       default: [ 'drag-node' ]
  //     },
  //     pixelRatio: 2
  //   });
  //   graph.removeBehaviors('drag-node', 'default');
  //   const node = graph.addItem('node', { color: '#666', x: 50, y: 50, r: 20, style: { lineWidth: 2, fill: '#666' } });
  //   graph.emit('node:dragstart', { x: 100, y: 100, item: node });
  //   graph.emit('node:drag', { x: 120, y: 120, item: node });
  //   const matrix = node.get('group').getMatrix();
  //   expect(matrix[0]).toEqual(1);
  //   expect(matrix[6]).toEqual(50);
  //   expect(matrix[7]).toEqual(50);
  // });
});
