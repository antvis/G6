import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import { GraphData } from '../../../src/types';
import { ICombo } from '../../../src/interface/item';

let graph: IGraph = null;

const data: GraphData = {
  nodes: [
    {
      id: '0',
      label: 'node11',
      comboId: '分组1',
    },
    {
      id: '1',
      label: 'node12',
      comboId: '分组1',
    },
    {
      id: '2',
      label: 'node21',
      comboId: '分组2',
    },
    /*{
      id: '3',
      comboId: '分组2',
      label: 'node22',
    },*/
    {
      id: '4',
      comboId: '分组2',
      label: 'node23',
    },
    {
      id: '5',
      comboId: '分组2',
      label: 'node24',
    },
    {
      id: '6',
      label: 'node31',
      comboId: '分组3',
    },
    {
      id: '7',
      label: 'node32',
      comboId: '分组3',
    },
    {
      id: '8',
      label: 'node41',
      comboId: '分组4',
    },
    {
      id: '9',
      label: 'node42',
      comboId: '分组4',
    },
    /* {
       id: '10',
       label: 'node51',
       comboId: '分组5',
     },
     {
       id: '11',
       label: 'node52',
       comboId: '分组5',
     },*/
    {
      id: '12',
      label: 'node53',
      comboId: '分组5',
    },
    /*{
      id: '13',
      label: 'node54',
      comboId: '分组5',
    },
    {
      id: '14',
      label: 'node55',
      comboId: '分组5',
    },*/
    {
      id: '15',
      label: 'node56',
      comboId: '分组5',
    },
    {
      id: '16',
      label: 'node57',
      comboId: '分组5',
    },
    {
      id: '17',
      label: 'node58',
      comboId: '分组5',
    },
    {
      id: '18',
      label: 'node59',
      comboId: '分组5',
    },
    {
      id: '19',
      label: 'node510',
      comboId: '分组5',
    },
  ],
  edges: [
    {
      source: '13',
      target: '10',
    },
    {
      source: '6',
      target: '2',
    },
    {
      source: '7',
      target: '4',
    },
    {
      source: '12',
      target: '17',
    },
    {
      source: '6',
      target: '4',
    },
    {
      source: '0',
      target: '7',
    },
    {
      source: '6',
      target: '15',
    },
    {
      source: '7',
      target: '9',
    },
    {
      id: '8',
      source: '12',
      target: '16',
    },
    {
      source: '15',
      target: '19',
    },
    {
      source: '12',
      target: '16',
    },
    {
      source: '6',
      target: '8',
    },
    {
      source: '0',
      target: '6',
    },
    {
      source: '15',
      target: '18',
    },
    {
      source: '15',
      target: '19',
    },
    {
      source: '7',
      target: '5',
    },
    {
      source: '7',
      target: '12',
    },
    {
      source: '15',
      target: '17',
    },
  ],
  combos: [
    {
      id: '分组1',
      label: '分组1',
      parentId: null,
      collapsed: true,
    },
    {
      id: '分组2',
      label: '分组2',
      parentId: null,
      collapsed: true,
    },
    {
      id: '分组3',
      label: '分组3',
      parentId: null,
      collapsed: true,
    },
    {
      id: '分组4',
      label: '分组4',
      parentId: null,
      collapsed: true,
    },
    {
      id: '分组5',
      label: '分组5',
      parentId: null,
      collapsed: true,
    },
  ],
};
const DagreCombo = () => {
  const container = React.useRef();

  useEffect(() => {
    if (!graph) {
      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 800,
        groupByTypes: false,
        modes: {
          default: [
            'drag-canvas',
            'drag-node',
            {
              type: 'drag-combo',
              enableDelegate: false, //拖动时禁止合并
            },
          ],
        },
        defaultCombo: {
          type: 'rect',
          size: [150, 60], // The minimum size of the Combo
          padding: [20, 10, 10, 20],
          anchorPoints: [
            [0.5, 0],
            [0.5, 1],
          ],
          style: {
            lineWidth: 3,
          },
          labelCfg: {
            refY: 10,
            refX: 20,
            position: 'top',
          },
        },
        defaultNode: {
          anchorPoints: [
            [0.5, 1],
            [0.5, 0],
          ],
          type: 'rect',
          style: {
            stroke: '#5B8FF9',
            lineWidth: 3,
          },
        },
        defaultEdge: {
          type: 'arc',
          curveOffset: 10,
          style: {
            stroke: '#A3B1BF',
            lineAppendWidth: 1,
            endArrow: true, //有终点箭头
          },
        },
        nodeStateStyles: {
          highlight: {
            opacity: 1,
          },
          dark: {
            opacity: 0.2,
          },
          selected: {
            stroke: '#666',
            lineWidth: 2,
            fill: 'steelblue',
          },
        },
        edgeStateStyles: {
          active: {
            stroke: '#999',
            lineWidth: 3,
          },
          inactive: {
            lineWidth: 1,
          },
          highlight: {
            stroke: '#999',
            lineWidth: 3,
          },
        },
        layout: {
          type: 'dagre',
          direction: 'TB', //控制方向：垂直还是水平方向
          getId: function getId(d) {
            return d.id;
          },
          getHeight: function getHeight() {
            return 160;
          },
          getWidth: function getWidth() {
            return 16;
          },
          getVGap: function getVGap() {
            return 80;
          },
          getHGap: function getHGap() {
            return 20;
          },
        },
      });
      graph.data(data);
      graph.render();

      // setTimeout(() => {
      //   graph.refreshPositions();
      // }, 500);

      graph.on('combo:click', function (e) {
        graph.collapseExpandCombo(e.item as ICombo);
        graph.refreshPositions();
      });

      graph.on('canvas:click', (e) => {
        console.log(graph.getGroup());
      });
    }
  });
  return <div ref={container}></div>;
};

export default DagreCombo;
