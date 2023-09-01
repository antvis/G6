import { Graph } from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
      data: {
        x: 100,
        y: 150,
        label: 'label before been hovered',
      },
    },
    {
      id: 'node2',
      data: {
        x: 300,
        y: 150,
        label: 'label before been hovered',
      },
    },
  ],
  edges: [
    {
      id: 'edge1',
      source: 'node1',
      target: 'node2',
      data: {
        label: 'label before been hovered',
      },
    },
  ],
};

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const graph = new Graph({
  container,
  width,
  height,
  modes: {
    default: ['drag-node'],
  },
  data,
  node: {
    labelShape: {
      position: 'center',
      text: {
        fields: ['label'],
        formatter: (model) => model.data.label,
      },
      maxLines: 4,
    },
  },
  edge: {
    labelShape: {
      text: {
        fields: ['label'],
        formatter: (model) => model.data.label,
      },
      maxLines: 2,
    },
  },
});

// 节点上的点击事件
graph.on('node:pointerenter', (event) => {
  const { itemId } = event;
  graph.updateData('node', {
    id: itemId,
    data: {
      label: `after been hovered ${itemId}`,
      labelShape: {
        fill: '#0f0',
      }
    },
  });
});

graph.on('edge:pointerenter', (event) => {
  const { itemId } = event;
  graph.updateData('edge', {
    id: itemId,
    data: {
      label: `after been hovered ${itemId}`,
      labelShape: {
        fill: '#0f0',
      }
    },
  });
});

graph.on('node:pointerleave', (event) => {
  const { itemId } = event;
  graph.updateData('node', {
    id: itemId,
    data: {
      label: 'label before been hovered',
      labelShape: {
        fill: '#000',
      }
    },
  });
});

graph.on('edge:pointerleave', (event) => {
  const { itemId } = event;
  graph.updateData('edge', {
    id: itemId,
    data: {
      label: 'label before been hovered',
      labelShape: {
        fill: '#000',
      }
    },
  });
});

const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML =
  'Mouse hover over node to update node style and its label text. <br/> Mouse hover over edge to update edge style and its label text';
container.appendChild(descriptionDiv);

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
