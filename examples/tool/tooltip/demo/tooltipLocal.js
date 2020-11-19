import G6 from '@antv/g6';
import insertCss from 'insert-css';

insertCss(`
  .g6-tooltip {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px 8px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
  }
`);
const data = {
  nodes: [
    {
      id: '0',
      label: 'Has Tooltip - node 0',
      x: 230,
      y: 100,
      description: 'This is node-0.',
      subdescription: 'This is subdescription of node-0.',
    },
    {
      id: '1',
      label: 'No Tooltip - node 1',
      x: 150,
      y: 310,
      description: 'This is node-1.',
      subdescription: 'This is subdescription of node-1.',
    },
    {
      id: '2',
      label: 'Has Tooltip - node 2',
      x: 320,
      y: 310,
      description: 'This is node-2.',
      subdescription: 'This is subdescription of node-2.',
    },
  ],
  edges: [
    {
      id: 'e1',
      source: '0',
      target: '1',
      label: 'No Tooltip',
      description: 'This is edge from node 0 to node 1.',
    },
    {
      id: 'e2',
      source: '0',
      target: '2',
      label: 'Has Tooltip',
      description: 'This is edge from node 0 to node 2.',
    },
  ],
};
const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML = 'Hover the node label to show the tooltip';
const container = document.getElementById('container');
container.appendChild(descriptionDiv);
const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 30;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  linkCenter: true,
  defaultNode: {
    size: [150, 50],
    type: 'rect',
  },
  defaultEdge: {
    labelCfg: {
      autoRotate: true,

    }
  },
  modes: {
    default: [
      'drag-node',
      {
        type: 'tooltip',
        formatText: function formatText(model) {
          const text = 'description: ' + model.description;
          return text;
        },
        offset: 20,
        shouldBegin: (e) => {
          if (e.item.getModel().id === '1') return false;
          return true;
        },
      },
      {
        type: 'edge-tooltip',
        formatText: function formatText(model) {
          const text = 'description: ' + model.description;
          return text;
        },
        offset: 20,
        shouldBegin: (e) => {
          if (e.item.getModel().target === '1') return false;
          return true;
        },
      },
    ],
  },
});
graph.data(data);
graph.render();

graph.on('node:mouseenter', e => {
  graph.setItemState(e.item, 'active', true)
});
graph.on('node:mouseleave', e => {
  graph.setItemState(e.item, 'active', false)
});
graph.on('edge:mouseenter', e => {
  graph.setItemState(e.item, 'active', true)
});
graph.on('edge:mouseleave', e => {
  graph.setItemState(e.item, 'active', false)
});

window.onresize = () => {
  if (!graph || graph.get('destroyed')) return;
  if (!container || !container.scrollWidth || !container.scrollHeight) return;
  graph.changeSize(container.scrollWidth, container.scrollHeight - 30);
};