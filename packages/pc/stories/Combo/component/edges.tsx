import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import { GraphData } from '../../../src/types';

let graph: IGraph = null;

const data: GraphData = {
  nodes: [
    { id: 'A', label: 'A', comboId: 'outer' },
    { id: 'B', label: 'B', comboId: 'inner' },
    { id: 'C', label: 'C', comboId: 'inner' },
  ],
  edges: [
    {
      source: 'A',
      target: 'B',
    },
    {
      source: 'A',
      target: 'C',
    },
  ],
  combos: [
    {
      id: 'inner',
      label: 'inner',
      parentId: 'outer',
    },
    {
      id: 'outer',
      label: 'outer',
    },
  ],
};

const Edges = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 800,
        groupByTypes: false,
        layout: {
          type: 'dagre',
        },
        defaultNode: {
          type: 'circle',
          size: [25, 25],
        },
        defaultEdge: {
          style: {
            endArrow: true,
            lineDash: [4, 4],
          },
        },
        defaultCombo: {
          type: 'rect',
        },
        modes: {
          default: [{ type: 'collapse-expand-combo' }],
        },
      });
      graph.data(data);
      graph.render();
    }
  });
  return <div ref={container}></div>;
};

export default Edges;
