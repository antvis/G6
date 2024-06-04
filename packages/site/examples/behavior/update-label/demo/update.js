import { EdgeEvent, Graph, NodeEvent } from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node-1',
      style: { x: 100, y: 150, labelText: 'Hover me!' },
    },
    {
      id: 'node-2',
      style: { x: 300, y: 150, labelText: 'Hover me!' },
    },
  ],
  edges: [{ source: 'node-1', target: 'node-2', style: { labelText: 'Hover me!' } }],
};

const graph = new Graph({
  container: 'container',
  data,
  behaviors: ['drag-element'],
});

graph.render();

graph.on(NodeEvent.POINTER_ENTER, (event) => {
  const { target } = event;
  graph.updateNodeData([
    { id: target.id, style: { labelText: 'Hovered', fill: 'lightgreen', labelFill: 'lightgreen' } },
  ]);
  graph.draw();
});

graph.on(EdgeEvent.POINTER_ENTER, (event) => {
  const { target } = event;
  graph.updateEdgeData([
    { id: target.id, style: { labelText: 'Hovered', stroke: 'lightgreen', labelFill: 'lightgreen', lineWidth: 3 } },
  ]);
  graph.draw();
});

graph.on(NodeEvent.POINTER_OUT, (event) => {
  const { target } = event;
  graph.updateNodeData([{ id: target.id, style: { labelText: 'Hover me!', fill: '#5B8FF9', labelFill: 'black' } }]);
  graph.draw();
});

graph.on(EdgeEvent.POINTER_OUT, (event) => {
  const { target } = event;
  graph.updateEdgeData([
    { id: target.id, style: { labelText: 'Hover me!', stroke: '#5B8FF9', labelFill: 'black', lineWidth: 1 } },
  ]);
  graph.draw();
});
