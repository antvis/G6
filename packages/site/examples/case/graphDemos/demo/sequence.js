import G6 from '@antv/g6';

const sequenceStyle = {
  nodeHeight: 30, // Object节点高度
  nodeWidth: 150, // Object节点宽度
  nodeMargin: 10, // Object节点间距
  activeWidth: 10, // active区域宽度
  activeHeight: 40 // active区域高度
};

/* 已知条件 */
const data = [
  {
    source: "A",
    target: "B",
    message: "Hello B, how are you?"
  },
  {
    source: "A",
    target: "C",
    message: "Hello C, how are you?"
  },
  {
    source: "B",
    target: "A",
    message: "Great!"
  }
];

// 数据处理
const nodeArr = [
  ...new Set(
    data.map((item) => item.source).concat(data.map((item) => item.target))
  )
];

const sequenceData = {
  nodes: [],
  edges: []
};

const sequenceNodes = [];

const getSequenceNode = (data, nodeArr, sequenceStyle) => {
  const { nodeWidth, activeHeight, nodeMargin, nodeHeight } = sequenceStyle;
  // 计算整体高度
  const height = (data.length + 1) * activeHeight + nodeHeight;
  // 生成上下节点
  nodeArr.forEach((nodeName, index) => {
    const x = index * (nodeWidth + nodeMargin) + nodeWidth * 0.5;
    sequenceData.nodes.push(
      {
        name: nodeName,
        type: "sequence-node",
        id: `${nodeName}-start`,
        x: x,
        y: 0
      },
      {
        name: nodeName,
        type: "sequence-node",
        id: `${nodeName}-end`,
        x: x,
        y: height
      }
    );
    // 下节点中心点坐标
    sequenceNodes[nodeName] = x;
    // 节点关系（ 连线 ）
    sequenceData.edges.push({
      source: `${nodeName}-start`,
      target: `${nodeName}-end`
    });
  });
};

const getSequenceLine = (data, sequenceStyle) => {
  const { activeHeight, nodeHeight } = sequenceStyle;
  data.forEach((node, index) => {
    const height = index * activeHeight + activeHeight + nodeHeight * 0.5;
    sequenceData.nodes.push(
      {
        type: "active-node",
        id: `${node.source}-${index}`,
        x: sequenceNodes[node.source],
        y: height
      },
      {
        type: "active-node",
        id: `${node.target}-${index}`,
        x: sequenceNodes[node.target],
        y: height
      }
    );
    sequenceData.edges.push({
      text: node.message,
      source: `${node.source}-${index}`,
      target: `${node.target}-${index}`,
      type: "sequence-line-arrow"
    });
  });
};

// Object
getSequenceNode(data, nodeArr, sequenceStyle);
// Message连线
getSequenceLine(data, sequenceStyle);

G6.registerNode(
  "sequence-node",
  {
    drawShape(cfg, group) {
      console.log(3344);

      const { nodeHeight, nodeWidth } = sequenceStyle;
      // 矩形框框
      const nodeBox = group.addShape("rect", {
        attrs: {
          x: -nodeWidth * 0.5,
          y: -nodeHeight * 0.5,
          width: nodeWidth,
          height: nodeHeight,
          fill: "#e6f7ff",
          stroke: "#91d5ff",
          radius: 3
        }
      });

      group.addShape("text", {
        attrs: {
          text: cfg.name,
          x: 0,
          y: 0,
          fontSize: 9,
          textAlign: "center",
          textBaseline: "middle",
          fill: "#555"
        }
      });
      return nodeBox;
    }
  },
  "extend-node"
);

G6.registerEdge(
  "sequence-line-arrow",
  {
    draw: function draw(cfg, group) {
      const { startPoint, endPoint } = cfg;
      const { activeWidth } = sequenceStyle;
      const isFromLine = endPoint.x - startPoint.x > 0;
      const newEndPoint = {
        x: isFromLine
          ? endPoint.x - activeWidth * 0.5
          : endPoint.x + activeWidth * 0.5,
        y: endPoint.y
      };

      const newStartPoint = {
        x: isFromLine
          ? startPoint.x + activeWidth * 0.5
          : startPoint.x - activeWidth * 0.5,
        y: startPoint.y
      };

      const path = this.getPath([newStartPoint, newEndPoint]);

      group.addShape("path", {
        attrs: {
          path: path,
          lineWidth: 1,
          stroke: "#555",
          cursor: "pointer",
          endArrow: {
            path: "M 0,0 L 8,4 L 8,-4 Z",
            fill: "#333"
          },
          lineAppendWidth: 10 // 可点击范围
        }
      });

      const shape = group.addShape("text", {
        attrs: {
          text: cfg.text,
          x: (startPoint.x + endPoint.x) * 0.5,
          y: startPoint.y - 4,
          fontSize: 10,
          textAlign: "center",
          textBaseline: "bottom",
          fill: "#096dd9",
          fontWeight: "400"
        }
      });
      return shape;
    },
    update: null
  },
  "line"
);

G6.registerNode(
  "active-node",
  {
    drawShape(cfg, group) {
      const { activeHeight, activeWidth } = sequenceStyle;
      console.log(1122);
      const nodeBox = group.addShape("rect", {
        attrs: {
          x: -activeWidth * 0.5,
          y: -activeHeight * 0.5,
          width: activeWidth,
          height: activeHeight,
          fill: "#91d5ff"
        }
      });
      return nodeBox;
    }
  },
  "extend-node"
);
const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;

const graph = new G6.Graph({
  container: "container",
  width,
  height,
  fitView: true,
  defaultNode: {
    anchorPoints: [[0.5, 0.5]]
  },
  defaultEdge: {
    type: "line"
  }
});

graph.data(sequenceData);
graph.render();

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };