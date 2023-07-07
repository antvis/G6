import G6, { Graph } from '../../src';

const div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);

describe('edge click state', () => {
  it('edge ', () => {
    
G6.registerNode(
  "custom-node",
  {
    draw(cfg, group) {
      const x = 0;
      const y = 0;

      // group.set("shapeMap", group.get("shapeMap") || {});
      const rect = group.addShape("rect", {
        name: "border-rect",
        attrs: {
          x,
          y,
          width: 200,
          height: 40,
          radius: 6,
          fill: "white",
          stroke: "blue"
        }
      });
      group.addShape("text", {
        name: "entity-name",
        attrs: {
          text: "akjshdakjshdkajshdk",
          x: x + 40,
          y: y + 13,
          fontSize: 14,
          textBaseline: "top",
          textAlign: "left",
          fill: "black"
        }
      });
      const img = group.addShape("image", {
        name: "entity-edit",
        attrs: {
          x: 0,
          y: 0,
          width: 10,
          height: 10,
          // text: "akjshdakjshdkajshdk",
          // fontSize: 14,
          // fill: "black",
          img: "https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png",
          cursor: "pointer",
          opacity: 0
        }
      });
      // group["shapeMap"]["entity-edit"] = img;
      return rect;
    },

    update: undefined
  },
  "modelRect"
);

    const graph = new G6.Graph({
      container: 'container',
      width: 500,
      height: 500,
      modes: {
        default: [
          "drag-canvas",
          "zoom-canvas",
          {
            type: "activate-relations",
            activeState: "highlight2",
            trigger: "click"
          }
        ]
      },
      defaultNode: {
        type: "custom-node"
      },
      nodeStateStyles: {
        selected: {
          "border-rect": {
            lineWidth: 2
          },
          "entity-edit": {
            opacity: 1
          }
        },
        hover: {
          "entity-edit": {
            opacity: 1
          }
        }
      }
    });

    graph.read({
      nodes: [
        {
          id: "root"
        },
        {
          id: "node-1"
        }
      ],
      edges: [
        {
          source: "root",
          target: "node-1"
        }
      ]
    });

const clearAllStats = () => {
  forEach(graph.getNodes(), (node) => {
    graph.clearItemStates(node);
  });
  forEach(graph.getEdges(), (edge) => {
    graph.clearItemStates(edge);
  });
};

graph.on("canvas:click", () => {
  graph.on("canvas:click", clearAllStats);
});

// graph.on("node:click", (e) => {
//   const { item } = e;
//   graph.setItemState(item, "selected", true);
// });

graph.on("node:mouseenter", (e) => {
  const { item } = e;
  console.log("mouseenter", item.getID(), item.getStates());
  if (item.hasState("selected")) {
    return;
  }
  graph.setItemState(item, "hover", true);
  console.log("mouseenter2", item.getID(), item.getStates());
});

graph.on("node:mouseleave", (e) => {
  const { item } = e;
  console.log("mouseleave", item.getID(), item.getStates());
  if (item.hasState("selected")) {
    return;
  }
  graph.setItemState(item, "hover", false);
  console.log("mouseleave2", item.getID(), item.getStates());
});
  });
});