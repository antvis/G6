import G6 from '../../src';

const div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);

describe('combo edge', () => {
  it('combo polyline', () => {

    const data = {
      nodes: [
        { id: "node1", x: 250, y: 200, comboId: "combo1" },
        { id: "node2", x: 300, y: 200, comboId: "combo1" },
        { id: "node3", x: 100, y: 200 }
      ],
      combos: [{ id: "combo1", label: "Combo 1" }],
      edges: [
        // { source: "node1", target: "node2", type: "line" },
        // { source: "node1", target: "node2", type: "polyline" },
        // { source: "node1", target: "node2", type: "quadartic" },
        { source: "node1", target: "node3" }
      ]
    };

    const graph = new G6.Graph({
      container: "container",
      width: 500,
      height: 500,
      // Set groupByTypes to false to get rendering result with reasonable visual zIndex for combos
      groupByTypes: false,
      // Configure the combos globally
      defaultEdge: {
        type: "polyline"
      },
      defaultCombo: {
        // The type of the combos. You can also assign type in the data of combos
        type: "rect"
        // ... Other global configurations for combos
      },
      modes: {
        default: [
          "drag-combo",
          "drag-node",
          "drag-canvas",
          { type: "collapse-expand-combo", trigger: "click" }
        ]
      }
    });
    graph.data(data);
    graph.render();
    graph.on('canvas:click', e => {
      console.log(graph.getCombos()[0], graph.getCombos()[0].getEdges())
    })
    
  })
});