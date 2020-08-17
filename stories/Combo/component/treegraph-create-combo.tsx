import React, { useEffect } from 'react';
import G6 from '../../../src';
import { ITreeGraph } from '../../../src/interface/graph';
import { GraphData } from '../../../src/types';

let graph: ITreeGraph = null;

const data = {
  id: 'A',
  label: '开始',
  children: [
    {
      id: 'A1',
      label: '节点1',
      children: [
        { id: 'A11', label: 'A11' },
        { id: 'A12', label: 'A12' },
        { id: 'A13', label: 'A13' },
        { id: 'A14', label: 'A14' },
      ],
    },
  ],
};

const TreeGraphCreateCombo = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      graph = new G6.TreeGraph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 400,
        groupByTypes: false,
        fitView: true,
        defaultNode: {
          type: 'rect',
          size: [25, 10],
          style: {
            fill: 'pink',
            lineWidth: 0,
          },
          labelCfg: {
            style: {
              fontSize: 6,
            },
          },
        },
        layout: {
          type: 'dendrogram',
          direction: 'LR',
          nodeSep: 30,
          rankSep: 60,
        },
        defaultEdge: {
          type: 'polyline',
          style: {
            lineWidth: 1,
            offset: 17.5,
            endArrow: {
              path: G6.Arrow.triangle(3, 5, 1),
              d: 1,
            },
          },
        },
        modes: {
          default: [
            'drag-canvas',
            {
              type: 'collapse-expand',
            },
            'zoom-canvas',
          ],
        },
      });
      graph.data(data);
      graph.render();
      graph.createCombo(
        {
          id: 'combo1',
          type: 'rect',
          padding: [5, 5, 5, 5],
        },
        ['A11', 'A12', 'A13'],
      );
    }
  });
  return <div ref={container}></div>;
};

export default TreeGraphCreateCombo;
