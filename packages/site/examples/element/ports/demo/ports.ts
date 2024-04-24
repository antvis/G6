import { Graph, Utils } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node-1', style: { x: 80, y: 200 } },
    { id: 'node-2', style: { x: 250, y: 200 } },
  ],
  edges: [
    {
      id: 'edge-1',
      source: 'node-1',
      target: 'node-2',
    },
    {
      id: 'edge-2',
      source: 'node-1',
      target: 'node-2',
    },
    { id: 'edge-3', source: 'node-1', target: 'node-2' },
  ],
};

const graph = new Graph({
  data,
  node: {
    style: {
      type: (d) => (d.id === 'node-1' ? 'circle' : 'rect'),
      size: (d) => (d.id === 'node-1' ? 30 : [50, 150]),
      port: true,
      ports: (d) =>
        d.id === 'node-2'
          ? [
              { key: 'port-1', placement: [0, 0.15] },
              { key: 'port-2', placement: [0, 0.5] },
              { key: 'port-3', placement: [0, 0.85] },
            ]
          : [],
    },
  },
  edge: {
    style: {
      targetPort: (d) => `port-${Utils.idOf(d).toString().split('-')[1]}`,
      endArrow: true,
    },
  },
});

graph.render();

const updatePort = (attr: string, value: any) => {
  graph.updateNodeData((prev) => {
    const node2Data = prev.find((node: any) => node.id === 'node-2')!;
    return [
      ...prev.filter((node: any) => node.id !== 'node-2'),
      {
        ...node2Data,
        style: {
          ...node2Data!.style,
          [attr]: value,
        },
      },
    ];
  });
};

const isPortShow = () => {
  const node2Data = graph.getNodeData().find((node: any) => node.id === 'node-2')!;
  return (node2Data?.style?.portR as number) > 0;
};

const configActions = {
  'Show/Hide Graphic': () => {
    updatePort('portR', isPortShow() ? 0 : 3);
  },
  'Link to Center/Outer': () => {
    const node2Data = graph.getNodeData().find((node: any) => node.id === 'node-2')!;
    updatePort('portLinkToCenter', !node2Data?.style?.portLinkToCenter);
  },
};

const container = document.getElementById('container')!;
const controllerContainer = document.createElement('div');
controllerContainer.style.position = 'absolute';
container.appendChild(controllerContainer);

const btnContainer = document.createElement('div');
controllerContainer.appendChild(btnContainer);
const tip = document.createElement('span');
tip.innerHTML = `👉 Ports Config: `;
btnContainer.appendChild(tip);
Object.keys(configActions).forEach((name, i) => {
  const btn = document.createElement('a');
  btn.innerHTML = name;
  btn.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
  btn.style.padding = '4px';
  btn.style.marginLeft = i > 0 ? '24px' : '8px';
  btnContainer.appendChild(btn);
  btn.addEventListener('click', async () => {
    configActions[name]();
    await graph.draw();
  });
});
