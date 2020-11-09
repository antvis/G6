import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import { GraphData } from '../../../src/types';
import { ICombo } from '../../../src/interface/item';

let graph: IGraph = null;

const data: GraphData = {
  nodes: [
    {
      id: '1',
      comboId: '分组1',
      x: 100,
      y: 100,
    },
    {
      id: '2',
      comboId: '分组1',
      x: 200,
      y: 100,
    },
    {
      id: '4',
      comboId: '分组2',
      x: 400,
      y: 150,
    },
  ],
  edges: [
    {
      source: '分组1',
      target: '分组2',
    },
  ],
  combos: [
    {
      id: '分组1',
      label: '分组1',
      // collapsed: true
    },
    {
      id: '分组2',
      label: '分组2',
      //collapsed: true,
    },
    {
      id: '分组3',
      label: '分组3',
      x: 100,
      y: 300,
      //collapsed: true,
    },
  ],
};

const data2: GraphData = {
  nodes: [
    {
      id: '1',
      comboId: '分组1',
      x: 100,
      y: 100,
    },
    {
      id: '2',
      comboId: '分组2',
      x: 200,
      y: 100,
    },
    {
      id: '4',
      comboId: '分组2',
      x: 400,
      y: 150,
    },
  ],
  edges: [
    {
      source: '分组1',
      target: '分组2',
    },
  ],
  combos: [
    {
      id: '分组1',
      label: '分组1',
    },
    {
      id: '分组2',
      label: '分组2',
      //collapsed: true,
    },
  ],
};
const Edges2 = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 800,
        groupByTypes: false,
        defaultEdge: {
          type: 'line',
          style: {
            endArrow: true,
          },
        },
        defaultCombo: {
          type: 'rect',
          size: [50, 60], // The minimum size of the Combo
          padding: [20, 10, 10, 20],
          // padding: [0, 0, 0, 0],
          style: {
            lineWidth: 3,
            opacity: 0.1,
          },
          // anchorPoints: [
          //     [0.5, 1],
          //     [0.5, 0],
          // ],
          labelCfg: {
            refY: 10,
            refX: 20,
            position: 'top',
          },
        },
        modes: {
          default: [
            'drag-canvas',
            'drag-node',
            {
              type: 'drag-combo',
              // enableDelegate: true //拖动时禁止合并
            },
          ],
        },
      });
      graph.data(data);
      graph.render();
      graph.on('combo:click', function (e) {
        graph.collapseExpandCombo(e.item as ICombo);
        graph.refreshPositions();
      });

      graph.on('canvas:click', (e) => {
        // graph.addItem('edge', {
        //     source: '分组1',
        //     target: '分组2',
        // });
        // graph.updateCombos();
        // graph.changeData(data2);
        graph.getEdges()[0].refresh();
      });
    }
  });
  return <div ref={container}></div>;
};

export default Edges2;
