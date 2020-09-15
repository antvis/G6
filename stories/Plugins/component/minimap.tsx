import React, { useEffect } from 'react';
import G6, { TreeGraph, Graph } from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const data2 = {
  nodes: [
    {
      id: 'node1',
      // x: -200,
      // y: -200,
      x: 50,
      y: 50,
      label: 'node1',
    },
    {
      id: 'node2',
      // x: 200,
      // y: -200,
      x: 100,
      y: 50,
      label: 'node2',
    },
    {
      id: 'node3',
      // x: -200,
      // y: 200,
      x: 50,
      y: 100,
      label: 'node3',
    },
    {
      id: 'node4',
      x: 100,
      y: 100,
      label: 'node4',
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
  ],
};

const Minimap = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      const minimap = new G6.Minimap({
        size: [300, 200],
        type: 'keyShape',
        padding: 10,
      });
      fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
        .then((res) => res.json())
        .then((data) => {
          graph = new TreeGraph({
            container: container.current as string | HTMLElement,
            width: 300,
            height: 400,
            plugins: [minimap],
            modes: {
              default: ['zoom-canvas', 'drag-canvas', 'drag-node', 'click-select'],
            },
            defaultNode: {
              type: 'circle',
              size: 24,
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
            nodeStateStyles: {
              selected: {
                fill: 'red',
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
                return 50;
              },
            },
            animate: false,
          });
          // graph.node(function(node) {
          //   return {
          //     label: node.id,
          //     labelCfg: {
          //       offset: 10,
          //       position: node.children && node.children.length > 0 ? 'left' : 'right',
          //     },
          //   };
          // });
          // graph.get('canvas').set('localRefresh', false);
          graph.data(data);
          graph.render();

          graph.on('canvas:click', () => {
            // graph.addItem('node', {
            //   id: 'newNode',
            //   label: 'new node',
            //   x: 200,
            //   y: 400
            // });
            // graph.updateItem(graph.getNodes()[0], {
            //   label: 'new node',
            //   x: 150,
            //   y: 400
            // });
            // graph.moveTo(0, 0);
            // graph.removeItem(graph.getNodes()[0]);
          });
        });
    }
  });
  return <div ref={container}></div>;
};

export default Minimap;
