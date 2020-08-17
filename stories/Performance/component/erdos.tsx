import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const Erdos = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      const graphSize = 800;
      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: graphSize,
        height: graphSize,
        // layout: {
        //   type: 'force',
        //   nodeStrength: -10
        // },
        defaultNode: {
          size: 2,
          style: {
            fill: '#C6E5FF',
            stroke: '#5B8FF9',
            lineWidth: 0.3,
          },
          labelCfg: {
            style: {
              fontSize: 3,
            },
            position: 'right',
            offset: 1,
          },
        },
        defaultEdge: {
          size: 0.1,
          color: '#333',
        },
        nodeStateStyles: {
          hover: {
            lineWidth: 2,
            stroke: '#333',
            fill: 'steelblue',
            r: 6,
          },
        },
        modes: {
          default: ['zoom-canvas', 'drag-canvas', 'drag-node'],
        },
      });

      // fetch('https://gw.alipayobjects.com/os/basement_prod/e5a5f1c5-c5aa-4f9c-9769-d67a03915478.json')
      fetch(
        'https://gw.alipayobjects.com/os/basement_prod/9e119b99-2580-43be-a8db-f55bb682c881.json',
      )
        .then((res) => res.json())
        .then((data) => {
          data.nodes.forEach((node) => {
            node.label = undefined;
            node.size = undefined;
          });
          graph.data(data);
          graph.render();

          /* normalize */
          let cx = 0,
            cy = 0;
          let minX = Infinity,
            maxX = -Infinity,
            minY = Infinity,
            maxY = -Infinity;
          data.nodes.forEach((node) => {
            cx += node.x;
            cy += node.y;
            if (minX > node.x) minX = node.x;
            if (minY > node.y) minY = node.y;
            if (maxX < node.x) maxX = node.x;
            if (maxY < node.y) maxY = node.y;
          });
          const scale = maxX - minX > maxY - minY ? maxX - minX : maxY - minY;
          cx /= data.nodes.length;
          cy /= data.nodes.length;
          data.nodes.forEach((node) => {
            node.x -= cx;
            node.y -= cy;
            node.x = (graphSize * node.x) / scale + graphSize / 2;
            node.y = (graphSize * node.y) / scale + graphSize / 2;
          });
          graph.positionsAnimate();
          console.log(data.nodes.length, data.edges.length);
        });
      graph.on('node:click', (evt) => {
        const { item } = evt;
        item.toFront();
        graph.setItemState(item, 'hover', true);
      });
    }

    // graph.on('node:mouseleave', evt => {
    //   const { item } = evt
    //   graph.setItemState(item, 'hover', false)
    // })
  });
  return <div ref={container}></div>;
};

export default Erdos;
