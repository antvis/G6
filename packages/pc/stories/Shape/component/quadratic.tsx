import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const data = {
  nodes: [
    {
      id: '1',
      name: 'name1',
      x: 100,
      y: 110,
    },
    {
      id: '2',
      name: 'name2',
      x: 400,
      y: 110,
    },
    {
      id: '3',
      name: 'name3',
      x: 210,
      y: 400,
    },
  ],
  edges: [
    {
      source: '1',
      target: '2',
      type: 'polyline',
      curveOffset: -150,
      curvePosition: 0.5,
      style: {
        endArrow: {
          path: G6.Arrow.triangle(5, 15, 0)
        }
      }
    },
    {
      source: '1',
      target: '3',
      style: {
        endArrow: {
          path: G6.Arrow.triangle(5, 15, 0)
        }
      }
    },
  ],
};
const Quadratic = () => {
  const container = React.useRef();

  useEffect(() => {
    if (!graph) {
      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 800,
        // layout: {
        //   type: "dagre",
        //   rankdir: "TB",
        //   align: "UL",
        //   nodesep: 25,
        //   ranksep: 50,
        //   controlPoints: true
        // },
        defaultEdge: {
          type: 'cubic-horizontal',
          // curveOffset: [-50, 50],
          // curvePosition: [9 / 10, 1 / 10]
          // curveOffset: 100,
          curvePosition: 0.9,
        },
        modes: {
          default: ['drag-node'],
        },
      });
      graph.data(data);
      graph.render();

      graph.on('canvas:click', e => {
        const edge = graph.getEdges()[0];
        const keyShape = edge.getKeyShape();
        // keyShape.attr('endArrow', { path: '' });
        // keyShape.attr('stroke', '#f00');
        graph.updateItem(graph.getEdges()[1], {
          style: {
            endArrow: false,
            stroke: '#f00'
          },
        });
        // console.log(graph.getEdges()[0])
      });

      graph.on('edge:click', e => {

        graph.updateItem(graph.getEdges()[1], {
          style: {
            endArrow: {
              path: G6.Arrow.triangle(15, 15, 0)
            },
            stroke: '#0f0'
          },
        });
      });
    }
  });

  return <div ref={container}></div>;
};

export default Quadratic;
