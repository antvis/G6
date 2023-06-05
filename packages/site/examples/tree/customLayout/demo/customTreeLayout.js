import G6 from '@antv/g6';
import HierarchyLayout from '@antv/hierarchy';

const Hierarchy = HierarchyLayout || window.Hierarchy;


fetch(
  "https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json"
)
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("container");
    const width = container.scrollWidth;
    const height = container.scrollHeight || 500;
    const graph = new G6.TreeGraph({
      container: "container",
      width,
      height,
      modes: {
        default: [
          {
            type: "collapse-expand",
            onChange: function onChange(item, collapsed) {
              const data = item.getModel();
              data.collapsed = collapsed;
              return true;
            }
          },
          "drag-canvas",
          "zoom-canvas"
        ]
      },
      defaultNode: {
        type: "rect",
        size: [50, 20],
        anchorPoints: [
          [0, 0.5],
          [1, 0.5]
        ]
      },
      defaultEdge: {
        type: "polyline"
      },
      layout: (data) => {
        let subtree;
        G6.Util.traverseTree(data, (sub) => {
          if (sub.id === "Consensus") subtree = sub;
        });
        const indentedConfig = {
          direction: "LR",
          indent: 80,
          getHeight: () => {
            return 10;
          }
        };
        const subtreeLayoutData = Hierarchy["indented"](
          subtree,
          indentedConfig
        );
        let minY = Infinity;
        let maxY = -Infinity;
        G6.Util.traverseTree(subtreeLayoutData, (child) => {
          if (child.y < minY) minY = child.y;
          if (child.y > maxY) maxY = child.y;
        });
        const height = maxY - minY;

        const config = {
          direction: "LR",
          getId: function getId(d) {
            return d.id;
          },
          getHeight: function getHeight(d) {
            if (d.id === "Consensus") return height + 10;
            return 16;
          },
          getWidth: function getWidth() {
            return 16;
          },
          getVGap: function getVGap(d) {
            return 10;
          },
          getHGap: function getHGap() {
            return 100;
          }
        };
        const treeLayoutData = Hierarchy["mindmap"](data, config);
        let x, y;
        G6.Util.traverseTree(treeLayoutData, (sub) => {
          if (sub.id === "Consensus") {
            x = sub.x;
            y = sub.y;
          }
        });
        G6.Util.traverseTree(subtreeLayoutData, (sub) => {
          sub.x += x;
          sub.y += y;
        });
        G6.Util.traverseTree(treeLayoutData, (sub) => {
          sub.children?.forEach((child, i) => {
            if (child.id === "Consensus") {
              sub.children.splice(i, 1, subtreeLayoutData);
              console.log("cild", sub.children);
            }
          });
        });

        return treeLayoutData;
      }
    });

    graph.node(function (node) {
      return {
        label: node.id,
        labelCfg: {
          offset: 10,
          position: node.children && node.children.length > 0 ? "left" : "right"
        }
      };
    });

    graph.data(data);
    graph.render();
    graph.fitView();

    if (typeof window !== "undefined")
      window.onresize = () => {
        if (!graph || graph.get("destroyed")) return;
        if (!container || !container.scrollWidth || !container.scrollHeight)
          return;
        graph.changeSize(container.scrollWidth, container.scrollHeight);
      };
  });
