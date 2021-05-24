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

    graph.emit('node:touchstart', { item: node1 });
    graph.emit('canvas:touchstart', {});
    graph.emit('node:touchstart', { item: node2 });
    graph.emit('canvas:touchstart', {});

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
  it('with collapsed combo', () => {
    const data2 = {
      nodes: [
        {
          id: "5930",
          nodeId: "1778",
          label: "5930",
          comboId: "CHILD-93-5-1",
          x: 1100,
          y: 0
        },
        {
          id: "3830",
          nodeId: "3398",
          label: "3830",
          comboId: "CHILD-83-3-1",
          x: 800,
          y: 0
        },
        {
          id: "5920",
          nodeId: "3793",
          label: "5920",
          comboId: "CHILD-92-5-1",
          x: 1100,
          y: 200
        },
        {
          id: "2400",
          nodeId: "3858",
          label: "2400",
          comboId: "CHILD-40-2-1",
          x: 650,
          y: 0
        },
        {
          id: "41010",
          nodeId: "7344",
          label: "41010",
          comboId: "CHILD-101-4-1",
          x: 950,
          y: 0
        },
        {
          id: "41280",
          nodeId: "7696",
          label: "41280",
          comboId: "CHILD-128-4-1",
          x: 950,
          y: 200
        }
      ],
      edges: [
        { source: "5920", target: "41280" },
        { source: "5930", target: "41010" },
        { source: "41010", target: "5920" },
        { source: "41010", target: "3830" },
        { source: "3830", target: "2400" }
      ],
      combos: [
        {
          id: "ROOT-1",
          label: " ROOT-1",
          group: "ROOT",
          count: 4,
          child: " PARENT",
          collapsed: false
        },
        {
          id: "PARENT-5-1",
          label: "PARENT-5-1",
          parentId: "ROOT-1",
          count: 2,
          child: "CHILD",
          level: 0,
          collapsed: false,
          style: { fill: "#AD9D9A", stroke: "#AD9D9A" }
        },
        {
          id: "CHILD-93-5-1",
          label: " CHILD-93-5-1",
          count: 1,
          child: "NODE",
          parentId: "PARENT-5-1",
          collapsed: false,
          childId: "1778"
        },
        {
          id: "PARENT-3-1",
          label: "PARENT-3-1",
          parentId: "ROOT-1",
          count: 1,
          child: "CHILD",
          level: 0,
          collapsed: false,
          style: { fill: "#DE6295", stroke: "#DDDDDD" }
        },
        {
          id: "CHILD-83-3-1",
          label: " CHILD-83-3-1",
          count: 1,
          child: "NODE",
          parentId: "PARENT-3-1",
          collapsed: false,
          childId: "3398"
        },
        {
          id: "CHILD-92-5-1",
          label: " CHILD-92-5-1",
          count: 1,
          child: "NODE",
          parentId: "PARENT-5-1",
          collapsed: false,
          childId: "3793"
        },
        {
          id: "PARENT-2-1",
          label: "PARENT-2-1",
          parentId: "ROOT-1",
          count: 1,
          child: "CHILD",
          level: 0,
          collapsed: false,
          style: { fill: "#9E7FCB", stroke: "#CDCDCD" }
        },
        {
          id: "CHILD-40-2-1",
          label: " CHILD-40-2-1",
          count: 1,
          child: "NODE",
          parentId: "PARENT-2-1",
          collapsed: false,
          childId: "3858"
        },
        {
          id: "PARENT-4-1",
          label: "PARENT-4-1",
          parentId: "ROOT-1",
          count: 2,
          child: "CHILD",
          level: 0,
          collapsed: false,
          style: { fill: "#8FB9C2", stroke: "#8FB9C2" }
        },
        {
          id: "CHILD-101-4-1",
          label: " CHILD-101-4-1",
          count: 1,
          child: "NODE",
          parentId: "PARENT-4-1",
          collapsed: false,
          childId: "7344"
        },
        {
          id: "CHILD-128-4-1",
          label: " CHILD-128-4-1",
          count: 1,
          child: "NODE",
          parentId: "PARENT-4-1",
          collapsed: false,
          childId: "7696"
        }
      ]
    };
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      fitView: true,
      defaultNode: {
        size: 30,
        type: "rect",
        color: "#5B8FF9",
        style: {
          lineWidth: 2,
          fill: "#C6E5FF"
        }
      },
      defaultCombo: {
        type: "rect",
        style: {
          fillOpacity: 0.5
        }
      },
      defaultEdge: {
        type: "polyline",
        style: {
          size: 2,
          endArrow: {
            path: "M 0,0 L 8,4 L 8,-4 Z", // G6.Arrow.triangle(4,4, 0), //
            fill: "#000000"
          }
        },
      },
      modes: {
        default: [
          "drag-combo",
          "drag-node",
          "drag-canvas",
          "zoom-canvas",
          {
            type: "activate-relations",
            trigger: "click"
          },
          {
            type: "collapse-expand-combo",
            relayout: false
          }
        ]
      },
      groupByTypes: false
    });
  
    graph.read(data2);
    graph.on('canvas:click', e => {
      console.log(graph.getEdges())
      console.log(graph.get('vedges'))
    })
  })
})
