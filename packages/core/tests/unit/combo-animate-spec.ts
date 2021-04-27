import Graph from './implement-graph';

const div = document.createElement('div');
div.id = 'combo-shape';
document.body.appendChild(div);
const data = {
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
      collapsed: true
    },
    {
      id: "PARENT-5-1",
      label: "PARENT-5-1",
      parentId: "ROOT-1",
      count: 2,
      child: "CHILD",
      level: 0,
      // collapsed: true,
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
      // collapsed: true,
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
      // collapsed: true,
      childId: "7344",
    },
    {
      id: "CHILD-128-4-1",
      label: " CHILD-128-4-1",
      count: 1,
      child: "NODE",
      parentId: "PARENT-4-1",
      collapsed: false,
      childId: "7696"
    },
    {
      id: "empty",
      label: " empty",
      x: 100,
      y: 100
    },
  ]
};

describe('collapse combo initially', () => {
  it('initial animate', (done) => {
    const data2 = {
      nodes: [
        {
          id: 'node1',
          x: 250,
          y: 150,
          comboId: 'combo',
        },
        {
          id: 'node2',
          x: 350,
          y: 150,
          comboId: 'combo',
        },
      ],
      combos: [
        {
          id: 'combo',
          label: 'Combo1',
          collapsed: true,
        },
      ],
    };
    const graph = new Graph({
      container: div,
      width: 500,
      height: 600,
      fitCenter: true,
      groupByTypes: false,
      modes: {
        default: ['drag-canvas', 'drag-node', 'drag-combo', 'collapse-expand-combo'],
      },
      defaultCombo: {
        type: 'circle',
        labelCfg: {
          position: 'top',
        },
      },
    });
    graph.read(data2);

    expect(graph.get('vedges').length).toBe(0)
    setTimeout(() => {
      expect(graph.get('edges').filter(e => e.isVisible()).length).toBe(0);
      done()
    }, 16);
  });
  it('collapse combo and edges', (done) => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 600,
      groupByTypes: false,
      modes: ['collapse-expand-combo'],
      fitView: true,
      defaultCombo: {
        type: 'rect'
      },
    });
    graph.read(data);

    expect(graph.get('vedges').length).toBe(0)
    expect(graph.findById('empty').getModel().x).toBe(100);
    expect(graph.findById('empty').getModel().y).toBe(100);
    setTimeout(() => {
      graph.collapseExpandCombo('ROOT-1');
      graph.collapseExpandCombo('CHILD-101-4-1');
      expect(graph.get('edges').length).toBe(5)
      expect(graph.get('edges').filter(e => e.isVisible()).length).toBe(2)
      expect(graph.get('vedges').length).toBe(3)
      setTimeout(() => {
        graph.collapseExpandCombo('CHILD-92-5-1');
        expect(graph.get('edges').filter(e => e.isVisible()).length).toBe(1)
        expect(graph.get('vedges').length).toBe(4)
        // graph.destroy()
        done();
      }, 201)
    }, 201)
  });
});
