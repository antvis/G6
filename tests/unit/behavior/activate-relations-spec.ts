import '../../../src/shape'
import Graph from '../../../src/graph/graph'

describe('activate-relations', () => {
  const div = document.createElement('div');
  div.id = 'activate-relations-spec';
  document.body.appendChild(div);
  const graph = new Graph({
    container: div,
    width: 500,
    height: 500,
    pixelRatio: 2,
    modes: { default: [] }
  });
  debugger
  const node1 = graph.addItem('node', { id: 'node1', x: 100, y: 100, label: 'node1' });
  const node2 = graph.addItem('node', { id: 'node2', x: 200, y: 200, label: 'node2' });
  graph.addItem('node', { id: 'node3', x: 80, y: 150, label: 'node3' });
  graph.addItem('edge', { source: 'node1', target: 'node2' });
  graph.addItem('edge', { source: 'node1', target: 'node3' });
  it('default activate', done => {
    // graph.on('afteractivaterelations', e => {
    //   const action = e.action;
    //   if (e.item === node1) {
    //     if (action === 'activate') {
    //       const nodes = graph.findAllByState('node', 'active');
    //       const edges = graph.findAllByState('edge', 'active');
    //       expect(nodes.length).toEqual(3);
    //       expect(edges.length).toEqual(2);
    //       expect(graph.findAllByState('node', 'inactive').length).toEqual(0);
    //       expect(graph.findAllByState('edge', 'inactive').length).toEqual(0);
    //       const keyShape = node2.getKeyShape();
    //       expect(keyShape.attr('fillOpacity')).toEqual(0.8);
    //     } else {
    //       const nodes = graph.findAllByState('node', 'active');
    //       const edges = graph.findAllByState('edge', 'active');
    //       expect(nodes.length).toEqual(0);
    //       expect(edges.length).toEqual(0);
    //       expect(graph.findAllByState('node', 'inactive').length).toEqual(0);
    //       expect(graph.findAllByState('edge', 'inactive').length).toEqual(0);
    //     }
    //   } else {
    //     if (action === 'activate') {
    //       const nodes = graph.findAllByState('node', 'active');
    //       const edges = graph.findAllByState('edge', 'active');
    //       expect(nodes.length).toEqual(2);
    //       expect(edges.length).toEqual(1);
    //       expect(graph.findAllByState('node', 'inactive').length).toEqual(1);
    //       expect(graph.findAllByState('edge', 'inactive').length).toEqual(1);
    //       const keyShape = node1.getKeyShape();
    //       expect(keyShape.attr('fillOpacity')).toEqual(0.8);
    //     } else {
    //       const nodes = graph.findAllByState('node', 'active');
    //       const edges = graph.findAllByState('edge', 'active');
    //       expect(nodes.length).toEqual(0);
    //       expect(edges.length).toEqual(0);
    //       expect(graph.findAllByState('node', 'inactive').length).toEqual(0);
    //       expect(graph.findAllByState('edge', 'inactive').length).toEqual(0);
          done();
    //     }
    //   }
    // });
    // graph.addBehaviors([ 'activate-relations' ], 'default');
    // graph.emit('node:mouseenter', { item: node1 });
    // graph.emit('node:mouseleave', { item: node1 });
    // graph.emit('node:mouseenter', { item: node2 });
    // graph.emit('node:mouseleave', { item: node2 });
    // graph.removeBehaviors([ 'activate-relations' ], 'default');
    // graph.removeEvent();
  });
  // it('click to activate', done => {
  //   graph.on('afteractivaterelations', e => {
  //     const action = e.action;
  //     if (e.item === node1) {
  //       if (action === 'activate') {
  //         const nodes = graph.findAllByState('node', 'active');
  //         const edges = graph.findAllByState('edge', 'active');
  //         expect(nodes.length).toEqual(3);
  //         expect(edges.length).toEqual(2);
  //         expect(graph.findAllByState('node', 'inactive').length).toEqual(0);
  //         expect(graph.findAllByState('edge', 'inactive').length).toEqual(0);
  //         const keyShape = node2.getKeyShape();
  //         expect(keyShape.attr('fillOpacity')).toEqual(0.8);
  //       } else {
  //         const nodes = graph.findAllByState('node', 'active');
  //         const edges = graph.findAllByState('edge', 'active');
  //         expect(nodes.length).toEqual(0);
  //         expect(edges.length).toEqual(0);
  //         expect(graph.findAllByState('node', 'inactive').length).toEqual(0);
  //         expect(graph.findAllByState('edge', 'inactive').length).toEqual(0);
  //       }
  //     } else {
  //       if (action === 'activate') {
  //         const nodes = graph.findAllByState('node', 'active');
  //         const edges = graph.findAllByState('edge', 'active');
  //         expect(nodes.length).toEqual(2);
  //         expect(edges.length).toEqual(1);
  //         expect(graph.findAllByState('node', 'inactive').length).toEqual(1);
  //         expect(graph.findAllByState('edge', 'inactive').length).toEqual(1);
  //         const keyShape = node1.getKeyShape();
  //         expect(keyShape.attr('fillOpacity')).toEqual(0.8);
  //       } else {
  //         const nodes = graph.findAllByState('node', 'active');
  //         const edges = graph.findAllByState('edge', 'active');
  //         expect(nodes.length).toEqual(0);
  //         expect(edges.length).toEqual(0);
  //         expect(graph.findAllByState('node', 'inactive').length).toEqual(0);
  //         expect(graph.findAllByState('edge', 'inactive').length).toEqual(0);
  //         done();
  //       }
  //     }
  //   });
  //   graph.addBehaviors([{
  //     type: 'activate-relations',
  //     trigger: 'click'
  //   }], 'default');
  //   graph.emit('node:click', { item: node1 });
  //   graph.emit('canvas:click', {});
  //   graph.emit('node:click', { item: node2 });
  //   graph.emit('canvas:click', {});
  //   graph.removeBehaviors([ 'activate-relations' ], 'default');
  //   graph.removeEvent();
  // });
  // it('custom state', done => {
  //   graph.on('afteractivaterelations', e => {
  //     const action = e.action;
  //     if (e.item === node1) {
  //       if (action === 'activate') {
  //         const nodes = graph.findAllByState('node', 'highlight');
  //         const edges = graph.findAllByState('edge', 'highlight');
  //         expect(nodes.length).toEqual(3);
  //         expect(edges.length).toEqual(2);
  //         expect(graph.findAllByState('node', 'inactive').length).toEqual(0);
  //         expect(graph.findAllByState('edge', 'inactive').length).toEqual(0);
  //       } else {
  //         const nodes = graph.findAllByState('node', 'highlight');
  //         const edges = graph.findAllByState('edge', 'highlight');
  //         expect(nodes.length).toEqual(0);
  //         expect(edges.length).toEqual(0);
  //       }
  //     } else {
  //       if (action === 'activate') {
  //         const nodes = graph.findAllByState('node', 'highlight');
  //         const edges = graph.findAllByState('edge', 'highlight');
  //         expect(nodes.length).toEqual(2);
  //         expect(edges.length).toEqual(1);
  //         expect(graph.findAllByState('node', 'inactive').length).toEqual(0);
  //         expect(graph.findAllByState('edge', 'inactive').length).toEqual(0);
  //       } else {
  //         const nodes = graph.findAllByState('node', 'highlight');
  //         const edges = graph.findAllByState('edge', 'highlight');
  //         expect(nodes.length).toEqual(0);
  //         expect(edges.length).toEqual(0);
  //         done();
  //       }
  //     }
  //   });
  //   graph.addBehaviors([{
  //     type: 'activate-relations',
  //     activeState: 'highlight',
  //     inactiveState: null
  //   }], 'default');
  //   graph.emit('node:mouseenter', { item: node1 });
  //   graph.emit('node:mouseleave', { item: node1 });
  //   graph.emit('node:mouseenter', { item: node2 });
  //   graph.emit('node:mouseleave', { item: node2 });
  //   graph.destroy();
  // });
});
