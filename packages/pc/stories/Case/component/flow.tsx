import React, { useEffect } from 'react';
import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
const colorMap = {
  A: '#72CC4A',
  B: '#1A91FF',
  C: '#FFAA15',
};
const data = {
  nodes: [
    {
      id: '1',
      label: '公司1',
    },
    {
      id: '2',
      label: '公司2',
    },
    {
      id: '3',
      label: '公司3',
    },
    {
      id: '4',
      label: '公司4',
    },
    {
      id: '5',
      label: '公司5',
    },
    {
      id: '6',
      label: '公司6',
    },
    {
      id: '7',
      label: '公司7',
    },
    {
      id: '8',
      label: '公司8',
    },
    {
      id: '9',
      label: '公司9',
    },
  ],
  edges: [
    {
      source: '1',
      target: '2',
      data: {
        type: 'A',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '1',
      target: '3',
      data: {
        type: 'B',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '2',
      target: '5',
      data: {
        type: 'C',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '5',
      target: '6',
      data: {
        type: 'B',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '3',
      target: '4',
      data: {
        type: 'C',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '4',
      target: '7',
      data: {
        type: 'B',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '1',
      target: '8',
      data: {
        type: 'B',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '1',
      target: '9',
      data: {
        type: 'C',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
  ],
};

let graph: IGraph = null;

const CustomFlow = () => {
  const container = React.useRef();
  useEffect(() => {
    if (!graph) {
      G6.registerNode(
        'round-rect',
        {
          drawShape: (cfg, group) => {
            const width = cfg.style.width as number;
            const stroke = cfg.style.stroke;
            const rect = group.addShape('rect', {
              attrs: {
                x: -width / 2,
                y: -15,
                width,
                height: 30,
                radius: 15,
                stroke,
                lineWidth: 1.2,
                opacity: 1,
                fill: '#fff',
              },
              name: 'rect-shape',
              className: 'rect-shape',
            });
            group.addShape('circle', {
              attrs: {
                x: -width / 2,
                y: 0,
                r: 3,
                fill: stroke,
              },
              name: 'circle-shape',
            });
            group.addShape('circle', {
              attrs: {
                x: width / 2,
                y: 0,
                r: 3,
                fill: stroke,
              },
              name: 'circle-shape',
            });
            return rect;
          },
          // getAnchorPoints: () => {
          //   return [{ x: 0, y: 0.5 }, { x: 1, y: 0.5 }];
          // },
          update: (cfg, item) => {
            const group = item.getContainer();
            const children = group.get('children');
            const node = children[0];
            const circleLeft = children[1];
            const circleRight = children[2];

            const stroke = cfg.style.stroke;

            if (stroke) {
              node.attr('stroke', stroke);
              circleLeft.attr('fill', stroke);
              circleRight.attr('fill', stroke);
            }
          },
        },
        'single-node',
      );

      G6.registerEdge('polyline2', {
        //itemType: 'edge',
        draw: (cfg: any, group) => {
          const startPoint = cfg.startPoint;
          const endPoint = cfg.endPoint;

          const Ydiff = endPoint.y - startPoint.y;

          const slope = Ydiff !== 0 ? 500 / Math.abs(Ydiff) : 0;

          const cpOffset = 16;
          const offset = Ydiff < 0 ? cpOffset : -cpOffset;

          const line1EndPoint = {
            x: startPoint.x + slope,
            y: endPoint.y + offset,
          };
          const line2StartPoint = {
            x: line1EndPoint.x + cpOffset,
            y: endPoint.y,
          };

          // 控制点坐标
          const controlPoint = {
            x:
              ((line1EndPoint.x - startPoint.x) * (endPoint.y - startPoint.y)) /
                (line1EndPoint.y - startPoint.y) +
              startPoint.x,
            y: endPoint.y,
          };

          let path = [
            ['M', startPoint.x, startPoint.y],
            ['L', line1EndPoint.x, line1EndPoint.y],
            ['Q', controlPoint.x, controlPoint.y, line2StartPoint.x, line2StartPoint.y],
            ['L', endPoint.x, endPoint.y],
          ];

          if (Ydiff === 0) {
            path = [
              ['M', startPoint.x, startPoint.y],
              ['L', endPoint.x, endPoint.y],
            ];
          }

          const line = group.addShape('path', {
            attrs: {
              path,
              stroke: colorMap[cfg.data && cfg.data.type],
              lineWidth: 1.2,
              endArrow: false,
            },
            name: 'edge-shape',
            className: 'edge-shape',
          });

          const labelLeftOffset = 0;
          const labelTopOffset = 8;
          // amount
          const amount = group.addShape('text', {
            attrs: {
              text: cfg.data && cfg.data.amount,
              x: line2StartPoint.x + labelLeftOffset,
              y: endPoint.y - labelTopOffset - 2,
              fontSize: 14,
              textAlign: 'left',
              textBaseline: 'middle',
              fill: '#000000D9',
            },
            name: 'amout-text-shape',
            className: 'amout-text-shape',
          });
          // type
          group.addShape('text', {
            attrs: {
              text: cfg.data && cfg.data.type,
              x: line2StartPoint.x + labelLeftOffset,
              y: endPoint.y - labelTopOffset - amount.getBBox().height - 2,
              fontSize: 12,
              textAlign: 'left',
              textBaseline: 'middle',
              fill: '#000000D9',
            },
            name: 'type-text-shape',
            className: 'type-text-shape',
          });
          // date
          group.addShape('text', {
            attrs: {
              text: cfg.data && cfg.data.date,
              x: line2StartPoint.x + labelLeftOffset,
              y: endPoint.y + labelTopOffset + 4,
              fontSize: 12,
              fontWeight: 300,
              textAlign: 'left',
              textBaseline: 'middle',
              fill: '#000000D9',
            },
            name: 'date-text-shape',
            className: 'date-text-shape',
          });
          return line;
        },
      });

      const graph = new G6.Graph({
        container: container.current as string | HTMLElement,
        width: 1000,
        height: 1000,
        renderer: 'svg',
        fitView: true,
        layout: {
          type: 'dagre',
          rankdir: 'LR',
          nodesep: 30,
          ranksep: 100,
        },
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
        },
        defaultNode: {
          type: 'round-rect', //'round-rect', // 'rect',//
          labelCfg: {
            style: {
              fill: '#000000A6',
              fontSize: 12,
            },
          },
          style: {
            stroke: '#72CC4A',
            width: 150,
          },
          anchorPoints: [
            [0, 0.5],
            [1, 0.5],
          ],
        },
        defaultEdge: {
          type: 'polyline2',
          sourceAnchor: 1,
          targetAnchor: 0,
        },
      });

      graph.data(data);
      graph.render();

      // const edges = graph.getEdges();
      // edges.forEach((edge) => {
      //   const line = edge.getKeyShape();
      //   const stroke = line.attr('stroke');
      //   const targetNode = edge.getTarget();
      //   targetNode.update({
      //     style: {
      //       stroke
      //     }
      //   });
      // });
      // graph.paint();
    }
  });

  return <div ref={container}></div>;
};

export default CustomFlow;
