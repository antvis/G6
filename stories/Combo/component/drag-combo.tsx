import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import { GraphData } from '../../../src/types';

let graph: IGraph = null;

const data: GraphData = {
  nodes: [
    {
      id: "node1",
      label: "node1"
    },
    {
      id: "node2",
      label: "node2",
      comboId: "combo1"
    },
    {
      id: "node3",
      label: "node3",
      comboId: "combo1"
    },
    {
      id: "node4",
      label: "node4",
      comboId: "combo2"
    },
    {
      id: "node5",
      label: "node5",
      comboId: "combo2"
    }
  ],
  edges: [
    {
      source: "node1",
      target: "combo1"
    },
    {
      source: "node1",
      target: "node2",
      style: {
        strokeOpacity: 0
      }
    },
    {
      source: "node1",
      target: "node3",
      style: {
        strokeOpacity: 0
      }
    },
    {
      source: "node2",
      target: "node4",
      style: {
        strokeOpacity: 0
      }
    },
    {
      source: "node2",
      target: "node4",
      style: {
        strokeOpacity: 0
      }
    },
    {
      source: "node3",
      target: "node5",
      style: {
        strokeOpacity: 0
      }
    },
    {
      source: "node3",
      target: "node4",
      style: {
        strokeOpacity: 0
      }
    },
    {
      source: "combo1",
      target: "combo2"
    }
  ],
  combos: [
    {
      id: "combo1",
      label: 'combo1'
    },
    {
      id: "combo2",
      label: 'combo2'
    }
  ]
};

const DragCombo = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 800,
        height: 600,
        groupByTypes: false,
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
          type: "line-arrow",
          style: {
            endArrow: true,
            stroke: "#666",
            lineWidth: 2
          }
        },
        defaultCombo: {
          type: "cRect",
          padding: [30, 30, 30, 30],
          size: [150, 50],
          style: {
            lineDash: [5, 5],
            lineWidth: 1,
            fill: "#fff",
            stroke: "#000"
          },
          anchorPoints: [
            [0, 0.5],
            [1, 0.5],
            [0.5, 0],
            [0.5, 1]
          ]
        },
        modes: {
          default: [
            // "click_selected",
            // "click-add-edge",
            { type: "drag-node", enableDelegate: true, onlyChangeComboSize: true },
            // "drag-canvas", , onlyChangeComboSize: true
            { type: "drag-combo", enableDelegate: true }
          ]
        },
        nodeStateStyles: {
          // The node styles in selected state
          selected: {
            stroke: "#5e91fa",
            lineWidth: 2,
            fill: "#c6e5ff"
          }
        },
        edgeStateStyles: {
          // The node styles in selected state
          selected: {
            stroke: "#92bbfc",
            lineWidth: 2,
            fill: "#92bbfc"
          }
        },
        comboStateStyles: {
          selected: {
            stroke: "#5e91fa",
            lineWidth: 2,
            fill: "#c6e5ff"
          }
        },
        layout: {
          type: "dagre",
          preventOverlap: true,
          nodeSize: 1,
          ranksep: 50,
          nodesep: 60
        }
      });
      graph.data(data);
      graph.render();

      graph.on('canvas:click', e => {
        graph.getCombos().forEach(combo => {
          console.log(combo.getBBox(), combo)

          const comboBox1 = combo.getBBox();

          graph.get('group').addShape('circle', {
            attrs: {
              x: comboBox1.x,
              y: comboBox1.y,
              fill: '#ff0',
              r: 5
            }
          });
          graph.get('group').addShape('circle', {
            attrs: {
              x: comboBox1.minX,
              y: comboBox1.minY,
              fill: '#f00',
              r: 5
            }
          });
          graph.get('group').addShape('circle', {
            attrs: {
              x: comboBox1.maxX,
              y: comboBox1.maxY,
              fill: '#f00',
              r: 5
            }
          });

          graph.get('group').addShape('circle', {
            attrs: {
              x: comboBox1.centerX,
              y: comboBox1.centerY,
              fill: '#f00',
              r: 5
            }
          });

        });
      })
    }
  });
  return <div ref={container}></div>;
};

export default DragCombo;
