import React, { useEffect } from 'react';
import G6, { Algorithm } from '../../../src';
const { getPageRank } = Algorithm;

const data = {
  nodes: [
    {
      id: 'A',
      label: 'A',
    },
    {
      id: 'B',
      label: 'B',
    },
    {
      id: 'C',
      label: 'C',
    },
    {
      id: 'D',
      label: 'D',
    },
    {
      id: 'E',
      label: 'E',
    },
    {
      id: 'F',
      label: 'F',
    },
    {
      id: 'G',
      label: 'G',
    },
    {
      id: 'H',
      label: 'H',
    },
    {
      id: 'I',
      label: 'I',
    },
    {
      id: 'J',
      label: 'J',
    },
    {
      id: 'K',
      label: 'K',
    }
  ],
  edges: [
    {
      source: 'D',
      target: 'A',
    },
    {
      source: 'D',
      target: 'B',
    },
    {
      source: 'B',
      target: 'C',
    },
    {
      source: 'C',
      target: 'B',
    },
    {
      source: 'F',
      target: 'B',
    },
    {
      source: 'F',
      target: 'E',
    },
    {
      source: 'E',
      target: 'F',
    },
    {
      source: 'E',
      target: 'D',
    },
    {
      source: 'E',
      target: 'B',
    },
    {
      source: 'K',
      target: 'E',
    },
    {
      source: 'J',
      target: 'E',
    },
    {
      source: 'I',
      target: 'E',
    },
    {
      source: 'H',
      target: 'E',
    },
    {
      source: 'G',
      target: 'E',
    },
    {
      source: 'G',
      target: 'B',
    },
    {
      source: 'H',
      target: 'B',
    },
    {
      source: 'I',
      target: 'B',
    },
  ],
};

const PageRank = () => {
  const container = React.useRef();
  useEffect(() => {
    const graph = new G6.Graph({
      container: container.current,
      width: 500,
      height: 500,
      modes: {
        default: ['zoom-canvas', 'drag-canvas', 'drag-node'],
      },
      defaultEdge: {
        style: {
          endArrow: true,
        },
      },
      layout: {
        type: 'force',
        preventOverlap: true,
      }
    });

    graph.data(data);
    graph.render();

    const result = getPageRank(graph);
    data.nodes.forEach((node => {
      node['size'] = result[node.id] * 100 + 10
    }))
    graph.changeData(data)
  });

  return <div ref={container}></div>;
};

export default PageRank;
