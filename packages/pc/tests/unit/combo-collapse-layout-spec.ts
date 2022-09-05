import G6 from '../../src';

const div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);

const data = {
  "combos": [
    {
      "id": "ccc",
      "label": "ccc",
      "collapsed": true,
      parentId: 'd'
    },
    {
      "id": "d",
      "label": "d",
    }
  ],
  "edges": [
    {
      "source": "a",
      "target": "b"
    }
  ],
  "nodes": [
    {
      "id": "b"
    },
    {
      "comboId": "ccc",
      "id": "a"
    }
  ]
};
describe('combo layout with collapsed', () => {
  xit('combo layout with collapsed', (done) => {
    const graph = new G6.Graph({
      container: 'container',
      width: 500,
      height: 500,
      // Set groupByTypes to false to get rendering result with reasonable visual zIndex for combos
      groupByTypes: false,
      layout: {
        type: 'grid'
      },
      modes: {
        default: ['collapse-expand-combo']
      }
    });

    graph.data(data);
    graph.render();
    console.log('data', data)
    setTimeout(() => {
      expect(data.combos[0].x).toBe(250)
      expect(data.combos[0].y).toBe(375)
      done()
    }, 0);
  });
  it('combo collapsed changeData', () => {
    const data1 = {
      edges: [{ source: "i_c82zysup580hx1", target: "i_be044npnqk6ru8" }],
      nodes: [
        { label: "11", id: "i_be044npnqk6ru8" },
        { label: "22", id: "i_c82zysup580hx1" }
      ]
    };

    const data2 = [
      { label: "33", id: "i_611cdvxj0tei9y", x: 0, y: 0 },
      { label: "44", id: "i_m2mv52k3qg6lko", x: 0, y: 0 }
    ];
    const edges = [
      { source: "i_be044npnqk6ru8", target: "i_m2mv52k3qg6lko" },
      { source: "i_be044npnqk6ru8", target: "i_611cdvxj0tei9y" }
    ];
    const graph = new G6.Graph({
      container: "container",
      width: 500,
      height: 500,

      layout: {
        type: "force",
        // animate: true
      },
      defaultEdge: {
        style: {
          lineWidth: 2,
          lineAppendWidth: 10,
          endArrow: true
        }
      },
      defaultNode: {
        size: 20,
        style: {
          stroke: "#FA8A02FF",
          shadowBlur: 5,
          shadowColor: "#FA8A02FF",
          fill: "#FFF3E4FF",
          lineWidth: 0
        }
      },
      nodeStateStyles: {
        active: {
          lineWidth: 3,
          stroke: "#FA8A02FF",
          shadowColor: "#FA8A02FF",
          fill: "#FFF3E4FF"
        },
        inactive: {
          lineWidth: 1,
          stroke: "rgba(250,138,2,0.5)",
          fill: "rgba(255,243,228,0.5)"
        }
      },
      edgeStateStyles: {
        active: {
          lineWidth: 3,
          stroke: "#FA8A02FF",
          shadowColor: "#FA8A02FF"
        },
        inactive: {
          lineWidth: 3
        }
      },
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas']
      }
    });
    graph.data(data1);
    graph.render();
    graph.on("node:dragstart", function (e) {
      const model = e.item.get("model");
      model.fx = e.x;
      model.fy = e.y;
    });
    graph.on("node:dblclick", function (e) {
      data2.forEach((node) => {
        if (!graph.findById(node.id)) {
          graph.addItem("node", node, false);
        }
      });
      edges.forEach((edge) => {
        graph.addItem("edge", edge, false);
      });
      graph.layout();
      const forceLayout = graph.get("layoutController").layoutMethods[0];
      // forceLayout.forceSimulation.stop()
      // setTimeout(() => {
      //   graph.layout();
      // }, 100);
      // graph.render()
      // graph.changeData({
      //   nodes: data1.nodes.concat(data2),
      //   edges: data1.edges.concat(edges)
      // })
    });
    graph.on("node:drag", function (e) {
      const forceLayout = graph.get("layoutController").layoutMethods[0];
      forceLayout.execute();
      const model = e.item.get("model");
      model.fx = e.x;
      model.fy = e.y;
    });
    graph.on("node:dragend", function (e) {
      e.item.get("model").fx = null;
      e.item.get("model").fy = null;
    });
    graph.on('canvas:click', e => {
      console.log('layout')
      graph.layout();
      // const forceLayout = graph.get("layoutController").layoutMethods[0];
      // forceLayout.execute();
    })
  });
});
