import '../../../src';
import { Graph } from '../../../src';

const div = document.createElement('div');
div.id = 'activate-relations-spec';
document.body.appendChild(div);

describe('activate-relations', () => {
  const graph = new Graph({
    container: div,
    width: 500,
    height: 500,
    modes: { default: [] },
    defaultNode: {
      style: {
        stroke: '#f00',
      },
    },
    nodeStateStyles: {
      active: {
        fillOpacity: 0.8,
        lineWidth: 3,
      },
      selected: {
        lineWidth: 5,
      },
      inactive: {
        lineWidth: 1,
      },
    },
    edgeStateStyles: {
      active: {
        strokeOpacity: 0.8,
        lineWidth: 3,
      },
      inactive: {
        lineWidth: 1,
      },
    },
  });

  const node1 = graph.addItem('node', { id: 'node1', x: 100, y: 100, label: 'node1' });
  const node2 = graph.addItem('node', { id: 'node2', x: 200, y: 200, label: 'node2' });
  graph.addItem('node', { id: 'node3', x: 80, y: 250, label: 'node3' });
  graph.addItem('edge', { source: 'node1', target: 'node2' });
  graph.addItem('edge', { source: 'node1', target: 'node3' });
  it('default activate', (done) => {
    graph.on('afteractivaterelations', (e) => {
      const action = e.action;
      if (e.item === node1) {
        if (action === 'activate') {
          const nodes = graph.findAllByState('node', 'active');
          const edges = graph.findAllByState('edge', 'active');
          expect(nodes.length).toEqual(3);
          expect(edges.length).toEqual(2);
          expect(graph.findAllByState('node', 'inactive').length).toEqual(0);
          expect(graph.findAllByState('edge', 'inactive').length).toEqual(0);
          const keyShape = node2.getKeyShape();
          expect(keyShape.attr('fillOpacity')).toEqual(0.8);
        } else {
          const nodes = graph.findAllByState('node', 'active');
          const edges = graph.findAllByState('edge', 'active');
          expect(nodes.length).toEqual(0);
          expect(edges.length).toEqual(0);
          expect(graph.findAllByState('node', 'inactive').length).toEqual(0);
          expect(graph.findAllByState('edge', 'inactive').length).toEqual(0);
        }
      } else {
        if (action === 'activate') {
          const nodes = graph.findAllByState('node', 'active');
          const edges = graph.findAllByState('edge', 'active');
          expect(nodes.length).toEqual(2);
          expect(edges.length).toEqual(1);
          expect(graph.findAllByState('node', 'inactive').length).toEqual(1);
          expect(graph.findAllByState('edge', 'inactive').length).toEqual(1);
          const keyShape = node1.getKeyShape();
          expect(keyShape.attr('fillOpacity')).toEqual(0.8);
        } else {
          const nodes = graph.findAllByState('node', 'active');
          const edges = graph.findAllByState('edge', 'active');
          expect(nodes.length).toEqual(0);
          expect(edges.length).toEqual(0);
          expect(graph.findAllByState('node', 'inactive').length).toEqual(0);
          expect(graph.findAllByState('edge', 'inactive').length).toEqual(0);
        }
      }
      done();
    });
    graph.addBehaviors(['activate-relations'], 'default');
    graph.emit('node:mouseenter', { item: node1 });
    graph.emit('node:mouseleave', { item: node1 });
    graph.emit('node:mouseenter', { item: node2 });
    graph.emit('node:mouseleave', { item: node2 });
    graph.removeBehaviors(['activate-relations'], 'default');
    // graph.removeEvent();
    graph.off('afteractivaterelations');
  });
  it('click to activate', (done) => {
    graph.on('afteractivaterelations', (e) => {
      const action = e.action;
      if (e.item === node1) {
        if (action === 'activate') {
          const nodes = graph.findAllByState('node', 'active');
          const edges = graph.findAllByState('edge', 'active');
          expect(nodes.length).toEqual(3);
          expect(edges.length).toEqual(2);
          expect(graph.findAllByState('node', 'inactive').length).toEqual(0);
          expect(graph.findAllByState('edge', 'inactive').length).toEqual(0);
          const keyShape = node2.getKeyShape();
          expect(keyShape.attr('fillOpacity')).toEqual(0.8);
        } else {
          const nodes = graph.findAllByState('node', 'active');
          const edges = graph.findAllByState('edge', 'active');
          expect(nodes.length).toEqual(0);
          expect(edges.length).toEqual(0);
          expect(graph.findAllByState('node', 'inactive').length).toEqual(0);
          expect(graph.findAllByState('edge', 'inactive').length).toEqual(0);
        }
      } else {
        if (action === 'activate') {
          const nodes = graph.findAllByState('node', 'active');
          const edges = graph.findAllByState('edge', 'active');
          expect(nodes.length).toEqual(2);
          expect(edges.length).toEqual(1);
          expect(graph.findAllByState('node', 'inactive').length).toEqual(1);
          expect(graph.findAllByState('edge', 'inactive').length).toEqual(1);
          const keyShape = node1.getKeyShape();
          expect(keyShape.attr('fillOpacity')).toEqual(0.8);
        } else {
          const nodes = graph.findAllByState('node', 'active');
          const edges = graph.findAllByState('edge', 'active');
          expect(nodes.length).toEqual(0);
          expect(edges.length).toEqual(0);
          expect(graph.findAllByState('node', 'inactive').length).toEqual(0);
          expect(graph.findAllByState('edge', 'inactive').length).toEqual(0);
          done();
        }
      }
    });
    graph.addBehaviors(
      [
        {
          type: 'activate-relations',
          trigger: 'click',
        },
      ],
      'default',
    );

    graph.emit('node:click', { item: node1 });
    graph.emit('canvas:click', {});
    graph.emit('node:click', { item: node2 });
    graph.emit('canvas:click', {});
    graph.removeBehaviors(['activate-relations'], 'default');
    graph.off('afteractivaterelations');
  });
  it('custom state', (done) => {
    const graph2 = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: { default: [] },
      nodeStateStyles: {
        highlight: {},
        inactive: {},
        active: {},
      },
      edgeStateStyles: {
        highlight: {},
        inactive: {},
        active: {},
      },
    });
    const g2node1 = graph2.addItem('node', { id: 'node1', x: 100, y: 100, label: 'node1' });
    const g2node2 = graph2.addItem('node', { id: 'node2', x: 200, y: 200, label: 'node2' });
    graph2.addItem('node', { id: 'node3', x: 80, y: 150, label: 'node3' });
    graph2.addItem('edge', { source: 'node1', target: 'node2' });
    graph2.addItem('edge', { source: 'node1', target: 'node3' });
    graph2.on('afteractivaterelations', (e) => {
      const action = e.action;
      if (e.item === g2node1) {
        if (action === 'activate') {
          const nodes = graph2.findAllByState('node', 'highlight');
          const edges = graph2.findAllByState('edge', 'highlight');
          expect(nodes.length).toEqual(3);
          expect(edges.length).toEqual(2);
          expect(graph2.findAllByState('node', 'inactive').length).toEqual(0);
          expect(graph2.findAllByState('edge', 'inactive').length).toEqual(0);
        } else {
          const nodes = graph2.findAllByState('node', 'highlight');
          const edges = graph2.findAllByState('edge', 'highlight');
          expect(nodes.length).toEqual(0);
          expect(edges.length).toEqual(0);
        }
      } else {
        if (action === 'activate') {
          const nodes = graph2.findAllByState('node', 'highlight');
          const edges = graph2.findAllByState('edge', 'highlight');
          expect(nodes.length).toEqual(2);
          expect(edges.length).toEqual(1);
          expect(graph2.findAllByState('node', 'inactive').length).toEqual(0);
          expect(graph2.findAllByState('edge', 'inactive').length).toEqual(0);
        } else {
          const nodes = graph2.findAllByState('node', 'highlight');
          const edges = graph2.findAllByState('edge', 'highlight');
          expect(nodes.length).toEqual(0);
          expect(edges.length).toEqual(0);
          done();
        }
      }
    });
    graph2.addBehaviors(
      [
        {
          type: 'activate-relations',
          activeState: 'highlight',
          inactiveState: null,
        },
      ],
      'default',
    );
    graph2.emit('node:mouseenter', { item: g2node1 });
    graph2.emit('node:mouseleave', { item: g2node1 });
    graph2.emit('node:mouseenter', { item: g2node2 });
    graph2.emit('node:mouseleave', { item: g2node2 });
    graph2.destroy();
  });
  it('should not update', () => {
    graph.addBehaviors(
      [
        {
          type: 'activate-relations',
          trigger: 'click',
          shouldUpdate() {
            return false;
          },
        },
      ],
      'default',
    );
    graph.emit('node:click', { item: node1 });
    let nodes = graph.findAllByState('node', 'active');
    let edges = graph.findAllByState('edge', 'active');
    expect(nodes.length).toEqual(0);
    expect(edges.length).toEqual(0);
    graph.emit('canvas:click', {});
    graph.emit('node:click', { item: node2 });
    nodes = graph.findAllByState('node', 'active');
    edges = graph.findAllByState('edge', 'active');
    expect(nodes.length).toEqual(0);
    expect(edges.length).toEqual(0);
    graph.emit('canvas:click', {});
    graph.removeBehaviors(['activate-relations'], 'default');
    graph.off('node:click');
    graph.off('canvas:click');
  });
  it('combine selected state', () => {
    graph.addBehaviors(
      [
        {
          type: 'activate-relations',
          trigger: 'mouseenter',
          resetSelected: true,
        },
      ],
      'default',
    );
    graph.addBehaviors(
      [
        {
          type: 'click-select',
        },
      ],
      'default',
    );

    graph.emit('node:click', { item: node1 });
    let nodes = graph.findAllByState('node', 'selected');
    expect(nodes.length).toEqual(1);
    graph.emit('node:mouseenter', { item: node2 });
    nodes = graph.findAllByState('node', 'selected');
    expect(nodes.length).toEqual(0);
    nodes = graph.findAllByState('node', 'active');
    const edges = graph.findAllByState('edge', 'active');
    expect(nodes.length).toEqual(2);
    expect(edges.length).toEqual(1);
    graph.emit('node:click', { item: node1 });
    nodes = graph.findAllByState('node', 'selected');
    expect(nodes.length).toEqual(1);
    graph.emit('node:mouseleave', {});
    graph.removeBehaviors(['activate-relations'], 'default');
    graph.destroy();
  });
});

