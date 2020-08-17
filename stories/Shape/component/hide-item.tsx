import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

// TODO issue #1483
let graph: IGraph = null;
let data = {
  nodes: [
    {
      id: '30',
      type: 'image',
      label: '30',
      cluster: 'd',
    },
    {
      id: '38',
      label: '38',
      type: 'image',
      cluster: 'd',
    },
    {
      id: '39',
      label: '39',
      cluster: 'd',
    },
    {
      id: '37',
      label: '37',
      cluster: 'd',
    },
  ],
  edges: [
    {
      id: '30-37',
      source: '30',
      target: '37',
      cluser: 'b',
      type: 'arc',
      curveOffset: 100,
    },
    {
      id: '30-38',
      source: '30',
      target: '38',
      cluser: 'c',
      type: 'arc',
    },
    {
      id: '30-39',
      source: '30',
      target: '39',
      cluser: 'c',
      type: 'arc',
    },
  ],
};

let newData = {
  nodes: [
    {
      id: '30',
      type: 'image',
      label: '30',
      cluster: 'd',
    },
    {
      id: '38',
      label: '38',
      type: 'image',
      cluster: 'd',
    },
    {
      id: '39',
      label: '39',
      cluster: 'd',
    },
    {
      id: '37',
      label: '37',
      cluster: 'd',
    },
  ],
  edges: [
    {
      id: '30-37',
      source: '30',
      target: '37',
      cluser: 'b',
    },
    {
      id: '30-38',
      source: '30',
      target: '38',
      cluser: 'b',
    },
    {
      id: '30-39',
      source: '30',
      target: '39',
      cluser: 'b',
    },
  ],
};
const HideItem = () => {
  const container = React.useRef();

  useEffect(() => {
    if (!graph) {
      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        modes: {
          default: ['drag-canvas', 'drag-node'],
        },
        animate: true,
        defaultNode: {
          size: 30,
          style: {
            lineWidth: 2,
            stroke: '#5B8FF9',
            fill: '#C6E5FF',
          },
        },
        defaultEdge: {
          size: 1,
          color: '#e2e2e2',
          style: {
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              fill: '#e2e2e2',
            },
          },
        },
      });
      graph.data(data);
      graph.render();
      graph.get('canvas').set('localRefresh', false);

      graph.on('node:click', function (node) {
        graph.changeData(newData);
      });

      graph.on('canvas:click', (node) => {
        graph.getNodes().forEach((item) => {
          if (item.get('id') != '30') {
            graph.hideItem(item);
          }
        });
      });
    }
  });

  return <div ref={container}></div>;
};

export default HideItem;
