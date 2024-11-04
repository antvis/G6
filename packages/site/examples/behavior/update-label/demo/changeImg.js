import { Graph } from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'circle',
      data: {
        x: 100,
        y: 150,
        labelShape: {
          position: 'center',
        },
      },
    },
    {
      id: 'avatar',
      data: {
        x: 350,
        y: 100,
        labelShape: {
          text: 'label before been hovered',
        },
      },
    },
  ],
  edges: [
    {
      id: 'edge-1',
      source: 'node1',
      target: 'node2',
      data: {
        labelShape: {
          text: 'label before been hovered',
        },
      },
    },
  ],
};

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML =
  'Mouse hover over node to update node style and its label text. <br/> Mouse hover over edge to update edge style and its label text';
container.appendChild(descriptionDiv);

const graph = new Graph({
  container,
  width,
  height,
  modes: {
    default: ['drag-node'],
  },
  node: {
    keyShape: {
      r: {
        fields: ['size'],
        formatter: (model) => model.data.size / 2,
      },
    },
    labelShape: {
      position: 'center',
      text: {
        fields: ['label'],
        formatter: (model) => model.data.label,
      },
    },
    labelBackgroundShape: {},
    otherShapes: {},
  },
  data,
});

// 节点上的点击事件
graph.on('node:pointerenter', (event) => {
  const { itemId } = event;
  graph.updateData('node', {
    id: itemId,
    data: {
      labelShape: {
        text: `after been hovered ${itemId}`,
        fill: '#003a8c',
      },
    },
  });
});

graph.on('node:pointerleave', (event) => {
  const { itemId } = event;
  graph.updateData('node', {
    id: itemId,
    data: {
      labelShape: {
        text: 'label before been hovered',
        fill: '#000',
      },
    },
  });
});
