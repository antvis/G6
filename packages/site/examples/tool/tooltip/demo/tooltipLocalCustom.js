import G6 from '@antv/g6';
import insertCss from 'insert-css';

// 我们用 insert-css 演示引入自定义样式
// 推荐将样式添加到自己的样式文件中
// 若拷贝官方代码，别忘了 npm install insert-css
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

G6.registerNode(
  'rNode',
  {
    drawShape: (cfg, group) => {
      const rect = group.addShape('rect', {
        attrs: {
          x: -cfg.size[0] / 2,
          y: -cfg.size[1] / 2,
          width: cfg.size[0],
          height: cfg.size[1],
          ...cfg.style,
        },
        name: 'rect-shape',
      });
      const responseRect = group.addShape('rect', {
        attrs: {
          width: 30,
          height: 15,
          x: -cfg.size[0] / 2 + 5,
          y: -cfg.size[1] / 2 + 5,
          fill: '#fff',
          stroke: cfg.style.stroke,
          lineWidth: 1,
        },
        name: 'tooltip-response-shape',
      });
      const responseText = group.addShape('text', {
        attrs: {
          text: 'hover here!',
          fill: '#f00',
          x: -cfg.size[0] / 2 + 10,
          y: -cfg.size[1] / 2 + 10,
          textBaseline: 'top',
        },
        name: 'tooltip-response-text-shape',
      });
      const textBBox = responseText.getBBox();
      responseRect.attr({
        width: textBBox.width + 10,
        height: textBBox.height + 10,
      });
      return rect;
    },
  },
  'rect',
);
const data = {
  nodes: [
    {
      id: '0',
      label: 'A',
      x: 220,
      y: 100,
      description: 'This is node A.',
      subdescription: 'This is subdescription of node A.',
    },
    {
      id: '2',
      label: 'No Tooltip',
      x: 150,
      y: 310,
      description: 'This is node B.',
      subdescription: 'This is subdescription of node B.',
    },
    {
      id: '3',
      label: 'C',
      x: 320,
      y: 310,
      description: 'This is node C.',
      subdescription: 'This is subdescription of node C.',
    },
  ],
  edges: [
    {
      id: 'e1',
      source: '0',
      target: '2',
      description: 'This is edge from node 0 to node 2.',
    },
    {
      id: 'e2',
      source: '0',
      target: '3',
      description: 'This is edge from node 0 to node 3.',
    },
  ],
};
const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML = 'Hover the sub rect with red border to show the tooltip.';
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
    size: [100, 100],
    type: 'rNode',
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
        offset: 30,
        shouldBegin: (e) => {
          if (e.item.getModel().id === '2') return false;
          const target = e.target;
          if (target.get('name') === 'tooltip-response-text-shape') return true;
          return false;
        },
      },
    ],
  },
});
graph.data(data);
graph.render();

graph.on('node:mouseenter', (e) => {
  graph.setItemState(e.item, 'active', true);
});
graph.on('node:mouseleave', (e) => {
  graph.setItemState(e.item, 'active', false);
});
graph.on('edge:mouseenter', (e) => {
  graph.setItemState(e.item, 'active', true);
});
graph.on('edge:mouseleave', (e) => {
  graph.setItemState(e.item, 'active', false);
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight - 30);
  };
