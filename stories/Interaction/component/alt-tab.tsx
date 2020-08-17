import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const data = {
  nodes: [
    {
      id: '1',
      label: 'node1',
    },
    {
      id: '2',
      label: 'node2',
    },
    {
      id: '3',
      label: 'node3',
    },
    {
      id: '4',
      label: 'node4',
    },
    {
      id: '5',
      label: 'node5',
    },
    {
      id: '6',
      label: 'node6',
    },
    {
      id: '7',
      label: 'node7',
    },
    {
      id: '8',
      label: 'node8',
    },
    {
      id: '9',
      label: 'node9',
    },
    {
      id: '10',
      label: 'node10',
    },
    {
      id: '11',
      label: 'node11',
    },
  ],
  edges: [
    {
      source: '9RQmLGueOikkikLvHVO',
      target: 'I2Msu7qhDMQPmGLOduP',
    },
    {
      source: 'k79zNA0TkCwQPQWw4yn',
      target: 'GxZeEGkky88xKxq1r22',
    },
    {
      source: 'I2Msu7qhDMQPmGLOduP',
      target: 'k79zNA0TkCwQPQWw4yn',
    },
    {
      source: 'QUCo43VpL9LaPT4QVx0',
      target: 'k79zNA0TkCwQPQWw4yn',
    },
    {
      source: 'GxZeEGkky88xKxq1r22',
      target: 'xCzXirgILRm9fF7gjeb',
    },
    {
      source: 'xCzXirgILRm9fF7gjeb',
      target: 'cd_638e7750847a4cc78f3cd',
    },
    {
      source: 'xCzXirgILRm9fF7gjeb',
      target: 'cd_8119cb085435454180558',
    },
    {
      source: 'AKl8iaVQamqiMaMCF7E',
      target: 'xCzXirgILRm9fF7gjeb',
    },
    {
      source: 'GxZeEGkky88xKxq1r22',
      target: 'GWMF0chbHRKDkENg1hS',
    },
    {
      source: 'GWMF0chbHRKDkENg1hS',
      target: 'AoJc4qPcWeOL7NJwOh6',
    },
  ],
};

const AltTab = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1580,
        height: 1080,
        defaultNode: {
          type: 'circle',
          size: 50,
          anchorPoints: [
            [0, 0.5],
            [1, 0.5],
          ],
        },
        defaultEdge: {
          type: 'cubic-horizontal',
        },
        layout: {
          type: 'dagre',
          rankdir: 'LR',
          controlPoints: true,
        },
        modes: {
          default: [
            'drag-canvas',
            {
              type: 'brush-select',
              trigger: 'shift',
            },
            {
              type: 'zoom-canvas',
              minZoom: 0.5,
              maxZoom: 2,
            },
          ],
        },
        nodeStateStyles: {
          selected: {
            fill: 'red',
          },
        },
        animate: true,
      });
      graph.data(data);
      graph.render();
    }
  });
  return <div ref={container}></div>;
};

export default AltTab;
