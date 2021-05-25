import G6 from '@antv/g6';

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  layout: {
    type: 'fruchterman',
    speed: 10,
    maxIteration: 500,
    // for rendering after each iteration
    tick: () => {
      graph.refreshPositions()
    }
  },
  defaultNode: {
    size: 15,
  },
  fitView: true
});

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
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

    graph.on('node:dragstart', function (e) {
      const forceLayout = graph.get('layoutController').layoutMethods[0];
      forceLayout.stop()
    });

    graph.on('node:drag', function (e) {
      refreshDragedNodePosition(e);
      graph.layout()
    });

    if (typeof window !== 'undefined')
      window.onresize = () => {
        if (!graph || graph.get('destroyed')) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.changeSize(container.scrollWidth, container.scrollHeight);
      };
  });

function refreshDragedNodePosition(e) {
  const model = e.item.get('model');
  model.fx = e.x;
  model.fy = e.y;
  model.x = e.x;
  model.y = e.y;
}
