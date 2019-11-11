import G6 from '@antv/g6';
import d3 from 'd3';


const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight;
const colors = [ '#1890FF', '#73C9E6', '#13C2C2', '#6CD9B3', '#2FC25B',
  '#9DD96C', '#FACC14', '#E6965C', '#F04864', '#D66BCA', '#8543E0',
  '#8E77ED', '#3436C7', '#737EE6', '#223273', '#7EA2E6' ];

const pathFn = d3.sankeyLinkHorizontal();
const sankey = d3.sankey().nodeWidth(15).nodePadding(10)
  .extent([[ 1, 5 ], [ width - 10, height - 5 ]]);
G6.registerEdge('sankey', {
  draw: function draw(cfg, group) {
    const data = cfg.data;
    const shape = group.addShape('path', {
      attrs: {
        stroke: 'rgba(0,0,0,0.1)',
        lineWidth: Math.max(1, data.width),
        path: pathFn(data)
      }
    });
    return shape;
  }
}, 'line');
const graph = new G6.Graph({
  container: 'mountNode',
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
$.getJSON('https://gw.alipayobjects.com/os/antvdemo/assets/data/energy-flow.json', function(energy) {
  sankey(energy);
  const nodes = [];
  const edges = [];
  energy.nodes.forEach(function(node) {
    const nodeWidth = node.x1 - node.x0;
    const nodeHeight = node.y1 - node.y0;
    nodes.push({
      id: node.name,
      label: node.name,
      style: {
        fill: colors[Math.round(Math.random() * 15)]
      },
      x: node.x0 + 7.5,
      y: node.y0 + nodeHeight / 2,
      size: [ nodeWidth, nodeHeight ],
      shape: 'rect',
      labelCfg: {
        position: node.x1 > width / 2 ? 'left' : 'right',
        offset: 5
      }
    });
  });
  energy.links.forEach(function(edge) {
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
  graph.data({ nodes, edges });
  graph.render();
  graph.fitView();
  graph.on('edge:mouseenter', function(e) {
    graph.setItemState(e.item, 'active', true);
  });
  graph.on('edge:mouseleave', function(e) {
    graph.setItemState(e.item, 'active', false);
  });
});