describe('active-relations with combos', () => {

  const data = {
    nodes: [
      {
        id: '0',
        label: '0',
      },
      {
        id: '1',
        label: '1',
      },
      {
        id: '2',
        label: '2',
      },
      {
        id: '3',
        label: '3',
      },
      {
        id: '4',
        label: '4',
        comboId: 'A',
      },
      {
        id: '5',
        label: '5',
        comboId: 'B',
      },
      {
        id: '6',
        label: '6',
        comboId: 'A',
      },
      {
        id: '7',
        label: '7',
        comboId: 'C',
      },
      {
        id: '8',
        label: '8',
        comboId: 'C',
      },
      {
        id: '9',
        label: '9',
        comboId: 'A',
      },
      {
        id: '10',
        label: '10',
        comboId: 'B',
      },
      {
        id: '11',
        label: '11',
        comboId: 'B',
      },
    ],
    edges: [
      {
        source: '0',
        target: '1',
        id: '0-1'
      },
      {
        source: '0',
        target: '2',
        id: '0-2'
      },
      {
        source: '1',
        target: '4',
        id: '1-4'
      },
      {
        source: '0',
        target: '3',
        id: '0-3'
      },
      {
        source: '3',
        target: '4',
        id: '3-4'
      },
      {
        source: '2',
        target: '5',
        id: '2-5'
      },
      {
        source: '1',
        target: '6',
        id: '1-6'
      },
      {
        source: '1',
        target: '7',
        id: '1-7'
      },
      {
        source: '3',
        target: '8',
        id: '3-8'
      },
      {
        source: '3',
        target: '9',
        id: '3-9'
      },
      {
        source: '5',
        target: '10',
        id: '5-10'
      },
      {
        source: '5',
        target: '11',
        id: '5-11'
      },
    ],
    combos: [
      {
        id: 'A',
        label: 'combo A',
      },
      {
        id: 'B',
        label: 'combo B',
        collapsed: true
      },
      {
        id: 'C',
        label: 'combo C',
        collapsed: true
      },
    ],
  };
  const graph = new Graph({
    container: div,
    width: 500,
    height: 500,
    fitView: true,
    modes: { default: ['activate-relations', 'collapse-expand-combo'] },
    defaultNode: {
      size: [30, 20],
      type: 'rect',
    },
    layout: {
      type: 'dagre',
      sortByCombo: false,
      controlPoints: true
    },
    defaultEdge: {
      type: 'line',
      size: 1,
      color: "#000000",
    },
    defaultCombo: {
      type: 'rect',
      style: {
        fillOpacity: 0.1,
      },
    },
  });

  graph.read(data);

  it('with combo', (done) => {
    setTimeout(() => {
      const node = graph.findById('2')
      graph.emit('node:mouseenter', { item: node });
      let nodes = graph.findAllByState('node', 'active');
      expect(nodes.length).toEqual(3);
      let combos = graph.findAllByState('combo', 'active');
      expect(combos.length).toEqual(1);
      let edges = graph.findAllByState('edge', 'active');
      expect(edges.length).toEqual(2);
      let vEdges = graph.findAllByState('vedge', 'active');
      expect(vEdges.length).toEqual(1);

      graph.emit('node:mouseleave', { item: node });
      nodes = graph.findAllByState('node', 'active');
      expect(nodes.length).toEqual(0);
      combos = graph.findAllByState('combo', 'active');
      expect(combos.length).toEqual(0);
      edges = graph.findAllByState('edge', 'active');
      expect(edges.length).toEqual(0);
      vEdges = graph.findAllByState('vedge', 'active');
      expect(vEdges.length).toEqual(0);
      done()
    }, 500)
  })
})
