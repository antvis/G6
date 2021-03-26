import G6 from '../../src';

const div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);

const data = {
  nodes: [
    { id: 'node1', x: 350, y: 200, comboId: 'combo1' },
    { id: 'node2', x: 350, y: 250, comboId: 'combo1' },
    { id: 'node3', x: 100, y: 200, comboId: 'combo3' },
  ],
  edges: [
    { source: 'node1', target: 'node2' },
    { source: 'node1', target: 'node3' },
    { source: 'combo1', target: 'node3' },
  ],
  combos: [
    { id: 'combo1', label: 'Combo 1', parentId: 'combo2' },
    { id: 'combo2', label: 'Combo 2' },
    { id: 'combo3', label: 'Combo 3', collapsed: true },
  ],
};

describe('combo states', () => {
  it('combo state bug', () => {
    const graph = new G6.Graph({
      container: 'container',
      width: 500,
      height: 500,
      // Set groupByTypes to false to get rendering result with reasonable visual zIndex for combos
      groupByTypes: false,
      defaultCombo: {
        type: 'circle',
        style: {
          lineWidth: 1,
        },
        labelCfg: {
          refY: 15,
          position: 'bottom',
        },
      },
      nodeStateStyles: {
        hover: {
          fill: 'red',
        },
      },
      comboStateStyles: {
        hover: {
          stroke: 'green',
        },
        selected: {
          stroke: 'red',
        },
      },
      modes: {
        default: ['drag-canvas', 'drag-node', 'drag-combo', 'collapse-expand-combo'],
      },
    });

    graph.data(data);
    graph.render();

    graph.on('combo:mouseenter', (evt) => {
      graph.setItemState(evt.item, 'hover', true);
    });

    graph.on('combo:mouseleave', (evt) => {
      graph.setItemState(evt.item, 'hover', false);
    });

    // combo 设置不存在的 state
    graph.on('combo:click', (evt) => {
      graph.setItemState(evt.item, 'notFound', true);
    });

    graph.on('node:mouseenter', (evt) => {
      graph.setItemState(evt.item, 'hover', true);
    });

    graph.on('node:mouseleave', (evt) => {
      graph.setItemState(evt.item, 'hover', false);
    });
  });
});

describe.only('combo edges', () => {
  const data2 = {
    nodes: [
      { id: 'node1', x: 350, y: 200, comboId: 'combo1', },
      { id: 'node3', x: 100, y: 200 },
    ],
    edges: [
      { source: 'combo1', target: 'node3', style: {endArrow: true} },
    ],
    combos: [
      { id: 'combo1', label: 'Combo 1' },
    ],
  };
  it('rect combo edges', () => {
    const graph = new G6.Graph({
      container: 'container',
      width: 500,
      height: 500,
      // Set groupByTypes to false to get rendering result with reasonable visual zIndex for combos
      groupByTypes: false,
      defaultCombo: {
        type: 'rect',
        padding: 0,
        // size: 0
        style: {
          opacity: 0.5
        }
      },
      modes: {
        default: ['drag-canvas', 'drag-node', 'drag-combo', 'collapse-expand-combo'],
      },
    });

    graph.data(data2);
    graph.render();

    const combo = graph.getCombos()[0];
    expect(combo.getBBox().width).toBe(81);
    expect(combo.getBBox().height).toBe(62);

    graph.destroy();
  });

  it('circle combo edges', () => {
    data2.combos[0].type = 'circle';
    
    const graph = new G6.Graph({
      container: 'container',
      width: 500,
      height: 500,
      // Set groupByTypes to false to get rendering result with reasonable visual zIndex for combos
      groupByTypes: false,
      defaultCombo: {
        type: 'circle',
        padding: 0,
        // size: 0
        style: {
          opacity: 0.5
        }
      },
      modes: {
        default: ['drag-canvas', 'drag-node', 'drag-combo', 'collapse-expand-combo'],
      },
    });

    graph.data(data2);
    graph.render();

    const combo = graph.getCombos()[0];
    expect(Math.abs(combo.getBBox().width - 80) < 1).toBe(true);
    expect(Math.abs(combo.getBBox().height - 80) < 1).toBe(true);

    graph.destroy();
  });
  it('collapse and edge disappear', () => {
    const data = {
      nodes: [
        {
          id: "1",
          label: "1",
          comboId: "A",
          x: 650,
          y: 300
        },
        {
          id: "4",
          label: "4",
          comboId: "C",
          x: 950,
          y: 100
        },
      ],
      edges: [
        {
          source: "1",
          target: "4"
        },
      ],
      combos: [
        {
          id: "A",
          label: "combo A",
          parentId: "AA",
          style: {
            fill: "#C4E3B2",
            stroke: "#C4E3B2"
          }
        },
        {
          id: "C",
          label: "combo C",
          parentId: "BB",
          style: {
            stroke: "#eee",
            fill: "#eee"
          }
        },
        {
          id: "AA",
          label: "combo AA",
          parentId: "TOP",
          style: {
            stroke: "#eee",
            fill: "#f00"
          }
        },
        {
          id: "BB",
          label: "combo BB",
          parentId: "TOP",
          style: {
            stroke: "#eee",
            fill: "#00f"
          }
        },
        {
          id: "TOP",
          label: "combo TOP",
          style: {
            stroke: "#123",
            fill: "#fff"
          }
        }
      ]
    };

    const width = document.getElementById("container").scrollWidth;
    const height = document.getElementById("container").scrollHeight || 500;
    const graph = new G6.Graph({
      container: "container",
      width,
      height,
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
          size: 2
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

    graph.collapseExpandCombo('C');

    expect(graph.getEdges().length).toBe(1);
    graph.destroy();
  })
});
