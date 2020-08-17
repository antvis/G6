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
      label: 'hover the label - node 0',
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
      label: 'hover the label - node 2',
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
      description: 'This is edge from node 0 to node 1.',
    },
    {
      id: 'e2',
      source: '0',
      target: '2',
      description: 'This is edge from node 0 to node 2.',
    },
  ],
};
const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML = 'Hover the node label to show the tooltip';
const container = document.getElementById('container');
container.appendChild(descriptionDiv);
const width = container.scrollWidth;
const height = container.scrollHeight - 30;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  linkCenter: true,
  defaultNode: {
    size: [150, 50],
    type: 'rect',
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9',
    },
  },
  defaultEdge: {
    style: {
      stroke: '#b5b5b5',
      lineAppendWidth: 3,
    },
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
          const div = document.getElementsByClassName('g6-tooltip')[0];
          if (div) div.style.display = 'none';
          return true;
        },
        shouldUpdate: (e) => {
          if (e.target.get('name') === 'text-shape') {
            const div = document.getElementsByClassName('g6-tooltip')[0];
            if (div) div.style.display = 'block';
            return true;
          }
          return false;
        },
      },
    ],
  },
});
graph.data(data);
graph.render();
