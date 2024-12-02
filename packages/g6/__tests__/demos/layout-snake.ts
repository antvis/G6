import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: '0', data: { label: '开始流程', time: '17:00:00' } },
    { id: '1', data: { label: '流程1', time: '17:00:05' } },
    { id: '2', data: { label: '流程2', time: '17:00:12' } },
    { id: '3', data: { label: '流程3', time: '17:00:30' } },
    { id: '4', data: { label: '流程4', time: '17:02:00' } },
    { id: '5', data: { label: '流程5', time: '17:02:40' } },
    { id: '6', data: { label: '流程6', time: '17:05:50' } },
    { id: '7', data: { label: '流程7', time: '17:10:00' } },
    { id: '8', data: { label: '流程8', time: '17:11:20' } },
    { id: '9', data: { label: '流程9', time: '17:15:00' } },
    { id: '10', data: { label: '流程10', time: '17:30:00' } },
    { id: '11', data: { label: '流程11' } },
    { id: '12', data: { label: '流程12' } },
    { id: '13', data: { label: '流程13' } },
    { id: '14', data: { label: '流程14' } },
    { id: '15', data: { label: '流程结束' } },
  ],
  edges: [
    { source: '0', target: '1', data: { done: true } },
    { source: '1', target: '2', data: { done: true } },
    { source: '2', target: '3', data: { done: true } },
    { source: '3', target: '4', data: { done: true } },
    { source: '4', target: '5', data: { done: true } },
    { source: '5', target: '6', data: { done: true } },
    { source: '6', target: '7', data: { done: true } },
    { source: '7', target: '8', data: { done: true } },
    { source: '8', target: '9', data: { done: true } },
    { source: '9', target: '10', data: { done: true } },
    { source: '10', target: '11', data: { done: false } },
    { source: '11', target: '12', data: { done: false } },
    { source: '12', target: '13', data: { done: false } },
    { source: '13', target: '14', data: { done: false } },
    { source: '14', target: '15', data: { done: false } },
  ],
};

export const layoutSnake: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    node: {
      style: {
        labelText: (d) => d.id,
        labelPlacement: 'center',
        labelFill: '#fff',
      },
    },
    edge: {
      style: {
        endArrow: true,
      },
    },
    layout: {
      key: 'snake',
      type: 'snake',
    },
  });

  await graph.render();

  return graph;
};
