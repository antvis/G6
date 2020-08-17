import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const NodeAmount = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 1000,
        defaultNode: {
          size: 20,
          style: {
            fill: '#D8DEEB',
            stroke: '#B2BDD6',
            lineWidth: 2,
          },
        },
        nodeStateStyles: {
          // hover: {
          //   fill: '#83AFFD',
          //   stroke: '#5B8FF9',
          // },
          select: {
            fill: '#83AFFD',
            stroke: '#5B8FF9',
          },
        },
        modes: {
          default: ['drag-canvas', 'drag-node'],
        },
      });
    }

    let nodes = [];
    for (let i = 0; i < 1000; i++) {
      nodes.push({
        id: `node-${i}`,
        label: `${i}`,
        x: Math.random() * 450 + 50,
        y: Math.random() * 450 + 50,
      });
    }
    const data = {
      nodes,
    };

    graph.data(data);
    graph.render();

    graph.on('node:click', (evt) => {
      const { item } = evt;
      graph.setItemState(item, 'select', true);
    });
    graph.on('canvas:click', () => {
      graph.getNodes().forEach((node) => {
        graph.setItemState(node, 'select', false);
      });
    });

    // graph.on('node:mouseenter', evt => {
    //   const { item } = evt
    //   graph.setItemState(item, 'hover', true)
    // })

    // graph.on('node:mouseleave', evt => {
    //   const { item } = evt
    //   graph.setItemState(item, 'hover', false)
    // })
  });
  return <div ref={container}></div>;
};

export default NodeAmount;
