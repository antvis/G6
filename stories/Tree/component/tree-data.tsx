import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import { TreeGraphData } from '../../../src/types';
import { getWrapBehavior } from '@antv/util';

var data = {
  nodes: [
    {
      id: '0',
      label: '节点名称1',
      _row: 1, // 第一层
      _content: '22222222,222人',
      x: 20,
      y: 50,
      anchorPoints: [[1, 0.5]],
      labelCfg: {
        position: 'center',
      },
    },
    {
      id: '1',
      label: '节点名称1',
      _content: '11111111,111人',
      _row: 1,
      x: 170,
      y: 50,
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
      labelCfg: {
        position: 'center',
      },
    },
    {
      id: '1__',
      label: '80%',
      _row: 1,
      x: 170,
      y: 50,
      labelCfg: {
        position: 'center',
      },
      shape: 'nodeLabel',
    },
    {
      id: '1_1',
      label: '节点名称1',
      _row: 2, // 第二层
      x: 170,
      y: 100,
      anchorPoints: [[0, 0.5]],
      labelCfg: {
        position: 'center',
      },
    },
    {
      id: '1_1__',
      label: '70%',
      _row: 2,
      x: 170,
      y: 100,
      labelCfg: {
        position: 'center',
      },
      shape: 'nodeLabel',
    },
    {
      id: '2',
      label: '节点名称1',
      _row: 1,
      x: 320,
      y: 50,
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    {
      id: '2__',
      label: '60%',
      _row: 1,
      x: 320,
      y: 50,
      labelCfg: {
        position: 'center',
      },
      shape: 'nodeLabel',
    },
    {
      id: '2_1',
      label: '节点名称1',
      _row: 2,
      x: 320,
      y: 100,
      anchorPoints: [[0, 0.5]],
    },
    {
      id: '2_1__',
      label: '50%',
      _row: 2,
      x: 320,
      y: 100,
      labelCfg: {
        position: 'center',
      },
      shape: 'nodeLabel',
    },
    {
      id: '3',
      label: '节点名称1',
      _row: 1,
      x: 470,
      y: 50,
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    {
      id: '3__',
      label: '40%',
      _row: 1,
      x: 470,
      y: 50,
      labelCfg: {
        position: 'center',
      },
      shape: 'nodeLabel',
    },
    {
      id: '3_1',
      label: '节点名称',
      _row: 2,
      x: 470,
      y: 100,
      anchorPoints: [[0, 0.5]],
    },
    {
      id: '3_1__',
      label: '30%',
      _row: 2,
      x: 470,
      y: 100,
      labelCfg: {
        position: 'center',
      },
      shape: 'nodeLabel',
    },
  ],
  edges: [
    {
      id: '0-1',
      source: '0',
      target: '1',
      sourceAnchor: 0, // 指定起始的连接点锚点
      targetAnchor: 0, // 指定终止的连接点锚点
    },
    {
      id: '0-1_1',
      source: '0',
      target: '1_1',
      shape: 'hvh',
      sourceAnchor: 1,
      targetAnchor: 0,
    },
    {
      id: '1-2',
      source: '1',
      target: '2',
      sourceAnchor: 1,
      targetAnchor: 0,
    },
    {
      id: '1-2_1',
      source: '1',
      target: '2_1',
      shape: 'hvh',
      sourceAnchor: 1,
      targetAnchor: 0,
    },
    {
      id: '2-3',
      source: '2',
      target: '3',
      sourceAnchor: 1,
      targetAnchor: 0,
    },
    {
      id: '2-3_1',
      source: '2',
      target: '3_1',
      shape: 'hvh',
      sourceAnchor: 1,
      targetAnchor: 0,
    },
  ],
};



;

let graph: IGraph = null;

const TreeData = () => {
  const container = React.useRef();

  useEffect(() => {
    if (!graph) {
      fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
      .then(res => res.json())
      .then((data: TreeGraphData) => {
      data.style = {
        fill: '#f00'
      };
      data.stateStyles = {
        hover: {
          fill: '#f00',
          'text-shape': {
            fill: '#0f0'
          }
        }
      }
        const graph = new G6.TreeGraph({
          container: container.current as string | HTMLElement,
          width: 800,
          height: 800,
          modes: {
            default: [
              {
                type: 'collapse-expand',
                onChange: function onChange(item, collapsed) {
                  const data = item.get('model').data;
                  data.collapsed = collapsed;
                  return true;
                },
              },
              'drag-canvas',
              'zoom-canvas',
            ],
          },
          defaultNode: {
            size: 26,
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
            ],
            style: {
              fill: '#C6E5FF',
              stroke: '#5B8FF9',
            },
          },
          defaultEdge: {
            type: 'cubic-horizontal',
            style: {
              stroke: '#A3B1BF',
            },
          },
          layout: {
            type: 'compactBox',
            direction: 'LR',
            getId: function getId(d) {
              return d.id;
            },
            getHeight: function getHeight() {
              return 16;
            },
            getWidth: function getWidth() {
              return 16;
            },
            getVGap: function getVGap() {
              return 10;
            },
            getHGap: function getHGap() {
              return 100;
            },
          },
        });

        graph.node(function(node) {
          return {
            label: node.id,
            labelCfg: {
              offset: 10,
              position: node.children && node.children.length > 0 ? 'left' : 'right',
            },
          };
        });

        graph.data(data);
        graph.render();
        graph.fitView();

        graph.on('node:mouseenter', e => {
          graph.setItemState(e.item, 'hover', true);
          console.log(e.item);
        });
      });
    }
  }, []);
  return <div ref={container}></div>;
};

export default TreeData;
