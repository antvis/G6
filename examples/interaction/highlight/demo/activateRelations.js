import G6 from '@antv/g6';
import insertCss from 'insert-css';

insertCss(`
  .g6-tooltip {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #000;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px 8px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
  }
`);

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  layout: {
    type: 'force',
    edgeStrength: 0.7,
  },
  modes: {
    default: [
      'drag-canvas',
      {
        type: 'tooltip',
        formatText: function formatText(model) {
          return model.name;
        },
        offset: 30,
      },
      {
        type: 'edge-tooltip',
        formatText: function formatText(model, e) {
          const edge = e.item;
          return (
            '来源：' +
            edge.getSource().getModel().name +
            '<br/>去向：' +
            edge.getTarget().getModel().name
          );
        },
        offset: 30,
      },
      'activate-relations',
    ],
  },
  defaultNode: {
    size: [10, 10],
    style: {
      lineWidth: 2,
      fill: '#DEE9FF',
      stroke: '#5B8FF9',
    },
  },
  defaultEdge: {
    size: 1,
    style: {
      stroke: '#e2e2e2',
      lineAppendWidth: 2,
    },
  },
  nodeStateStyles: {
    active: {
      opacity: 1,
    },
    inactive: {
      opacity: 0.2,
    },
  },
  edgeStateStyles: {
    active: {
      stroke: '#999',
    },
  },
});

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/xiaomi.json')
  .then((res) => res.json())
  .then((data) => {
    graph.data({
      nodes: data.nodes,
      edges: data.edges.map(function (edge, i) {
        edge.id = 'edge' + i;
        return Object.assign({}, edge);
      }),
    });

    graph.render();
  });
