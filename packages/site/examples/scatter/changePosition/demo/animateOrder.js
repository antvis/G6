import { Graph, stdLib } from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'Click Me',
      data: {
        x: 200,
        y: 100,
        cluster: '1',
      },
    },
    {
      id: 'b',
      data: {
        x: 100,
        y: 200,
        cluster: '2',
      },
    },
    {
      id: 'c',
      data: {
        x: 300,
        y: 200,
        cluster: '3',
      },
    },
  ],
  edges: [
    {
      id: 'a2b',
      source: 'Click Me',
      target: 'b',
    },
    {
      id: 'a2c',
      source: 'Click Me',
      target: 'c',
    },
  ],
};

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
let graph = new Graph({
  container: 'container',
  width,
  height,
  modes: { default: [] },
  layout: {
    type: 'grid',
  },
  theme: {
    type: 'spec',
    specification: {
      node: {
        dataTypeField: 'cluster',
      },
    },
  },
  node: {
    labelShape: {
      text: {
        fields: ['id'],
        formatter: (model) => model.id,
      },
    },
    labelBackgroundShape: {},
    animates: {
      update: [
        {
          fields: ['r'],
          shapeId: 'keyShape',
          duration: 1000,
          order: 0,
        },
        {
          fields: ['fill'],
          shapeId: 'keyShape',
          duration: 1000,
          order: 2,
        },
        {
          fields: ['lineWidth'],
          shapeId: 'keyShape',
          duration: 1000,
          order: 1,
        },
        {
          fields: ['fill', 'fontWeight'],
          shapeId: 'labelShape',
          duration: 1000,
          order: 3,
        },
      ],
    },
  },
  data,
});

graph.on('node:click', (e) => {
  graph.updateData('node', {
    id: e.itemId,
    data: {
      cluster: Math.random(),
      keyShape: {
        r: 32 + Math.random() * 10 - 5,
        lineWidth: 6 + Math.random() * 6 - 3,
        stroke: '#000',
      },
      labelShape: {
        fill: stdLib.themes.light.node.palette[Math.floor(Math.random() * 10)],
        fontWeight: 700,
      },
    },
  });
});

const btnContainer = document.createElement('div');
btnContainer.style.position = 'absolute';
container.appendChild(btnContainer);
const tip = document.createElement('span');
tip.innerHTML = `The Animations are Ordered as: <br/> 1️⃣ keyShape's r, 2️⃣ keyShape's fill, 3️⃣ keyShape's lineWidth, and 4️⃣ labelShape's fill and fontWeight`;
btnContainer.appendChild(tip);

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
