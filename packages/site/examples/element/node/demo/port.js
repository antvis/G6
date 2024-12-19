import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node-1', type: 'circle', style: { x: 80, y: 200, size: 30 } },
    {
      id: 'node-2',
      type: 'rect',
      style: {
        x: 250,
        y: 200,
        size: 50,
        port: true,
        ports: [
          { key: 'port-1', placement: [0, 0.15] },
          { key: 'port-2', placement: [0, 0.5] },
          { key: 'port-3', placement: [0, 0.85] },
        ],
      },
    },
  ],
  edges: [
    { id: 'edge-1', source: 'node-1', target: 'node-2', style: { targetPort: 'port-1' } },
    { id: 'edge-2', source: 'node-1', target: 'node-2', style: { targetPort: 'port-2' } },
    { id: 'edge-3', source: 'node-1', target: 'node-2', style: { targetPort: 'port-3' } },
  ],
};

const graph = new Graph({
  data,
  edge: {
    style: {
      endArrow: true,
    },
  },
});

graph.render();

window.addPanel((gui) => {
  const config = { show: false, position: 'outline' };
  gui.add(config, 'position', ['outline', 'center']).onChange((value) => {
    graph.updateNodeData([{ id: 'node-2', style: { portLinkToCenter: value === 'center' } }]);
    graph.draw();
  });
  gui
    .add(config, 'show')
    .onChange((value) => {
      graph.updateNodeData([{ id: 'node-2', style: { portR: value ? 5 : 0 } }]);
      graph.draw();
    })
    .name('show ports');
});
