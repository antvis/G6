import React, { useEffect } from 'react';
import G6, { Algorithm } from '../../../src';
const { findAllPath, findShortestPath } = Algorithm;

const data = {
  nodes: [
    {
      id: '0',
      label: '0',
    },
    {
      id: '1',
      label: '1',
    },
    {
      id: '2',
      label: '2',
    },
    {
      id: '3',
      label: '3',
    },
    {
      id: '4',
      label: '4',
    },
    {
      id: '5',
      label: '5',
    },
    {
      id: '6',
      label: '6',
    },
    {
      id: '7',
      label: '7',
    },
    {
      id: '8',
      label: '8',
    },
    {
      id: '9',
      label: '9',
    },
    {
      id: '10',
      label: '10',
    },
    {
      id: '11',
      label: '11',
    },
    {
      id: '12',
      label: '12',
    },
    {
      id: '13',
      label: '13',
    },
    {
      id: '14',
      label: '14',
    },
    {
      id: '15',
      label: '15',
    },
    {
      id: '16',
      label: '16',
    },
    {
      id: '17',
      label: '17',
    },
    {
      id: '18',
      label: '18',
    },
    {
      id: '19',
      label: '19',
    },
    {
      id: '20',
      label: '20',
    },
    {
      id: '21',
      label: '21',
    },
    {
      id: '22',
      label: '22',
    },
    {
      id: '23',
      label: '23',
    },
    {
      id: '24',
      label: '24',
    },
    {
      id: '25',
      label: '25',
    },
    {
      id: '26',
      label: '26',
    },
    {
      id: '27',
      label: '27',
    },
    {
      id: '28',
      label: '28',
    },
    {
      id: '29',
      label: '29',
    },
    {
      id: '30',
      label: '30',
    },
    {
      id: '31',
      label: '31',
    },
    {
      id: '32',
      label: '32',
    },
    {
      id: '33',
      label: '33',
    },
  ],
  edges: [
    {
      source: '0',
      target: '1',
    },
    {
      source: '0',
      target: '2',
    },
    {
      source: '0',
      target: '3',
    },
    {
      source: '0',
      target: '4',
    },
    {
      source: '0',
      target: '5',
    },
    {
      source: '0',
      target: '7',
    },
    {
      source: '0',
      target: '8',
    },
    {
      source: '0',
      target: '9',
    },
    {
      source: '0',
      target: '10',
    },
    {
      source: '0',
      target: '11',
    },
    {
      source: '0',
      target: '13',
    },
    {
      source: '0',
      target: '14',
    },
    {
      source: '0',
      target: '15',
    },
    {
      source: '0',
      target: '16',
    },
    {
      source: '2',
      target: '3',
    },
    {
      source: '4',
      target: '5',
    },
    {
      source: '4',
      target: '6',
    },
    {
      source: '5',
      target: '6',
    },
    {
      source: '7',
      target: '13',
    },
    {
      source: '8',
      target: '14',
    },
    {
      source: '9',
      target: '10',
    },
    {
      source: '10',
      target: '22',
    },
    {
      source: '10',
      target: '14',
    },
    {
      source: '10',
      target: '12',
    },
    {
      source: '10',
      target: '24',
    },
    {
      source: '10',
      target: '21',
    },
    {
      source: '10',
      target: '20',
    },
    {
      source: '11',
      target: '24',
    },
    {
      source: '11',
      target: '22',
    },
    {
      source: '11',
      target: '14',
    },
    {
      source: '12',
      target: '13',
    },
    {
      source: '16',
      target: '17',
    },
    {
      source: '16',
      target: '18',
    },
    {
      source: '16',
      target: '21',
    },
    {
      source: '16',
      target: '22',
    },
    {
      source: '17',
      target: '18',
    },
    {
      source: '17',
      target: '20',
    },
    {
      source: '18',
      target: '19',
    },
    {
      source: '19',
      target: '20',
    },
    {
      source: '19',
      target: '33',
    },
    {
      source: '19',
      target: '22',
    },
    {
      source: '19',
      target: '23',
    },
    {
      source: '20',
      target: '21',
    },
    {
      source: '21',
      target: '22',
    },
    {
      source: '22',
      target: '24',
    },
    {
      source: '22',
      target: '25',
    },
    {
      source: '22',
      target: '26',
    },
    {
      source: '22',
      target: '23',
    },
    {
      source: '22',
      target: '28',
    },
    {
      source: '22',
      target: '30',
    },
    {
      source: '22',
      target: '31',
    },
    {
      source: '22',
      target: '32',
    },
    {
      source: '22',
      target: '33',
    },
    {
      source: '23',
      target: '28',
    },
    {
      source: '23',
      target: '27',
    },
    {
      source: '23',
      target: '29',
    },
    {
      source: '23',
      target: '30',
    },
    {
      source: '23',
      target: '31',
    },
    {
      source: '23',
      target: '33',
    },
    {
      source: '32',
      target: '33',
    },
  ],
};

const FindPath = () => {
  const container = React.useRef();
  useEffect(() => {
    let sourceNode, targetNode, operation;
    const contextMenu = new G6.Menu({
      getContent(graph) {
        console.log('graph', graph);
        return `<div>
          <div title='all'>所有路径</div>
          <div title='short'>最短路径</div>
        </div>`;
      },
      handleMenuClick: (target, item) => {
        operation = target.title;
        sourceNode = item;
      },
      offsetX: 0,
      offsetY: 0,
      itemTypes: ['node', 'edge'],
    });

    const graph = new G6.Graph({
      container: container.current,
      width: 500,
      height: 500,
      plugins: [contextMenu],
      defaultEdge: {
        style: {
          endArrow: true,
        },
      },
      edgeStateStyles: {
        isPath: {
          stroke: 'orange',
          strokeOpacity: 0.4,
          lineWidth: 3,
        },
        highlight: {
          stroke: 'lightgreen',
          strokeOpacity: 0.6,
          lineWidth: 4,
        },
      },
      modes: {
        default: ['zoom-canvas', 'drag-canvas', 'drag-node'],
      },
    });

    graph.data(data);
    graph.render();

    graph.on('node:click', (e) => {
      graph.getEdges().forEach((edge) => {
        graph.clearItemStates(edge);
      });
      if (sourceNode && operation === 'all') {
        targetNode = e.item;
        const allPaths = findAllPath(graph, sourceNode, targetNode, true);
        allPaths.forEach((path) => {
          for (let i = 0; i < path.length - 1; i++) {
            const start = path[i];
            const end = path[i + 1];
            graph.getEdges().forEach((edge) => {
              if (edge.getSource().get('id') === start && edge.getTarget().get('id') === end) {
                graph.setItemState(edge, 'isPath', true);
              }
            });
          }
        });
        sourceNode = null;
        targetNode = null;
      }
      if (sourceNode && operation === 'short') {
        targetNode = e.item;
        const { length, path } = findShortestPath(graph, sourceNode, targetNode, true);
        for (let i = 0; i < path.length - 1; i++) {
          const start = path[i];
          const end = path[i + 1];
          graph.getEdges().forEach((edge) => {
            if (edge.getSource().get('id') === start && edge.getTarget().get('id') === end) {
              graph.setItemState(edge, 'highlight', true);
            }
          });
        }
        sourceNode = null;
        targetNode = null;
      }
    });
  });

  return <div ref={container}></div>;
};

export default FindPath;
