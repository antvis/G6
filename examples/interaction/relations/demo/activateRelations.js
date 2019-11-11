import G6 from '@antv/g6';

const graph = new G6.Graph({
  container: 'container',
  width: 500,
  height: 500,
  fitView: true,
  layout: {
    type: 'force',
    edgeStrength: 0.7
  },
  modes: {
    default: [ 'drag-canvas', {
      type: 'tooltip',
      formatText: function formatText(model) {
        return model.name;
      }
    }, {
      type: 'edge-tooltip',
      formatText: function formatText(model, e) {
        const edge = e.item;
        return '来源：' + edge.getSource().getModel().name + '<br/>去向：' + edge.getTarget().getModel().name;
      }
    }, 'activate-relations' ]
  },
  defaultNode: {
    size: [ 10, 10 ],
    style: {
      lineWidth: 2,
      fill: 'steelblue'
    }
  },
  defaultEdge: {
    size: 1,
    style: {
      stroke: '#e2e2e2',
      lineAppendWidth: 2
    }
  },
  nodeStateStyles: {
    active: {
      opacity: 1
    },
    inactive: {
      opacity: 0.2
    }
  },
  edgeStateStyles: {
    active: {
      stroke: '#999'
    }
  }
});

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/xiaomi.json')
  .then(res => res.json())
  .then(data => {
    graph.data({
      nodes: data.nodes,
      edges: data.edges.map(function(edge, i) {
        edge.id = 'edge' + i;
        return Object.assign({}, edge);
      })
    });

    graph.render();
  });
