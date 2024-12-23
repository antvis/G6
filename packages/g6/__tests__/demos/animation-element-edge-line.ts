import { Circle, Graph } from '@antv/g6';
// import { Graph as GB } from '@antv/graphlib';
import { sleep } from '../utils';

Object.assign(window, { Circle, sleep });

export const animationEdgeLine: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'node-1', style: { x: 100, y: 150 } },
        { id: 'node-2', style: { x: 300, y: 200 } },
      ],
      edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
    },
    cursor: 'grab',
    edge: {
      style: {
        lineWidth: 2,
        lineDash: [10, 10],
        stroke: '#1890FF',
        halo: true,
        haloOpacity: 0.25,
        haloLineWidth: 12,
        label: true,
        labelText: 'line-edge',
        labelFontSize: 12,
        labelFill: '#000',
        labelPadding: 0,
        startArrow: true,
        startArrowType: 'circle',
        endArrow: true,
        endArrowFill: 'red',
      },
    },
    behaviors: ['drag-element'],
  });

  await graph.render();

  await graph.clear();
  // // @ts-expect-error private
  // const ctx = graph.context;
  // // @ts-expect-error private
  // ctx.element.container.childNodes.forEach((node) => {
  //   node.destroy();
  // });
  // ctx.model.model = new GB();
  // // @ts-expect-error private
  // ctx.element.elementMap = {};

  await sleep(16);

  graph.addData({
    nodes: [{ id: 'node-3', style: { x: 100, y: 100, fill: 'red' } }],
  });
  await graph.draw();

  // graph.addData({
  //   nodes: [{ id: 'node-3', style: { x: 100, y: 100 } }],
  // });
  // await graph.draw();
  // // 为什么不 sleep 就会闪烁一下？

  // graph.addData({
  //   nodes: [{ id: 'node-4', style: { x: 150, y: 150, fill: 'red' } }],
  // });
  // await graph.draw();

  // graph.addData({
  //   nodes: [{ id: 'node-5', style: { x: 150, y: 200, fill: 'blue' } }],
  // });
  // await graph.draw();

  animationEdgeLine.form = (panel) => [
    panel.add(
      {
        Play: () => {
          graph.updateNodeData([{ id: 'node-2', style: { x: 450, y: 350 } }]);
          graph.draw();
        },
      },
      'Play',
    ),
  ];

  return graph;
};
