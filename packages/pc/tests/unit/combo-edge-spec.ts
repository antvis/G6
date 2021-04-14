import G6 from '../../src';

const div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);


describe('combo edge', () => {
  it('combo edge bug', () => {
    const data = {
      nodes: [
        {
          id: "5930",
          nodeId: "1778",
          label: "5930",
          comboId: "CHILD-93-5-1",
          x: 1550,
          y: 0
        },
        {
          id: "3830",
          nodeId: "3398",
          label: "3830",
          comboId: "CHILD-83-3-1",
          x: 950,
          y: 0
        },
        {
          id: "5920",
          nodeId: "3793",
          label: "5920",
          comboId: "CHILD-92-5-1",
          x: 1550,
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
          x: 1350,
          y: 0
        },
        {
          id: "41280",
          nodeId: "7696",
          label: "41280",
          comboId: "CHILD-128-4-1",
          x: 1350,
          y: 200
        }
      ],
      edges: [
        // { source: "5920", target: "41280" },
        { source: "5930", target: "41010" },
        { source: "41010", target: "5920" },
        { source: "41010", target: "3830" },
        { source: "3830", target: "2400" },
    
        { source: "5930", target: "41280" },
        { source: "41280", target: "5920" },
        { source: "41280", target: "3830" }
      ],
      combos: [
        // it is correct when there is no root-1
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
          collapsed: false
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
          collapsed: false
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
          collapsed: false
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
          collapsed: false
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
          id: "CHILD-101-4-1",
          label: " CHILD-101-4-1",
          count: 1,
          child: "NODE",
          parentId: "PARENT-4-1",
          collapsed: false,
          childId: "7344"
        }
      ]
    };

    const graph = new G6.Graph({
      container: "container",
      width: 800,
      height: 500,
      fitView: true,
      fitViewPadding: 50,
      defaultNode: {
        size: 30,
        type: "rect",
        color: "#5B8FF9",
        style: {
          lineWidth: 2,
          fill: "#C6E5FF"
        }
      },
      layout: {
        type: "",
        sortByCombo: false,
        ranksep: 10,
        nodesep: 10
      },
      defaultCombo: {
        type: "rect",
        style: {
          fillOpacity: 0.1
        }
      },
      defaultEdge: {
        type: "line",
        style: {
          stroke: "#ff",
          size: 2,
          endArrow: true
        },
        size: 2,
        color: "#e2e2e2"
      },
      modes: {
        default: [
          "drag-combo",
          "drag-node",
          "drag-canvas",
          "zoom-canvas",
          "activate-relations",
          {
            type: "collapse-expand-combo",
            relayout: false
          }
        ]
      },
      groupByTypes: false
    });

    graph.data(data);
    graph.render();
    
    graph.collapseCombo('PARENT-4-1')
    expect(graph.getEdges().filter(edge => edge.isVisible()).length).toBe(1);
    expect(graph.get('vedges').length).toBe(3);
    graph.destroy();
  });

  it('combo edge 2', () => {
    const data = {
      nodes: [
        { id: "1820", nodeId: "1654", label: " 1820", comboId: "CHILD-82-1-1" },
        { id: "5891", nodeId: "2033", label: "5891", comboId: "CHILD-89-5-1" },
        { id: "4941", nodeId: "2382", label: "4941", comboId: "CHILD-94-4-1" },
        { id: "5420", nodeId: "12663", label: " 5420", comboId: "CHILD-42-5-1" }
      ],
      edges: [
        { source: "4941", target: "5420" },
        { source: "5891", target: "1820" }
      ],
      combos: [
        { id: "ROOT-1", label: "ROOT1", count: 6, collapsed: false },
        {
          id: "PARENT-4-1",
          label: "PARENT0",
          parentId: "ROOT-1",
          count: 15,
          collapsed: false
        },
        {
          id: "PARENT-5-1",
          label: "PARENT-5-1",
          parentId: "ROOT-1",
          count: 13,
          collapsed: false
        },
        {
          id: "CHILD-89-5-1",
          label: "CHILD-89-5-1",
          count: 2,
          parentId: "PARENT-5-1",
          collapsed: false,
          childId: "1653"
        },
        {
          id: "PARENT-1-1",
          label: "PARENT-1-1",
          parentId: "ROOT-1",
          count: 1,
          collapsed: false
        },
        {
          id: "CHILD-82-1-1",
          label: "CHILD-82-1-1",
          count: 1,
          parentId: "PARENT-1-1",
          collapsed: false,
          childId: "1654"
        },
        {
          id: "CHILD-94-4-1",
          label: "CHILD-94-4-1",
          count: 2,
          parentId: "PARENT-4-1",
          collapsed: false,
          childId: "1779"
        },
        {
          id: "CHILD-42-5-1",
          label: "CHILD-42-5-1",
          count: 1,
          parentId: "PARENT-5-1",
          collapsed: false,
          childId: "12663"
        }
      ]
    };

    const graph = new G6.Graph({
      container: "container",
      width: 800,
      height: 500,
      fitView: true,
      fitViewPadding: 50,
      defaultNode: {
        size: 30,
        type: "rect",
        color: "#5B8FF9",
        style: {
          lineWidth: 2,
          fill: "#C6E5FF"
        }
      },
      layout: {
        type: "",
        sortByCombo: false,
        ranksep: 10,
        nodesep: 10
      },
      defaultCombo: {
        type: "rect",
        style: {
          fillOpacity: 0.1
        }
      },
      defaultEdge: {
        type: "line",
        style: {
          stroke: "#ff",
          size: 2,
          endArrow: true
        },
        size: 2,
        color: "#e2e2e2"
      },
      modes: {
        default: [
          "drag-combo",
          "drag-node",
          "drag-canvas",
          "zoom-canvas",
          "activate-relations",
          {
            type: "collapse-expand-combo",
            relayout: false
          }
        ]
      },
      groupByTypes: false
    });

    graph.data(data);
    graph.render();

    graph.collapseCombo('PARENT-5-1');
    expect(graph.getEdges().filter(edge => edge.isVisible()).length).toBe(0);
    expect(graph.get('vedges').length).toBe(2);
    graph.destroy();
  });
});