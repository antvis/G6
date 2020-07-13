import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const data = {
  nodes: [
    {
      id: "1",
      label: "node1"
    },
    {
      id: "2",
      label: "node2"
    },
    {
      id: "3",
      label: "node3"
    },
    {
      id: "4",
      label: "node4"
    },
    {
      id: "5",
      label: "node5"
    },
    {
      id: "6",
      label: "node6"
    },
  ],
  edges: [
    {
      source: "1",
      target: "2",
      label: 'edge'
    },
    {
      source: "1",
      target: "3",
      label: 'edge'
    },
    {
      source: "2",
      target: "3",
      label: 'edge'
    },
    {
      source: "3",
      target: "4",
      label: 'edge'
    },
    {
      source: "5",
      target: "6",
      label: 'edge'
    },
    {
      source: "1",
      target: "5",
      label: 'edge'
    },
  ]
};


const ZoomCanvasFix = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 800,
        height: 500,
        minZoom: 0.001,
        modes: {
          default: [
            'drag-canvas',
            {
              type: 'zoom-canvas',
              fixSelectedItems: {
                fixState: 'selected',
                fixLabel: true,
                fixLineWidth: true
              }
            }]
        },
        defaultEdge: {
          style: {
            lineWidth: 1
          }
        },
        defaultNode: {
          style: {
            lineWidth: 1
          }
        },
        nodeStateStyles: {
          selected: {
            lineWidth: 5,
            stroke: '#f00',
            'text-shape': {
              fontSize: 12
            }
          }
        },
        edgeStateStyles: {
          selected: {
            lineWidth: 5,
            stroke: '#f00',
            'text-shape': {
              fontSize: 12
            }
          }
        }
      });
      graph.data(data);
      graph.render();

      // graph.setItemState(graph.getNodes()[0], 'selected', true);
      // graph.setItemState(graph.getNodes()[1], 'selected', true);
      // graph.setItemState(graph.getEdges()[0], 'selected', true);

      graph.on('node:click', e => {
        const item = e.item;
        graph.setItemState(item, 'selected', true);
      });
      graph.on('edge:click', e => {
        const item = e.item;
        graph.setItemState(item, 'selected', true);
      });

      graph.on('canvas:click', e => {
        graph.findAllByState('node', 'selected').forEach(node => {
          graph.setItemState(node, 'selected', false);
        })
        graph.findAllByState('edge', 'selected').forEach(edge => {
          graph.setItemState(edge, 'selected', false);
        })

      });
    }
  });
  return (
    <div>
      <div ref={container}>
      </div>
    </div>);
};

export default ZoomCanvasFix;
