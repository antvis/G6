import React, { useRef, useEffect } from 'react';
import G6 from '../../../src';
import isArray from '@antv/util/lib/is-array';

const data = {
  // 点集
  nodes: [
    {
      id: 'node1', // String，该节点存在则必须，节点的唯一标识
      x: 100, // Number，可选，节点位置的 x 值
      y: 200, // Number，可选，节点位置的 y 值
    },
    {
      id: 'node2', // String，该节点存在则必须，节点的唯一标识
      x: 300, // Number，可选，节点位置的 x 值
      y: 200, // Number，可选，节点位置的 y 值
    },
  ],
  // 边集
  edges: [
    {
      source: 'node1', // String，必须，起始点 id
      target: 'node2', // String，必须，目标点 id
    },
  ],
};

// import "./styles.css";

/**
 * 【问题】！！！
 * 当我点击“隐藏节点”后，节点正常隐藏
 * 但是点击“改变数据”调用changeData方法后，节点能隐藏，但是边又显示出来了。
 */
export default () => {
  const graphContainer = useRef(null);
  let graph = null// useRef(null);

  // 图初始化
  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: graphContainer.current, // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
        width: 800, // Number，必须，图的宽度
        height: 500, // Number，必须，图的高度
        modes: {
          default: [
            "drag-canvas",
            "zoom-canvas",
            "drag-node",
            {
              type: "brush-select",
              trigger: "ctrl",
              includeEdges: false,
              selectedState: "click"
            }
          ] // 允许拖拽画布、放缩画布、拖拽节点
          // default: ["drag-canvas", "zoom-canvas"] // 允许拖拽画布、放缩画布
        },
        defaultNode: {
          size: 50, // 节点大小
          style: {
            opacity: 0.8,
            lineWidth: 1,
            stroke: "#999"
          },
          labelCfg: {
            style: {
              fill: "#fff"
            }
          }
        },
        defaultEdge: {
          labelCfg: {
            autoRotate: true,
            style: {
              fontSize: 14,
              fill: "#333"
            }
          },
          style: {
            stroke: "#808080",
            lineWidth: 1,
            endArrow: true,
            lineAppendWidth: 10,
            // opacity: 0.6
          }
        },
        // 节点不同状态下的样式集合
        nodeStateStyles: {
          // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
          hover: {
            fill: "lightsteelblue"
          },
          // 鼠标点击节点，即 click 状态为 true 时的样式
          click: {
            shadowColor: "#808080",
            shadowBlur: 10,
            lineWidth: 2,
            fill: 'yellow'
            // fill: "lightsteelblue"
          }
        },
        // 边不同状态下的样式集合
        edgeStateStyles: {
          // 鼠标点击边，即 click 状态为 true 时的样式
          click: {
            stroke: "red",
            lineWidth: 2
            // shadowColor: "#000",
            // shadowBlur: 10
          }
        },
      });    
    }

    graph && graph.data(data);
    graph && graph.render();

    graph.on("edge:click", e => {
      // 先将所有当前是 click 状态的边置为非 click 状态
      const edgeItem = e.item; // 获取被点击的边元素对象
      graph.setItemState(edgeItem, "click", true); // 设置当前边的 click 状态为 true
      // this.options.edgeClickCallback();
    });
    graph.on("node:click", e => {
      // 先将所有当前是 click 状态的节点置为非 click 状态
      const nodeItem = e.item; // 获取被点击的节点元素对象
      graph.setItemState(nodeItem, "click", true); // 设置当前节点的 click 状态为 true
    });
    // 鼠标进入节点
    graph.on("node:mouseenter", e => {
      const nodeItem = e.item; // 获取鼠标进入的节点元素对象
      graph.setItemState(nodeItem, "hover", true); // 设置当前节点的 hover 状态为 true
    });
    graph.on("node:mouseleave", e => {
      const nodeItem = e.item; // 获取鼠标离开的节点元素对象
      graph.setItemState(nodeItem, "hover", false); // 设置当前节点的 hover 状态为 false
    });
  }, []);

  const toggleEdge = () => {
    const clickEdges = graph.findAllByState("edge", "click");
    clickEdges.forEach(clickEdge => {
      const model = {
        style: {
          stroke: "#808080",
          lineWidth: 1,
          endArrow: true,
          lineAppendWidth: 10,
        },
        stateStyles: {
          click: {
            stroke: "#333",
            lineWidth: 2
          }
        }
      };
      graph.updateItem(clickEdge, model);
    });
  };

  /**
   * 模拟折叠node2节点
   */
  const toggleNode = () => {
    const clickNodes = graph.findAllByState("node", "click");
    // console.log(clickNodes);
    clickNodes.forEach(clickNode => {
      // let model = clickNode.getModel();
      // console.log(model);
      const model = {
        style: {
          opacity: 0.8,
          lineWidth: 1,
          stroke: "green"
        },
        stateStyles: {
          // 修改 hover 状态下的样式
          click: {
            stroke: 'blue'
          }
        }
      };
      graph.updateItem(clickNode, model);
    });
  };

  return (
    <div>
      <button onClick={toggleNode}>切换节点</button>
      <button onClick={toggleEdge}>切换边</button>
      <div ref={graphContainer} className={'graph-container'} />
    </div>
  );
};
