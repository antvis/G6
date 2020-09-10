import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';


const topoData = {
  nodes: [
    { id: "001", label: "user", imgType: "user" },
    { id: "002", label: "Firewall", imgType: "firewall" },
    { id: "003", label: "OrderCenter-server", imgType: "server" },
    { id: "004", label: "OrderCenter-server", imgType: "server" },
    { id: "005", label: "Tomcat01", imgType: "tomcat", comboId: "orderCenter" },
    { id: "006", label: "DB", imgType: "db", comboId: "orderCenter" },
    { id: "007", label: "Switch", imgType: "switch" },
    { id: "008", label: "UserCenter-server", imgType: "server" },
    { id: "009", label: "Tomcat02", imgType: "tomcat", comboId: "userCenter" },
    { id: "010", label: "DB", imgType: "db", comboId: "userCenter" },
    { id: "011", label: "UserCenter-server", imgType: "server" }
  ],
  combos: [
    {
      id: "orderCenter",
      label: "OrderCenter",
      anchorPoints: [
        [0, 0.5],
        [0.5, 1]
      ]
    },
    {
      id: "userCenter",
      label: "UserCenter"
    }
  ],
  edges: [
    // , style: {strokeOpacity: 0}
    { id: "E001", source: "001", target: "002", label: "52ms" },
    {
      id: "E002",
      source: "002",
      target: "005",
      type: "line",
      style: { strokeOpacity: 0 }
    },
    { id: "E003", source: "005", target: "003", label: "52ms" },
    { id: "E004", source: "005", target: "006", label: "52ms" },
    { id: "E005", source: "006", target: "004", label: "52ms" },
    {
      id: "E006",
      source: "005",
      target: "007",
      type: "line",
      style: { strokeOpacity: 0 }
    },
    {
      id: "E007",
      source: "007",
      target: "009",
      type: "line",
      style: { strokeOpacity: 0 }
    },
    { id: "E008", source: "009", target: "011", label: "52ms" },
    { id: "E009", source: "009", target: "010", label: "52ms" },
    { id: "E010", source: "010", target: "008", label: "52ms" },

    // 节点连接 combo
    { id: "E011", source: "002", target: "orderCenter", label: "52ms" }, // firewoall --> orderCenter
    { id: "E012", source: "orderCenter", target: "007", label: "52ms" }, // orderCenter --> switch
    { id: "E013", source: "007", target: "userCenter", label: "52ms" } // switch --> userCenter
  ]
};

const topoData2 = {
  nodes: [
    { id: "B001", label: "Eservice", imgType: "server" },
    { id: "B002", label: "OrderCenter", imgType: "firewall" },
    { id: "B003", label: "TradingCenter", imgType: "server" },
    { id: "B004", label: "UserCenter", imgType: "server" }
  ],
  edges: [
    { id: "BE001", source: "B001", target: "B002", label: "456" },
    { id: "BE002", source: "B002", target: "B003", label: "123" },
    { id: "BE003", source: "B002", target: "B004", label: "345" }
  ]
};

// 默认节点设置
const defaultNode = {
  size: [60, 60],
  color: "steelblue",
  type: "circle",
  style: {
    lineWidth: 1,
    fill: "#fff"
  },
  labelCfg: {
    position: "bottom",
    offset: 10
  }
};

// 默认边设置
const defaultEdge = {
  type: "line",
  size: 2,
  color: "#e2e2e2",
  style: {
    lineDash: [4, 4],
    stroke: "blue"
  },
  labelCfg: {
    refY: 10
  }
};

// 默认组 combo 设置
const defaultCombo = {
  type: "rect",
  padding: 40,
  style: {
    lineWidth: 2,
    fill: "#fff"
  },
  labelCfg: {
    position: "top",
    refY: -20
  }
};

let graph: IGraph = null;

const ChangeData = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        groupByTypes: false,
        defaultNode: defaultNode,
        defaultEdge: defaultEdge,
        defaultCombo: defaultCombo,
        // layout: {
        //   type: "dagre",
        //   nodeSize: [40, 40], // 节点间距
        //   ranksep: 30, //
        //   rankdir: "LR",
        //   align: "DL"
        // },
        nodeStateStyles: {
          active: {
            opacity: 1
          },
          inactive: {
            opacity: 0.2
          }
        },
        edgeStateStyles: {
          active: {
            opacity: 1
          },
          inactive: {
            opacity: 0.2
          }
        }
      });
      graph.data(topoData);
      graph.render();

      graph.on('node:click', e => {
        graph.changeData(topoData2);
      })
      graph.on('canvas:click', (e) => {
        graph.changeData(topoData);
      });
    }
  });
  return <div ref={container}></div>;
};

export default ChangeData;
