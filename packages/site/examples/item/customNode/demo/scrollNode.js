import G6 from '@antv/g6';

const {
  Util,
  registerBehavior,
  registerEdge,
  registerNode
} = G6;

const rawData = [{
    "id": "info",
    "label": "Employee",
    "attrs": [{
        "key": "id",
        "type": "number(6)"
      },
      {
        "key": "key",
        "type": "varchar(255)"
      },
      {
        "key": "gender",
        "type": "enum(M, F)"
      },
      {
        "key": "birthday",
        "type": "date"
      },
      {
        "key": "hometown",
        "type": "varchar(255)"
      },
      {
        "key": "country",
        "type": "varchar(255)"
      },
      {
        "key": "nation",
        "type": "varchar(255)"
      },
      {
        "key": "jobId",
        "type": "number(3)",
        "relation": [{
          "key": "id",
          "nodeId": "job"
        }]
      },
      {
        "key": "phone",
        "type": "varchar(255)"
      },
      {
        "key": "deptId",
        "type": "number(6)",
        "relation": [{
          "key": "id",
          "nodeId": "dept"
        }]
      },
      {
        "key": "startTime",
        "type": "date"
      },
      {
        "key": "leaveTime",
        "type": "date"
      }
    ]
  },
  {
    "id": "dept",
    "label": "Department",
    "attrs": [{
        "key": "id",
        "type": "number(6)"
      },
      {
        "key": "title",
        "type": "varchar(255)"
      },
      {
        "key": "desc",
        "type": "text"
      },
      {
        "key": "parent",
        "type": "number(6)",
        "relation": [{
          "key": "id",
          "nodeId": "dept"
        }]
      },
      {
        "key": "manager",
        "type": "number(6)"
      }
    ]
  }
]

const isInBBox = (point, bbox) => {
  const {
    x,
    y
  } = point;
  const {
    minX,
    minY,
    maxX,
    maxY
  } = bbox;

  return x < maxX && x > minX && y > minY && y < maxY;
};

const itemHeight = 20;
registerBehavior("dice-er-scroll", {
  getDefaultCfg() {
    return {
      multiple: true,
    };
  },
  getEvents() {
    return {
      itemHeight,
      wheel: "scorll",
      click: "click",
      "node:mousemove": "move",
      "node:mousedown": "mousedown",
      "node:mouseup": "mouseup"
    };
  },
  scorll(e) {
    e.preventDefault();
    const {
      graph
    } = this;
    const nodes = graph.getNodes().filter((n) => {
      const bbox = n.getBBox();

      return isInBBox(graph.getPointByClient(e.clientX, e.clientY), bbox);
    });

    const x = e.deltaX || e.movementX;
    let y = e.deltaY || e.movementY;
    if (!y && navigator.userAgent.indexOf('Firefox') > -1) y = (-e.wheelDelta * 125) / 3

    if (nodes) {
      const edgesToUpdate = new Set();
      nodes.forEach((node) => {
        const model = node.getModel();
        if (model.attrs.length < 2) {
          return;
        }
        const idx = model.startIndex || 0;
        let startX = model.startX || 0.5;
        let startIndex = idx + y * 0.02;
        startX -= x;
        if (startIndex < 0) {
          startIndex = 0;
        }
        if (startX > 0) {
          startX = 0;
        }
        if (startIndex > model.attrs.length - 1) {
          startIndex = model.attrs.length - 1;
        }
        graph.updateItem(node, {
          startIndex,
          startX,
        });
        node.getEdges().forEach(edge => edgesToUpdate.add(edge))
      });
      // G6 update the related edges when graph.updateItem with a node according to the new properties
      // here you need to update the related edges manualy since the new properties { startIndex, startX } for the nodes are custom, and cannot be recognized by G6
      edgesToUpdate.forEach(edge => edge.refresh())
    }


  },
  click(e) {
    const {
      graph
    } = this;
    const item = e.item;
    const shape = e.shape;
    if (!item) {
      return;
    }

    if (shape.get("name") === "collapse") {
      graph.updateItem(item, {
        collapsed: true,
        size: [300, 50],
      });
      setTimeout(() => graph.layout(), 100);
    } else if (shape.get("name") === "expand") {
      graph.updateItem(item, {
        collapsed: false,
        size: [300, 80],
      });
      setTimeout(() => graph.layout(), 100);
    }
  },
  mousedown(e) {
    this.isMousedown = true;
  },
  mouseup(e) {
    this.isMousedown = false;
  },
  move(e) {
    if (this.isMousedown) return;
    const name = e.shape.get("name");
    const item = e.item;

    if (name && name.startsWith("item")) {
      this.graph.updateItem(item, {
        selectedIndex: Number(name.split("-")[1]),
      });
    } else {
      this.graph.updateItem(item, {
        selectedIndex: NaN,
      });
    }
  },
});

