import G6 from '@antv/g6';
G6.registerEdge('circle-running', {
  afterDraw(cfg, group) {
    // 获得当前边的第一个图形，这里是边本身的 path
    const shape = group.get('children')[0];
    // 边 path 的起点位置
    const startPoint = shape.getPoint(0);

    // 添加红色 circle 图形
    const circle = group.addShape('circle', {
      attrs: {
        x: startPoint.x,
        y: startPoint.y,
        fill: '#1890ff',
        r: 3
      }
    });

    // 对红色圆点添加动画
    circle.animate(ratio => { // 每一帧的操作，入参 ratio：这一帧的比例值（Number）。返回值：这一帧需要变化的参数集（Object）。
      // 根据比例值，获得在边 path 上对应比例的位置。
      const tmpPoint = shape.getPoint(ratio);
      // 返回需要变化的参数集，这里返回了位置 x 和 y
      return {
        x: tmpPoint.x,
        y: tmpPoint.y
      };
    }, {
      repeat: true, // 动画重复
      duration: 3000// 一次动画的时间长度
    });
  }
}, 'cubic');  // 该自定义边继承内置三阶贝塞尔曲线 cubic

const data = {
  nodes: [{
    id: 'node1',
    x: 100,
    y: 100,
    label: '节点1',
    labelCfg: {
      position: 'top'
    }
  }, {
    id: 'node2',
    x: 300,
    y: 200,
    color: '#40a9ff',
    label: '节点2',
    labelCfg: {
      position: 'left',
      offset: 10
    }
  }],
  edges: [{
    source: 'node1',
    target: 'node2'
  }
  ]
};

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  defaultNode: {
    size: 45,
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9'
    }
  },
  defaultEdge: {
    type: 'circle-running',
    style: {
      lineWidth: 2,
      stroke: '#bae7ff'
    }
  }
});
graph.data(data);
graph.render();
