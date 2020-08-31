import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

G6.registerCombo(
  "cRect",
  {
    drawShape: function drawShape(cfg: any, group) {
      const self = this;
      // Get the padding from the configuration
      cfg.padding = cfg.padding || [50, 20, 20, 20];
      // Get the shape's style, where the style.width and style.height correspond to the width and height in the figure of Illustration of Built-in Rect Combo
      const style = self.getShapeStyle(cfg);
      // Add a rect shape as the keyShape which is the same as the extended rect Combo
      const rect = group.addShape("rect", {
        attrs: {
          ...style,
          x: -style.width / 2 - (cfg.padding[3] - cfg.padding[1]) / 2,
          y: -style.height / 2 - (cfg.padding[0] - cfg.padding[2]) / 2,
          width: style.width,
          height: style.height
        },
        draggable: true,
        name: "combo-rect"
      });

      const { x, y, width, height } = rect.getBBox();

      const markerPosition = [
        { x: x + width / 2, y: y },
        { x: x, y: y + height / 2 },
        { x: x + width, y: y + height / 2 },
        { x: x + width / 2, y: y + height }
      ];

      markerPosition.forEach((item, index) => {
        group.addShape("marker", {
          attrs: {
            ...style,
            fill: "white",
            stroke: style.stroke,
            lineDash: [0, 0],
            opacity: 1,
            // cfg.style.width and cfg.style.heigth correspond to the innerWidth and innerHeight in the figure of Illustration of Built-in Rect Combo
            x: item.x,
            y: item.y,
            r: 5
          },
          draggable: true,
          name: `combo-marker-shape-${index}`
        });
      });
      // Add the circle on the right

      return rect;
    },
    afterUpdate: function afterUpdate(cfg, combo) {
      const group = combo.getContainer();
      // Find the circle shape in the graphics group of the Combo by name
      // Update the position of the right circle
      const keyShape = group.find((e) => e.get("name") === "combo-rect");

      // 动画完成后才能获取正确的 bbox，否则 getBBox 得到的是动画过程中的 bbox
      setTimeout(() => {
        const { maxX, maxY, minX, minY } = keyShape.getBBox();
        const centerX = (maxX + minX) / 2;
        const centerY = (maxY + minY) / 2;
        let markerX, markerY;
        for (let i = 0; i < 4; i++) {
          const marker = group.find(
            (e) => e.get("name") === `combo-marker-shape-${i}`
          );
          switch (i) {
            case 0:
              (markerX = centerX), (markerY = minY);
              break;
            case 1:
              markerX = maxX;
              markerY = centerY;
              break;
            case 2:
              markerX = centerX;
              markerY = maxY;
              break;
            case 3:
              (markerX = minX), (markerY = centerY);
              break;
            default:
              break;
          }
          marker.attr({
            x: markerX,
            y: markerY,
            stroke: (keyShape as any).attrs.stroke
          });
        }
      }, 200);
    }
    // Define the updating logic of the right circle
  },
  "rect"
);

G6.registerBehavior("click_selected", {
  getDefaultCfg() {
    return {
      multiple: false
    };
  },
  getEvents() {
    return {
      "node:click": "onNodeClick",
      "edge:click": "onEdgeClick",
      "combo:click": "onComboClick"
    };
  },
  clearStatus(target) {
    const selectedNode = this.graph.findAllByState("node", "selected")[0];

    const selectedCombo = this.graph.findAllByState("combo", "selected")[0];

    const selectedEdge = this.graph.findAllByState("edge", "selected")[0];

    if (
      target &&
      (target === selectedNode ||
        target === selectedCombo ||
        target === selectedEdge)
    ) {
      return;
    }

    if (selectedNode) {
      this.graph.clearItemStates(selectedNode);
      this.graph.updateItem(selectedNode, {
        linkPoints: {
          top: false,
          bottom: false,
          left: false,
          right: false
        }
      });
    }
    if (selectedEdge) {
      this.graph.clearItemStates(selectedEdge);
    }

    if (selectedCombo) {
      this.graph.clearItemStates(selectedCombo);
    }
  },

  onComboClick(e) {
    const target = e.item;
    this.clearStatus(target);
    this.graph.setItemState(target, "selected", true);
  },

  onNodeClick(e) {
    const target = e.item;
    this.clearStatus(target);

    this.graph.setItemState(target, "selected", true);

    this.graph.updateItem(target, {
      linkPoints: {
        top: true,
        bottom: true,
        left: true,
        right: true,
        size: 10,
        fill: "#fff",
        lineWidth: 1,
        stroke: "#1890FF"
      }
    });
  },
  onEdgeClick(e) {
    const target = e.item;
    this.clearStatus();
    this.graph.setItemState(target, "selected", true);
  }
});

const isInterval = (min, max, target) => {
  return target >= min && target <= max;
};

