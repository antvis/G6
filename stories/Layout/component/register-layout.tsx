import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

const data = {
  nodes: [
    {
      id: '0',
      label: 'A',
      cluster: 'part1',
    },
    {
      id: '1',
      label: 'B',
      cluster: 'part1',
    },
    {
      id: '2',
      label: 'C',
      cluster: 'part1',
    },
    {
      id: '3',
      label: 'D',
      cluster: 'part1',
    },
    {
      id: '4',
      label: 'E',
      cluster: 'part1',
    },
    {
      id: '5',
      label: 'F',
      cluster: 'part1',
    },
    {
      id: '6',
      label: 'a',
      cluster: 'part2',
    },
    {
      id: '7',
      label: 'b',
      cluster: 'part2',
    },
    {
      id: '8',
      label: 'c',
      cluster: 'part2',
    },
    {
      id: '9',
      label: 'd',
      cluster: 'part2',
    },
  ],
  edges: [
    {
      source: '0',
      target: '6',
    },
    {
      source: '0',
      target: '7',
    },
    {
      source: '0',
      target: '9',
    },
    {
      source: '1',
      target: '6',
    },
    {
      source: '1',
      target: '9',
    },
    {
      source: '1',
      target: '7',
    },
    {
      source: '2',
      target: '8',
    },
    {
      source: '2',
      target: '9',
    },
    {
      source: '2',
      target: '6',
    },
    {
      source: '3',
      target: '8',
    },
    {
      source: '4',
      target: '6',
    },
    {
      source: '4',
      target: '7',
    },
    {
      source: '5',
      target: '9',
    },
  ],
};

let graph: IGraph = null;

const RegisterLayout = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      G6.registerLayout('bigraph-layout', {
        execute() {
          const self = this;
          const center = self.center || [0, 0];
          const biSep = self.biSep || 100;
          const nodeSep = self.nodeSep || 20;
          const nodeSize = self.nodeSize || 20;
          const direction = self.direction || 'horizontal';
          let part1Pos = 0,
            part2Pos = 0;
          if (direction === 'horizontal') {
            part1Pos = center[0] - biSep / 2;
            part2Pos = center[0] + biSep / 2;
          }
          const nodes = self.nodes;
          const edges = self.edges;
          const part1Nodes = [];
          const part2Nodes = [];
          const part1NodeMap = new Map();
          const part2NodeMap = new Map();
          // separate the nodes and init the positions
          nodes.forEach(function (node, i) {
            if (node.cluster === 'part1') {
              part1Nodes.push(node);
              part1NodeMap.set(node.id, i);
            } else {
              part2Nodes.push(node);
              part2NodeMap.set(node.id, i);
            }
          });

          // order the part1 node
          part1Nodes.forEach(function (p1n) {
            let index = 0;
            let adjCount = 0;
            edges.forEach(function (edge) {
              const sourceId = edge.source;
              const targetId = edge.target;
              if (sourceId === p1n.id) {
                index += part2NodeMap.get(targetId);
                adjCount++;
              } else if (targetId === p1n.id) {
                index += part2NodeMap.get(sourceId);
                adjCount++;
              }
            });
            index /= adjCount;
            p1n.index = index;
          });
          part1Nodes.sort(function (a, b) {
            return a.index - b.index;
          });
          part2Nodes.forEach(function (p2n) {
            let index = 0;
            let adjCount = 0;
            edges.forEach(function (edge) {
              const sourceId = edge.source;
              const targetId = edge.target;
              if (sourceId === p2n.id) {
                index += part1NodeMap.get(targetId);
                adjCount++;
              } else if (targetId === p2n.id) {
                index += part1NodeMap.get(sourceId);
                adjCount++;
              }
            });
            index /= adjCount;
            p2n.index = index;
          });
          part2Nodes.sort(function (a, b) {
            return a.index - b.index;
          });

          // place the nodes
          const hLength =
            part1Nodes.length > part2Nodes.length ? part1Nodes.length : part2Nodes.length;
          const height = hLength * (nodeSep + nodeSize);
          let begin = center[1] - height / 2;
          if (direction === 'vertical') {
            begin = center[0] - height / 2;
          }
          part1Nodes.forEach(function (p1n, i) {
            if (direction === 'horizontal') {
              p1n.x = part1Pos;
              p1n.y = begin + i * (nodeSep + nodeSize);
            } else {
              p1n.x = begin + i * (nodeSep + nodeSize);
              p1n.y = part1Pos;
            }
          });
          part2Nodes.forEach(function (p2n, i) {
            if (direction === 'horizontal') {
              p2n.x = part2Pos;
              p2n.y = begin + i * (nodeSep + nodeSize);
            } else {
              p2n.x = begin + i * (nodeSep + nodeSize);
              p2n.y = part2Pos;
            }
          });
        },
      });

      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 1000,
        layout: {
          type: 'bigraph-layout',
          biSep: 300,
          nodeSep: 20,
          nodeSize: 20,
        },
        animate: true,
        defaultNode: {
          size: 20,
          style: {
            fill: '#C6E5FF',
            stroke: '#5B8FF9',
          },
        },
        defaultEdge: {
          size: 1,
          color: '#e2e2e2',
        },
        modes: {
          default: ['drag-canvas', 'drag-node'],
        },
      });
      graph.data(data);
      graph.render();
    }
  });
  return <div ref={container}></div>;
};

export default RegisterLayout;
