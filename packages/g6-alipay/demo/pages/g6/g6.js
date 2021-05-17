import G6 from '@antv/g6-mobile';
import forceLayout from '@antv/g6-mobile/dist/extends/layout/forceLayout';

G6.registerLayout('force', forceLayout);

function refreshDragedNodePosition(e) {
  const model = e.item.get('model');
  model.fx = e.x;
  model.fy = e.y;
}

const data = {
  nodes: [
    { id: 'node0', size: 50 },
    { id: 'node1', size: 30 },
    { id: 'node2', size: 30 },
    { id: 'node3', size: 30 },
    { id: 'node4', size: 30, isLeaf: true },
    { id: 'node5', size: 30, isLeaf: true },
    { id: 'node6', size: 15, isLeaf: true },
    { id: 'node7', size: 15, isLeaf: true },
    { id: 'node8', size: 15, isLeaf: true },
    { id: 'node9', size: 15, isLeaf: true },
    { id: 'node10', size: 15, isLeaf: true },
    { id: 'node11', size: 15, isLeaf: true },
    { id: 'node12', size: 15, isLeaf: true },
    { id: 'node13', size: 15, isLeaf: true },
    { id: 'node14', size: 15, isLeaf: true },
    { id: 'node15', size: 15, isLeaf: true },
    { id: 'node16', size: 15, isLeaf: true },
  ],
  edges: [
    { source: 'node0', target: 'node1' },
    { source: 'node0', target: 'node2' },
    { source: 'node0', target: 'node3' },
    { source: 'node0', target: 'node4' },
    { source: 'node0', target: 'node5' },
    { source: 'node1', target: 'node6' },
    { source: 'node1', target: 'node7' },
    { source: 'node2', target: 'node8' },
    { source: 'node2', target: 'node9' },
    { source: 'node2', target: 'node10' },
    { source: 'node2', target: 'node11' },
    { source: 'node2', target: 'node12' },
    { source: 'node2', target: 'node13' },
    { source: 'node3', target: 'node14' },
    { source: 'node3', target: 'node15' },
    { source: 'node3', target: 'node16' },
  ],
};

Page({
  data: {
    width: 500,
    height: 500,
  },
  onLoad() {
    const { windowWidth, windowHeight, pixelRatio } = my.getSystemInfoSync();
    this.setData({
      width: windowWidth,
      height: windowHeight,
      pixelRatio,
    });
  },
  onCanvasInit(ctx, rect, canvas, renderer) {
    console.log(ctx, rect, canvas);
    this.graph = new G6.Graph({
      context: ctx,
      renderer,
      width: this.data.width,
      height: this.data.height,
      fitView: true,
      layout: {
        type: 'force',
        preventOverlap: true,
        linkDistance: (d) => {
          if (d.source.id === 'node0') {
            return 100;
          }
          return 30;
        },
        nodeStrength: (d) => {
          if (d.isLeaf) {
            return -50;
          }
          return -10;
        },
        edgeStrength: (d) => {
          if (
            d.source.id === 'node1' ||
            d.source.id === 'node2' ||
            d.source.id === 'node3'
          ) {
            return 0.7;
          }
          return 0.1;
        },
        onTick: () => {
          const nodeItems = this.graph.getNodes();
          const height = this.graph.get('height');
          const width = this.graph.get('width');
          const padding = 10;
          nodeItems.forEach((item) => {
            const model = item.getModel();
            if (model.x > width - padding) model.x = width - padding;
            else if (model.x < padding) model.x = padding;

            if (model.y > height - padding) model.y = height - padding;
            else if (model.y < padding) model.y = padding;
          });
        },
      },
      defaultNode: {
        color: '#5B8FF9',
      },
      modes: {
        default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
      },
    });
    const { nodes } = data;
    this.graph.data({
      nodes,
      edges: data.edges.map((edge, i) => {
        edge.id = `edge${i}`;
        return Object.assign({}, edge);
      }),
    });
    this.graph.render();
    this.graph.on('node:dragstart', (e) => {
      this.graph.layout();
      refreshDragedNodePosition(e);
    });
    this.graph.on('node:drag', (e) => {
      refreshDragedNodePosition(e);
    });
    this.graph.on('node:dragend', (e) => {
      e.item.get('model').fx = null;
      e.item.get('model').fy = null;
    });
  },
  onTouch(e) {
    this.graph.emitEvent(e);
  },
});
