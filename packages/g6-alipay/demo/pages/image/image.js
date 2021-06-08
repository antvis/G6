import G6 from '@antv/g6-mobile';

const data = {
  nodes: [
    {
      id: 'node0',
      img:
        'https://yyb.gtimg.com/aiplat/page/product/visionimgidy/img/demo6-16a47e5d31.jpg?max_age=31536000',
      type: 'image',
      size: 200,
      label: 'AntV Team',
      labelCfg: {
        position: 'bottom',
      },
      // 裁剪图片配置
      clipCfg: {
        show: false,
        type: 'circle',
        r: 15,
      },
    },
    {
      id: 'node1',
      img:
        'https://yyb.gtimg.com/aiplat/page/product/visionimgidy/img/demo6-16a47e5d31.jpg?max_age=31536000',
      type: 'circle',
      size: 200,
      label: 'AntV Team',
      labelCfg: {
        position: 'bottom',
      },
    },
  ],
  edges: [{ source: 'node0', target: 'node1' }],
};

Page({
  data: {
    width: 300,
    height: 400,
    pixelRatio: 1,
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
    console.log(ctx, rect, canvas, renderer);

    this.graph = new G6.Graph({
      context: ctx,
      renderer,
      width: this.data.width,
      height: this.data.height,
      extra: {
        createImage: canvas && canvas.createImage,
      },
      defaultNode: {
        type: 'image',
        label: 'AntV Team',
        // 其他配置
      },
      modes: {
        default: ['drag-canvas', 'drag-node', 'zoom-canvas'],
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

    this.graph.on('panstart', (e) => {
      console.log('pan', e);
    });
    this.graph.on('panmove', (e) => {
      console.log('pan move', e);
    });
    this.graph.on('panend', (e) => {
      console.log('pan end', e);
    });
  },
  onTouch(e) {
    this.graph.emitEvent(e);
  },
});