registerEdge("dice-er-edge", {
  draw(cfg, group) {
    const edge = group.cfg.item;
    const sourceNode = edge.getSource().getModel();
    const targetNode = edge.getTarget().getModel();

    const sourceIndex = sourceNode.attrs.findIndex(
      (e) => e.key === cfg.sourceKey
    );

    const sourceStartIndex = sourceNode.startIndex || 0;

    let sourceY = 15;

    if (!sourceNode.collapsed && sourceIndex > sourceStartIndex - 1) {
      sourceY = 30 + (sourceIndex - sourceStartIndex + 0.5) * itemHeight;
      sourceY = Math.min(sourceY, 80);
    }

    const targetIndex = targetNode.attrs.findIndex(
      (e) => e.key === cfg.targetKey
    );

    const targetStartIndex = targetNode.startIndex || 0;

    let targetY = 15;

    if (!targetNode.collapsed && targetIndex > targetStartIndex - 1) {
      targetY = (targetIndex - targetStartIndex + 0.5) * itemHeight + 30;
      targetY = Math.min(targetY, 80);
    }

    const startPoint = {
      ...cfg.startPoint
    };
    const endPoint = {
      ...cfg.endPoint
    };

    startPoint.y = startPoint.y + sourceY;
    endPoint.y = endPoint.y + targetY;

    let shape;
    if (sourceNode.id !== targetNode.id) {
      shape = group.addShape("path", {
        attrs: {
          stroke: "#5B8FF9",
          path: [
            ["M", startPoint.x, startPoint.y],
            [
              "C",
              endPoint.x / 3 + (2 / 3) * startPoint.x,
              startPoint.y,
              endPoint.x / 3 + (2 / 3) * startPoint.x,
              endPoint.y,
              endPoint.x,
              endPoint.y,
            ],
          ],
          endArrow: true,
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: "path-shape",
      });
    } else if (!sourceNode.collapsed) {
      let gap = Math.abs((startPoint.y - endPoint.y) / 3);
      if (startPoint["index"] === 1) {
        gap = -gap;
      }
      shape = group.addShape("path", {
        attrs: {
          stroke: "#5B8FF9",
          path: [
            ["M", startPoint.x, startPoint.y],
            [
              "C",
              startPoint.x - gap,
              startPoint.y,
              startPoint.x - gap,
              endPoint.y,
              startPoint.x,
              endPoint.y,
            ],
          ],
          endArrow: true,
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: "path-shape",
      });
    }

    return shape;
  },
  afterDraw(cfg, group) {
    const labelCfg = cfg.labelCfg || {};
    const edge = group.cfg.item;
    const sourceNode = edge.getSource().getModel();
    const targetNode = edge.getTarget().getModel();
    if (sourceNode.collapsed && targetNode.collapsed) {
      return;
    }
    const path = group.find(
      (element) => element.get("name") === "path-shape"
    );

    const labelStyle = Util.getLabelPosition(path, 0.5, 0, 0, true);
    const label = group.addShape("text", {
      attrs: {
        ...labelStyle,
        text: cfg.label || '',
        fill: "#000",
        textAlign: "center",
        stroke: "#fff",
        lineWidth: 1,
      },
    });
    label.rotateAtStart(labelStyle.rotate);
  },
});

registerNode("dice-er-box", {
  draw(cfg, group) {
    const width = 250;
    const height = 96;
    const itemCount = 10;
    const boxStyle = {
      stroke: "#096DD9",
      radius: 4,
    };

    const {
      attrs = [],
        startIndex = 0,
        selectedIndex,
        collapsed,
        icon,
    } = cfg;
    const list = attrs;
    const afterList = list.slice(
      Math.floor(startIndex),
      Math.floor(startIndex + itemCount - 1)
    );
    const offsetY = (0.5 - (startIndex % 1)) * itemHeight + 30;

    group.addShape("rect", {
      attrs: {
        fill: boxStyle.stroke,
        height: 30,
        width,
        radius: [boxStyle.radius, boxStyle.radius, 0, 0],
      },
      draggable: true,
    });

    let fontLeft = 12;

    if (icon && icon.show !== false) {
      group.addShape("image", {
        attrs: {
          x: 8,
          y: 8,
          height: 16,
          width: 16,
          ...icon,
        },
      });
      fontLeft += 18;
    }

    group.addShape("text", {
      attrs: {
        y: 22,
        x: fontLeft,
        fill: "#fff",
        text: cfg.label,
        fontSize: 12,
        fontWeight: 500,
      },
    });

    group.addShape("rect", {
      attrs: {
        x: 0,
        y: collapsed ? 30 : 80,
        height: 15,
        width,
        fill: "#eee",
        radius: [0, 0, boxStyle.radius, boxStyle.radius],
        cursor: "pointer",
      },
      // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
      name: collapsed ? "expand" : "collapse",
    });

    group.addShape("text", {
      attrs: {
        x: width / 2 - 6,
        y: (collapsed ? 30 : 80) + 12,
        text: collapsed ? "+" : "-",
        width,
        fill: "#000",
        radius: [0, 0, boxStyle.radius, boxStyle.radius],
        cursor: "pointer",
      },
      // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
      name: collapsed ? "expand" : "collapse",
    });

    const keyshape = group.addShape("rect", {
      attrs: {
        x: 0,
        y: 0,
        width,
        height: collapsed ? 45 : height,
        ...boxStyle,
      },
      draggable: true,
    });

    if (collapsed) {
      return keyshape;
    }

    const listContainer = group.addGroup({});
    listContainer.setClip({
      type: "rect",
      attrs: {
        x: -8,
        y: 30,
        width: width + 16,
        height: 80 - 30,
      },
    });
    listContainer.addShape({
      type: "rect",
      attrs: {
        x: 1,
        y: 30,
        width: width - 2,
        height: 80 - 30,
        fill: "#fff",
      },
      draggable: true,
    });

    if (list.length > itemCount) {
      const barStyle = {
        width: 4,
        padding: 0,
        boxStyle: {
          stroke: "#00000022",
        },
        innerStyle: {
          fill: "#00000022",
        },
      };

      listContainer.addShape("rect", {
        attrs: {
          y: 30,
          x: width - barStyle.padding - barStyle.width,
          width: barStyle.width,
          height: height - 30,
          ...barStyle.boxStyle,
        },
      });

      const indexHeight =
        afterList.length > itemCount ?
        (afterList.length / list.length) * height :
        10;

      listContainer.addShape("rect", {
        attrs: {
          y: 30 +
            barStyle.padding +
            (startIndex / list.length) * (height - 30),
          x: width - barStyle.padding - barStyle.width,
          width: barStyle.width,
          height: Math.min(height, indexHeight),
          ...barStyle.innerStyle,
        },
      });
    }
    if (afterList) {
      afterList.forEach((e, i) => {
        const isSelected =
          Math.floor(startIndex) + i === Number(selectedIndex);
        let {
          key = "", type
        } = e;
        if (type) {
          key += " - " + type;
        }
        const label = key.length > 26 ? key.slice(0, 24) + "..." : key;

        listContainer.addShape("rect", {
          attrs: {
            x: 1,
            y: i * itemHeight - itemHeight / 2 + offsetY,
            width: width - 4,
            height: itemHeight,
            radius: 2,
            lineWidth: 1,
            cursor: "pointer",
          },
          // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
          name: `item-${Math.floor(startIndex) + i}-content`,
          draggable: true,
        });

        if (!cfg.hideDot) {
          listContainer.addShape("circle", {
            attrs: {
              x: 0,
              y: i * itemHeight + offsetY,
              r: 3,
              stroke: boxStyle.stroke,
              fill: "white",
              radius: 2,
              lineWidth: 1,
              cursor: "pointer",
            },
          });
          listContainer.addShape("circle", {
            attrs: {
              x: width,
              y: i * itemHeight + offsetY,
              r: 3,
              stroke: boxStyle.stroke,
              fill: "white",
              radius: 2,
              lineWidth: 1,
              cursor: "pointer",
            },
          });
        }

        listContainer.addShape("text", {
          attrs: {
            x: 12,
            y: i * itemHeight + offsetY + 6,
            text: label,
            fontSize: 12,
            fill: "#000",
            fontFamily: "Avenir,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
            full: e,
            fontWeight: isSelected ? 500 : 100,
            cursor: "pointer",
          },
          // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
          name: `item-${Math.floor(startIndex) + i}`,
        });
      });
    }



    return keyshape;
  },
  getAnchorPoints() {
    return [
      [0, 0],
      [1, 0],
    ];
  },
});

const dataTransform = (data) => {
  const nodes = [];
  const edges = [];

  data.map((node) => {
    nodes.push({
      ...node
    });
    if (node.attrs) {
      node.attrs.forEach((attr) => {
        if (attr.relation) {
          attr.relation.forEach((relation) => {
            edges.push({
              source: node.id,
              target: relation.nodeId,
              sourceKey: attr.key,
              targetKey: relation.key,
              label: relation.label,
            });
          });
        }

      });
    }
  });

  return {
    nodes,
    edges,
  };
}

const container = document.getElementById('container');

const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 20;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  defaultNode: {
    size: [300, 200],
    type: 'dice-er-box',
    color: '#5B8FF9',
    style: {
      fill: '#9EC9FF',
      lineWidth: 3,
    },
    labelCfg: {
      style: {
        fill: 'black',
        fontSize: 20,
      },
    },
  },
  defaultEdge: {
    type: 'dice-er-edge',
    style: {
      stroke: '#e2e2e2',
      lineWidth: 4,
      endArrow: true,
    },
  },
  modes: {
    default: ['dice-er-scroll', 'drag-node', 'drag-canvas'],
  },
  layout: {
    type: 'dagre',
    rankdir: 'LR',
    align: 'UL',
    controlPoints: true,
    nodesepFunc: () => 0.2,
    ranksepFunc: () => 0.5,
  },
  animate: true,
  fitView: true
})

graph.data(dataTransform(rawData));

graph.render();
