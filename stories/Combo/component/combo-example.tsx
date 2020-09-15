import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import { ComboConfig, GraphData } from '../../../src/types';
import { IGroup } from '@antv/g-base/lib/interfaces';

let graph: IGraph = null;

G6.registerCombo(
  'custom-combo',
  {
    draw: (cfg, group) => {
      const style = cfg.style || {};
      const keyShape = group.addShape('circle', {
        attrs: style,
        className: 'circle-combo',
        name: 'circle-combo',
        draggable: true,
      });
      group.addShape('marker', {
        attrs: {
          x: 0, //keyShape.attr('r') + 5,
          y: 0,
          r: 5,
          stroke: 'blue',
          symbol: 'triangle-down',
        },
        name: 'marker-shape',
      });
      return keyShape;
    },
    update: (cfg, item) => {
      const group = item.get('group');
      if (cfg.markerStyle) {
        const marker = group.find((ele) => ele.get('name') === 'marker-shape');
        marker.attr(cfg.markerStyle);
      }
      const keyShape = group.get('children')[0];
      keyShape.attr(cfg.style);
    },
  },
  'circle-combo',
);

const data: GraphData = {
  nodes: [
    {
      id: 'node1',
      x: 150,
      y: 150,
      label: 'node1',
      comboId: 'A',
    },
    {
      id: 'node2',
      x: 200,
      y: 250,
      label: 'node2',
      comboId: 'B',
    },
    {
      id: 'node3',
      x: 100,
      y: 250,
      label: 'node3',
    },
    {
      id: 'node4',
      x: 50,
      y: 50,
      label: 'node4',
      comboId: 'D',
    },
    {
      id: 'node5',
      x: 100,
      y: 100,
      label: 'node5',
      comboId: 'E',
    },
    {
      id: 'node6',
      x: 500,
      y: 200,
      label: 'node6',
    },
    {
      id: 'node7',
      x: 600,
      y: 200,
      label: 'node7',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
    {
      source: 'node2',
      target: 'node3',
    },
    {
      source: 'node3',
      target: 'node1',
    },
    {
      source: 'A',
      target: 'D',
    },
  ],
  combos: [
    {
      id: 'A',
      parentId: 'B',
      label: 'gorup A',
      padding: [50, 30, 10, 10],
      type: 'rect',
      style: {
        stroke: 'red',
        fill: 'green',
      },
    },
    {
      id: 'B',
      label: 'gorup B',
      padding: [50, 10, 10, 50],
      // type: 'custom-combo'
    },
    {
      id: 'D',
      label: 'gorup D',
      parentId: 'E',
    },
    {
      id: 'E',
    },
    {
      id: 'FF',
      label: '空分组',
      type: 'custom-combo',
      style: {
        stroke: 'green',
        lineWidth: 3,
      },
    },
  ],
};

const DefaultCombo = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 800,
        groupByTypes: false,
        modes: {
          default: ['drag-canvas', 'drag-combo', 'drag-node', 'collapse-expand-combo'],
        },
        defaultCombo: {
          // size: [100, 100],
          type: 'circle',
          style: {
            fill: '#ccc',
            opacity: 0.9,
          },
        },
        comboStateStyles: {
          selected: {
            'text-shape': {
              fill: '#f00',
              fontSize: 20,
            },
            fill: '#f00',
          },
          state2: {
            stroke: '#0f0',
          },
        },
        defaultEdge: {
          style: {
            stroke: '#f00',
            lineWidth: 3,
          },
        },
      });
    }
    graph.data(data);
    graph.render();
    let selected = false;
    graph.on('node:click', (e) => {
      graph.hideItem(e.item);
    });
    graph.on('combo:click', (e) => {});
    // graph.on('canvas:click', e => {
    //   // graph.setItemState(graph.findById('A'), 'selected', true);
    //   // console.log( graph.findAllByState('combo', 'selected'))
    //   const hidedCombos = graph.findAll('combo', combo => {
    //     if (!combo.isVisible()) return true;
    //     return false;
    //   });
    //   hidedCombos.forEach(combo => {
    //     graph.showItem(combo);
    //   })

    //   graph.updateComboTree('A', 'M');
    // });
  });

  const handleCreateCombo = () => {
    graph.createCombo(
      {
        id: 'newCombo',
        label: 'newCombo',
        type: 'rect',
      } as ComboConfig,
      ['node6', 'node7'],
    );
  };

  const handleUnCombo = () => {
    graph.uncombo('newCombo');
  };
  return (
    <div ref={container}>
      <button onClick={handleCreateCombo}>成组</button>
      <button onClick={handleUnCombo}>拆组</button>
    </div>
  );
};

export default DefaultCombo;
