import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const data = {
  nodes: [
    {
      id: 'node1',
      x: 150,
      y: 50,
      label: 'node1',
    },
    {
      id: 'node2',
      x: 200,
      y: 150,
      label: 'node2',
    },
    {
      id: 'node3',
      x: 100,
      y: 150,
      label: 'node3',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
    {
      source: 'node2',
      target: 'node3',
    },
    {
      source: 'node3',
      target: 'node1',
    },
  ],
};

const LassoSelect = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        modes: {
          default: [
            'drag-node',
            'zoom-canvas',
            {
              type: 'lasso-select',
              // trigger: 'drag',
              delegateStyle: {
                fill: 'pink',
                stroke: 'red',
                opacity: 0.2,
                lineWidth: 1,
              },
            },
          ],
        },
        nodeStateStyles: {
          selected: {
            stroke: 'red',
          },
        },
        edgeStateStyles: {
          selected: {
            stroke: 'red',
          },
        },
      });
      graph.data(data);
      graph.render();

      // graph.on('nodeselectchange', e => {
      //   console.log(e);
      // })
    }
  });
  return <div ref={container}></div>;
};

export default LassoSelect;
