import G6 from '@antv/g6';

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const colors = [ '#FD8C3D', '#D83F43', '#F7BED6', '#E487C7', '#46A848', '#D83F43', '#3B85BA', '#48335B', '#B7CDE9' ];

const sankeyGraph = window.sankey.sankey().nodes([
  { id: 'Alice' },
  { id: 'Bob' },
  { id: 'Carol' }
]).links([
  { source: 0, target: 1 }, // Alice → Bob
  { source: 1, target: 2 } // Bob → Carol
])
  .nodeWidth(15)
  .nodePadding(10)
  .size([ width, height ]);

// const path = window.d3.sankeyLinkHorizontal();

// G6.registerEdge('sankey', {
//   draw(cfg, group) {
//     const data = cfg.data;
//     // console.log(data, path(data));
//     const shape = group.addShape('path', {
//       attrs: {
//         stroke: 'rgba(0,0,0,0.1)',
//         lineWidth: Math.max(1, data.dy),
//         path: path(data)
//       }
//     });
//     return shape;
//   }
// },
// 'line');

const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  defaultNode: {
    style: {
      stroke: null
    }
  },
  edgeStateStyles: {
    active: {
      stroke: 'rgba(0,0,0,0.3)'
    }
  }
});


window.d3.json('https://gw.alipayobjects.com/os/antvdemo/assets/data/energy-flow.json',
function(energy) {
  sankeyGraph.nodes(energy.nodes).links(energy.links); // .layout(32)
  energy.nodes = sankeyGraph().nodes;
  energy.links = sankeyGraph().links;
  const nodes = [];
  const edges = [];
  energy.nodes.forEach(node => {
    nodes.push({
      id: node.name,
      label: node.name,
      style: {
        fill: colors[Math.round(Math.random() * 9)]
      },
      x: node.x0 + 7.5,
      y: node.y0 + node.y1 / 2,
      size: [ 15, node.y1 ],
      shape: 'rect',
      labelCfg: {
        position: node.x0 > width / 2 ? 'left' : 'right',
        offset: 5
      }
    });
  });
  energy.links.forEach(edge => {
    const source = edge.source;
    const target = edge.target;
    edges.push({
      id: source.name + ':' + target.name,
      source: source.name,
      target: target.name,
      shape: 'sankey',
      data: edge
    });
  });
  graph.data({
    nodes,
    edges
  });
  graph.render();
  graph.fitView();
  graph.on('edge:mouseenter', e => {
    graph.setItemState(e.item, 'active', true);
  });
  graph.on('edge:mouseleave', e => {
    graph.setItemState(e.item, 'active', false);
  });
});