G6.registerBehavior("click-add-edge", {
  // Set the events and the corresponding responsing function for this behavior
  getEvents() {
    return {
      "node:click": "onClick", // The event is canvas:click, the responsing function is onClick
      mousemove: "onMousemove", // The event is mousemove, the responsing function is onMousemove
      "edge:click": "onEdgeClick", // The event is edge:click, the responsing function is onEdgeClick
      "combo:click": "onClick",
      "combo:drop": "onComboDrop"
    };
  },
  // The responsing function for node:click defined in getEvents
  onClick(ev) {
    const self = this;
    const node = ev.item;
    const graph = self.graph;

    // The position where the mouse clicks
    const model = node.getModel();

    if (self.addingEdge && self.edge) {
      if (self.edge._cfg.model.target === self.edge._cfg.model.source) {
        self.graph.removeItem(self.edge);
        self.edge = null;
        self.addingEdge = false;
      } else {
        graph.updateItem(self.edge, {
          target: model.id
        });
        self.edge = null;
        self.addingEdge = false;
      }
    } else {
      const isClickLinkPoint =
        (ev.target.get("className") &&
          ev.target.get("className").includes("link-point")) ||
        (ev.target.cfg.name &&
          ev.target.cfg.name.includes("combo-marker-shape"));

      if (isClickLinkPoint) {
        // Add anew edge, the end node is the current node user clicks
        self.edge = graph.addItem("edge", {
          source: model.id,
          target: model.id
        });
        self.addingEdge = true;
      }
    }
  },
  // The responsing function for mousemove defined in getEvents
  onMousemove(ev) {
    const self = this;
    // The current position the mouse clicks
    const point = { x: ev.x, y: ev.y };

    if (self.addingEdge && self.edge) {
      // Update the end node to the current node the mouse clicks
      try {
        self.graph.updateItem(self.edge, {
          target: point
        });
      } catch (err) { }
    }
  },

  // The responsing function for edge:click defined in getEvents
  onEdgeClick(ev) {
    const self = this;
    const currentEdge = ev.item;
    if (self.addingEdge && self.edge === currentEdge) {
      const target = self.graph.find("node", (node) => {
        const { minX, minY, maxX, maxY } = node.getBBox();
        const { x, y } = ev;
        return isInterval(minX, maxX, x) && isInterval(minY, maxY, y);
      });
      if (target) {
        self.graph.updateItem(self.edge, {
          target: target._cfg.id
        });
        const selectedEdge = this.graph.findAllByState("edge", "selected")[0];
        this.graph.clearItemStates(selectedEdge);

        self.edge = null;
        self.addingEdge = false;
      } else {
        self.graph.removeItem(self.edge);
        self.edge = null;
        self.addingEdge = false;
      }
    }
  },
  onComboDrop(ev) { }
});

const ComboState = () => {
  const container = React.useRef();

  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: container.current,
        width: 500,
        height: 500,
        groupByTypes: false,
        modes: {
          default: ["click_selected",
            "click-add-edge",
            "drag-node",
            "drag-canvas",
            "drag-combo"]
        },
        defaultCombo: {
          type: 'cRect',
          padding: [30, 30, 30, 30],
          size: [150, 50],
          style: {
            lineDash: [5, 5]
          },
          anchorPoints: [
            [0, 0.5],
            [1, 0.5],
            [0.5, 0],
            [0.5, 1]
          ]
        },
        defaultNode: {
          type: "rect",
          size: [150, 30],
          style: {
            fill: "white",
            stroke: "#666",
            lineWidth: 2
          },
          anchorPoints: [
            [0, 0.5],
            [1, 0.5],
            [0.5, 0],
            [0.5, 1]
          ]
        },
        defaultEdge: {
          type: "line",
          style: {
            endArrow: true,
            stroke: "#666",
            lineWidth: 2
          }
        },
        nodeStateStyles: {
          // The node styles in selected state
          selected: {
            stroke: "#5e91fa",
            lineWidth: 2,
            fill: "#c6e5ff"
          }
        },
        comboStateStyles: {
          selected: {
            stroke: "#5e91fa",
            lineWidth: 2,
            fill: "#c6e5ff"
          }
        },
      });
    }

    const data = {
      combos: [
        {
          id: 'combo1'
        }
      ]
    };
    graph.data(data);
    graph.render();

  }, [])

  const handleAddNode = () => {
    graph.addItem("node", {
      id: `node_${Math.floor(Math.random())}`,
      x: 100,
      y: 200
    });
  }

  const handleDeleteNode = () => {
    const node = graph.findAllByState("node", "selected");

    if (node.length > 0) {
      const item = node[0]._cfg.id;
      graph.removeItem(item);
    }
  }

  const handleAddCombo = () => {
    graph.addItem("combo", {
      id: `combo_${Math.floor(Math.random() * 100)}`,
      x: 300,
      y: 300
    });
  }

  return <div ref={container}>
    <button onClick={handleAddNode}>添加节点</button>
    <button onClick={handleDeleteNode}>删除节点</button>
    <button onClick={handleAddCombo}>添加 Combo</button>
  </div>;
}

export default ComboState
