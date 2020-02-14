import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

let graph: IGraph = null;

const Tutorial = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      // 实例化 Minimap 插件
      const minimap = new G6.Minimap({
        size: [100, 100],
        className: 'minimap',
        type: 'default',
      });

      // 实例化 Grid 插件
      const grid = new G6.Grid();

      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 800,
        height: 600,
        defaultNode: {
          shape: 'circle',
          size: 20,
          labelCfg: {
            style: {
              fill: '#fff',
            },
          },
        },
        defaultEdge: {
          labelCfg: {
            autoRotate: true,
          },
        },
        nodeStateStyles: {
          hover: {
            fill: 'lightsteelblue',
            cursor: 'pointer',
          },
          click: {
            stroke: '#000',
            lineWidth: 3,
          },
        },
        edgeStateStyles: {
          click: {
            stroke: 'steelblue',
          },
        },
        layout: {
          type: 'force',
          linkDistance: 100,
          preventOverlap: true,
          nodeStrength: -30,
          edgeStrength: 0.1,
        },
        modes: {
          default: [
            'drag-node',
            'drag-canvas',
            'zoom-canvas',
            // 点提示框交互工具的配置
            {
              type: 'tooltip',
              formatText(model) {
                const text = 'label: ' + model.label + '<br/> class: ' + model.class;
                return text;
              },
              shouldUpdate: e => {
                return true;
              },
            },
            // 边提示框交互工具的配置
            {
              type: 'edge-tooltip',
              formatText(model) {
                const text =
                  'source: ' +
                  model.source +
                  '<br/> target: ' +
                  model.target +
                  '<br/> weight: ' +
                  model.weight;
                return text;
              },
              shouldUpdate: e => {
                return true;
              },
            },
          ],
        },
        plugins: [minimap, grid], //  将 Minimap 和 Grid 插件的实例配置到图上
      });
      // graph.get('canvas').set('localRefresh', false);
      //$.getJSON('https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json', data => {
      const main = async () => {
        const response = await fetch(
          'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json',
        );
        const data = await response.json();
        console.log(data);
        const nodes = data.nodes;
        const edges = data.edges;
        nodes.forEach(node => {
          if (!node.style) {
            node.style = {};
          }
          node.style.lineWidth = 1;
          node.style.stroke = '#666';
          node.style.fill = 'steelblue';
          // switch (node.class) {
          //     case 'c0': {
          //     node.shape = 'circle';
          //     node.size = 30;
          //     break;
          //     }
          //     case 'c1': {
          //     node.shape = 'rect';
          //     node.size = [ 35, 20 ];
          //     break;
          //     }
          //     case 'c2': {
          //     node.shape = 'ellipse';
          //     node.size = [ 35, 20 ];
          //     break;
          //     }
          // }
        });
        edges.forEach(edge => {
          if (!edge.style) {
            edge.style = {};
          }
          edge.style.lineWidth = edge.weight;
          edge.style.opacity = 0.6;
          edge.style.stroke = 'grey';
        });

        graph.data(data);
        graph.render();

        graph.on('node:mouseenter', e => {
          const nodeItem = e.item;
          graph.setItemState(nodeItem, 'hover', true);
        });
        graph.on('node:mouseleave', e => {
          const nodeItem = e.item;
          graph.setItemState(nodeItem, 'hover', false);
        });
        graph.on('node:click', e => {
          const clickNodes = graph.findAllByState('node', 'click');
          clickNodes.forEach(cn => {
            graph.setItemState(cn, 'click', false);
          });
          const nodeItem = e.item;
          graph.setItemState(nodeItem, 'click', true);
        });
        graph.on('edge:click', e => {
          const clickEdges = graph.findAllByState('edge', 'click');
          clickEdges.forEach(ce => {
            graph.setItemState(ce, 'click', false);
          });
          const edgeItem = e.item;
          graph.setItemState(edgeItem, 'click', true);
        });
      };
      main();
    }
  });

  return <div ref={container}></div>;
};

export default Tutorial;
