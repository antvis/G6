import G6 from "@antv/g6";
import { ext } from "@antv/matrix-util";
// import {getLabelPosition} from '@antv/g6/util'

const { getLabelPosition } = G6.Util;
console.log("getLabelPosition", getLabelPosition);
const transform = ext.transform;

G6.registerEdge(
  "arrow-running",
  {
    afterDraw(cfg, group) {
      // get the first shape in the group, it is the edge's path here=
      const shape = group.get("children")[0];

      const arrow = group.addShape("marker", {
        attrs: {
          x: 16,
          y: 0,
          r: 8,
          lineWidth: 2,
          stroke: "#3370ff",
          fill: "#fff",
          symbol: (x, y, r) => {
            return [
              ["M", x - 6, y - 4],
              ["L", x - 2, y],
              ["L", x - 6, y + 4]
            ];
          }
        }
      });

      // animation for the red circle
      arrow.animate(
        (ratio) => {
          // the operations in each frame. Ratio ranges from 0 to 1 indicating the prograss of the animation. Returns the modified configurations
          // get the position on the edge according to the ratio
          const tmpPoint = shape.getPoint(ratio);
          const pos = getLabelPosition(shape, ratio);
          let matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
          matrix = transform(matrix, [
            ["t", -tmpPoint.x, -tmpPoint.y],
            ["r", pos.angle],
            ["t", tmpPoint.x, tmpPoint.y]
          ]);

          // returns the modified configurations here, x and y here
          return {
            x: tmpPoint.x,
            y: tmpPoint.y,
            matrix
          };
        },
        {
          // repeat: true, // Whether executes the animation repeatly
          duration: 3000 // the duration for executing once
        }
      );
    }
  },
  "cubic" // extend the built-in edge 'cubic'
);

const data = {
  nodes: [
    {
      id: "node1",
      x: 100,
      y: 100,
      label: "Node 1",
      labelCfg: {
        position: "top"
      }
    },
    {
      id: "node2",
      x: 300,
      y: 200,
      color: "#40a9ff",
      label: "Node 2",
      labelCfg: {
        position: "left",
        offset: 10
      }
    }
  ],
  edges: [
    {
      source: "node1",
      target: "node2"
    }
  ]
};

const container = document.getElementById("container");
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new G6.Graph({
  container: "container",
  width,
  height,
  defaultEdge: {
    type: "arrow-running",
    style: {
      lineWidth: 2,
      stroke: "#bae7ff"
    }
  }
});
graph.data(data);
graph.render();

if (typeof window !== "undefined")
  window.onresize = () => {
    if (!graph || graph.get("destroyed")) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };
