import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'image',
      img: 'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg',
      x: 250,
      y: 150
    }
  ]
};

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  defaultNode: {
    shape: 'image',
    size: [ 260, 80 ],
    clipCfg: {
      show: false,
      // 裁剪类型可以为：circle、ellipse、rect、path等
      type: 'circle',
      // circle
      r: 30,
      // clip 的属性样式
      style: {
        lineWidth: 1
      }
    }
  },
  modes: {
    default: [ 'drag-canvas', 'drag-node' ]
  }
});

graph.data(data);
graph.render();

