import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import { GraphData } from '../../../src/types';


const data = {
  nodes: [
    {
      id: '0',
      label: '0node11',
      comboId: '分组1',
    },
    {
      id: '1',
      label: '1node12',
      
      comboId: '分组1',
    },
    {
      id: '2',
      label: '2node21',
      comboId: '分组2',
    },
    {
      id: '4',
     comboId: '分组2',
      label: '4node23',
    },
    {
      id: '5',
     comboId: '分组2',
      label: '5node24',
    },
    {
      id: '6',
      label: '6node31',
      comboId: '分组3',
    },
    {
      id: '7',
      label: '7node32',
      comboId: '分组3',
    },
    {
      id: '8',
      label: '8node41',
      comboId: '分组4',
    },
    {
      id: '9',
      label: '9node42',
      comboId: '分组4',
    },
    {
      id: '12',
      label: '12node53',
      comboId: '分组5',
    },
    {
      id: '15',
      label: '15node56',
      comboId: '分组5',
    },
    {
      id: '16',
      label: '16node57',
      comboId: '分组5',
    },
    {
      id: '17',
      label: '17node58',
      comboId: '分组5',
    },
    {
      id: '18',
      label: '18node59',
      comboId: '分组5',
    },
    {
      id: '19',
      label: '19node510',
      comboId: '分组5',
    },
  ],
  edges: [
    {
      source: '6',
      target: '2',
      metrics:{
        "qps":100,
        "errorQps":0
      }
    },
    {
      source: '7',
      target: '4',
       metrics:{
        "qps":100,
        "errorQps":0
      }
    },
    {
      source: '12',
      target: '17',
       metrics:{
        "qps":100,
        "errorQps":0
      }
    },
    {
      source: '6',
      target: '4',
       metrics:{
        "qps":100,
        "errorQps":0
      }
    },
    {
      source: '1',
      target: '7',
       metrics:{
        "qps":100,
        "errorQps":0
      }
    },
    {
      source: '6',
      target: '15',
       metrics:{
        "qps":100,
        "errorQps":0
      }
    },
    {
      source: '7',
      target: '9',
       metrics:{
        "qps":100,
        "errorQps":0
      }
    },
    {
      id: '8',
      source: '12',
      target: '16',
       metrics:{
        "qps":100,
        "errorQps":0
      }
    },
    {
      source: '15',
      target: '19',
       metrics:{
        "qps":100,
        "errorQps":0
      }
    },
    {
      source: '12',
      target: '16',
       metrics:{
        "qps":100,
        "errorQps":0
      }
    },
    {
      source: '6',
      target: '8',
       metrics:{
        "qps":100,
        "errorQps":0
      }
    },
    {
      source: '0',
      target: '6',
       metrics:{
        "qps":100,
        "errorQps":0
      }
    },
    {
      source: '15',
      target: '18',
       metrics:{
        "qps":100,
        "errorQps":0
      }
    },
    {
      source: '15',
      target: '19',
       metrics:{
        "qps":100,
        "errorQps":0
      }
    },
    {
      source: '7',
      target: '5',
       metrics:{
        "qps":100,
        "errorQps":0
      }
    },
    {
      source: '7',
      target: '12',
       metrics:{
        "qps":100,
        "errorQps":0
      }
    },
    {
      source: '15',
      target: '17',
       metrics:{
        "qps":100,
        "errorQps":0
      }
    },
    {
      source:'6',
      target:'5',
       metrics:{
        "qps":100,
        "errorQps":0
      },
      hide:true
    },
    
    {
      source:'6',
      target:'2',
      hide:true,
       metrics:{
        "qps":100,
        "errorQps":0
      }
    }
  ],
  combos: [
    {
      id: '分组1',
      label: '分组1',
    },
    {
      id: '分组2',
      label: '分组2',
      parentId: null,
      collapsed: true,
    },
    {
      id: '分组3',
      label: '分组3',
      //parentId: null,
      collapsed: true,
    },
    {
      id: '分组4',
      label: '分组4',
      //parentId: null,
      collapsed: true,
    },
    {
      id: '分组5',
      label: '分组5',
      parentId: null,
      collapsed: true,
    },
  ]
};

let graph = null

const TopologyGraph = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1500,
        height: 1400,
        // plugins: [grid],
        defaultCombo: {
          type: "rect",
          size: [140, 30], // The minimum size of the Combo
          anchorPoints: [
            [0.5, 0],
            [0.5, 1]
          ],
          labelCfg: {
            refX: 10,
            refY: 10,
            position: "top"
          }
        },
        comboStateStyles: {
          active: {
            stroke: "red",
            lineWidth: 3
          },
          selected: {
            lineWidth: 5,
            stroke: "blue"
          }
        },
        modes: {
          default: [
            "drag-canvas",
            "drag-node",
            {
              type: "drag-combo",
              onlyChangeComboSize: true, //拖动嵌套的combo时，只改变父combo的大小，不改变层级关系
              activeState: "actived"
            },
          ]
        },
        defaultNode: {
          size: [40, 20],
          anchorPoints: [
            [0.5, 0],
            [0.5, 1]
          ],
          type: "rect",//"card-node",
          style: {
            fill: "r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff",
            stroke: "#5B8FF9",
            lineWidth: 3
          }
        },
        defaultEdge: {
          type: "cubic-vertical", 
          style: {
            stroke: "#A3B1BF",
            lineWidth: 1,
            lineAppendWidth: 1,
            endArrow: true //有终点箭头
          },
          sourceAnchor: 1,
          targetAnchor: 0
        },
        nodeStateStyles: {
          highlight: {
            opacity: 1,
            lineWidth: 3,
            stroke: "blue"
          }
        },
        edgeStateStyles: {
          active: {
            stroke: "#999",
            lineWidth: 3
          },
          inactive: {
            lineWidth: 1
          },
          highlight: {
            stroke: "#999",
            lineWidth: 3
          }
        },
        layout: {
          type: "dagre",
          direction: "TB", //从上往下
          nodesep: 50, //设置节点的水平间距
          ranksep: 50, //层间距
          sortByCombo: true, //combo排序，解决combo重叠问题
          controlPoints: false
        }
      });

      graph.data(data);
      graph.render();
    }
  });

  const refreshGraph = () => {
    debugger
    graph.data(data)
    graph.render()
  }

  return <div ref={container}>
    <button onClick={refreshGraph}>刷新</button>
  </div>;
};

export default TopologyGraph;
