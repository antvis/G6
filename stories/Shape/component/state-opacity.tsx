import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const data = {
  nodes: [
    {
      id: '1',
      label: 'name1',
      x: 100,
      y: 110,
    },
    {
      id: '2',
      label: 'name2',
      x: 400,
      y: 110,
    },
    {
      id: '3',
      label: 'name3',
      x: 210,
      y: 400,
    },
  ],
  edges: [
    {
      source: '1',
      target: '2',
    },
    {
      source: '1',
      target: '3',
    },
  ],
};
const StateOpacity = () => {
  const container = React.useRef();

  useEffect(() => {
    if (!graph) {
      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 800,
        defaultNode: {
          type: 'rect',
          size: [35, 20],
          style: {
            lineWidth: 1,
            stroke: '#666',
            fill: 'steelblue'
          },
          labelCfg: {
            style: {
              fill: '#fff'
            }
          }
        },
        modes: {
          default: ['drag-node', 'drag-canvas', 'activate-relations'],
        },
        nodeStateStyles: {
          hover: {
            fill: 'lightsteelblue'
          },
          click: {
            stroke: '#000',
            lineWidth: 3
          },
          active: {
            opacity: 1,
            'text-shape': {
              // fill:'red',
              fontSize: 15,
              opacity: 1
            }
          },
          inactive: {
            opacity: 0.2,
            'text-shape': {
              // fill:'red',
              // fontSize:30,
              opacity: 0
            }
          }
        },
      });
      graph.data(data);
      graph.render();
    }
  });

  return <div ref={container}></div>;
};

export default StateOpacity;
