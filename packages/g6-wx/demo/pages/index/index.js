const G6 = require('../../g6/g6');
const force = require('../../g6/extends/layout/forceLayout');

G6.registerLayout('force', force);

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
    { source: 'node0', target: 'node1', id: 'edge0' },
    { source: 'node0', target: 'node2', id: 'edge1' },
    { source: 'node0', target: 'node3', id: 'edge2' },
    { source: 'node0', target: 'node4', id: 'edge3' },
    { source: 'node0', target: 'node5', id: 'edge4' },
    { source: 'node1', target: 'node6', id: 'edge5' },
    { source: 'node1', target: 'node7', id: 'edge6' },
    { source: 'node2', target: 'node8', id: 'edge7' },
    { source: 'node2', target: 'node9', id: 'edge8' },
    { source: 'node2', target: 'node10', id: 'edge9' },
    { source: 'node2', target: 'node11', id: 'edge10' },
    { source: 'node2', target: 'node12', id: 'edge11' },
    { source: 'node2', target: 'node13', id: 'edge12' },
    { source: 'node3', target: 'node14', id: 'edge13' },
    { source: 'node3', target: 'node15', id: 'edge14' },
    { source: 'node3', target: 'node16', id: 'edge15' },
  ],
};
function refreshDragedNodePosition(e) {
  const model = e.item.get('model');
  model.fx = e.x;
  model.fy = e.y;
}

Page({
  data: {
    canvasWidth: 100,
    canvasHeight: 100,
    pixelRatio: 1,
    onCanvasInit(ctx, rect, canvas, renderer) {
      console.log(ctx, rect, canvas, renderer, this, G6);
      this.graph = new G6.Graph({
        context: ctx,
        renderer,
        width: rect.width,
        height: rect.height,
        defaultNode: {
          color: '#5B8FF9',
        },
        modes: {
          default: ['drag-canvas', 'drag-node', 'zoom-canvas'],
        },
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
        },
      });
      this.graph.data(data);
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
      console.log('canvas ontouch', e);
      this.graph.emitEvent(e);
    },
  },
  onLoad() {
    const { windowWidth, windowHeight, pixelRatio } = wx.getSystemInfoSync();
    this.setData({
      canvasWidth: windowWidth,
      canvasHeight: windowHeight,
      pixelRatio,
    });
  },
});
