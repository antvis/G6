import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';

const data = {
  nodes: [
    {
      id: '1',
      name: 'name1',
      size: [10, 20]
    },
    {
      id: '2',
      name: 'name2',
    },
    {
      id: '3',
      name: 'name3',
    },
    {
      id: '4',
      name: 'name4',
    },
    {
      id: '5',
      name: 'name5',
    },
    {
      id: '6',
      name: 'name6',
    },
    {
      id: '7',
      name: 'name7',
    },
    {
      id: '8',
      name: 'name8',
    },
  ],
  edges: [
    {
      source: '1',
      target: '2',
    },
    {
      source: '1',
      target: '3',
    },
    {
      source: '2',
      target: '4',
    },
    {
      source: '3',
      target: '4',
    },
    {
      source: '4',
      target: '5',
    },
    {
      source: '5',
      target: '6',
    },
    {
      source: '6',
      target: '7',
    },
    {
      source: '6',
      target: '8',
    },
  ],
};

let graph: IGraph = null;

const DagreLayout = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      G6.registerNode('sql', {
        drawShape(cfg, group) {
          const rect = group.addShape('rect', {
            attrs: {
              x: -75,
              y: -25,
              width: 150,
              height: 50,
              radius: 10,
              stroke: '#5B8FF9',
              fill: '#C6E5FF',
              lineWidth: 3,
            },
          });
          if (cfg.name) {
            // group.addShape('text', {
            //   attrs: {
            //     text: cfg.name,
            //     x: 0,
            //     y: 0,
            //     fill: '#00287E',
            //     fontSize: 14,
            //     textAlign: 'center',
            //     textBaseline: 'middle',
            //     fontWeight: 'bold'
            //   }
            // });
          }
          return rect;
        },
      });
      // G6.Global.nodeStateStyle.selected = {
      //   stroke: '#d9d9d9',
      //   fill: '#5394ef'
      // };

      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 500,
        height: 500,
        layout: {
          type: 'dagre',
          controlPoints: true,
          nodesepFunc: (d) => {
            if (d.id === '3') {
              return 500;
            }
            return 50;
          },
          ranksep: 70,
        },
        defaultNode: {
          type: 'rect',
        },
        defaultEdge: {
          type: 'polyline',
          style: {
            radius: 0,
            endArrow: {
              path: 'M 0,0 L 0,4 L 8,-4 Z',
              fill: '#ddd'
            }
          },
        },
        modes: {
          default: [
            'drag-canvas',
            'zoom-canvas',
            'click-select',
            // {
            //   type: 'tooltip',
            //   formatText(model) {
            //     const cfg: any = model.conf;
            //     const text = [];
            //     cfg.forEach(row => {
            //       text.push(row.label + ':' + row.value + '<br>');
            //     });
            //     return text.join('\n');
            //   },
            //   shouldUpdate: e => {
            //     // 如果移动到节点文本上显示，不是文本上不显示
            //     if (e.target.type !== 'text') {
            //       return false;
            //     }
            //     return true;
            //   }
            // }
          ],
        },
        fitView: true,
      });
      graph.data(data);
      graph.render();

      graph.on('canvas:click', (e) => {
        console.log(graph.toDataURL('image/jpeg', '#fff'));
        graph.downloadImage('test', 'image/png');
      });
    }
  });
  return <div ref={container}></div>;
};

export default DagreLayout;
