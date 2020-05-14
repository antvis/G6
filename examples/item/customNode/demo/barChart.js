import G6 from '@antv/g6';

/**
 * 该案例演示如何自定义一个类似南丁格尔玫瑰一样的节点
 * by 镜曦
 */

/**
 * 注册一个类似南丁格尔玫瑰一样的节点
 */

const getPath = (cx, cy, rs, re, startAngle, endAngle, clockwise) => {
  const flag1 = clockwise ? 1 : 0;
  const flag2 = clockwise ? 0 : 1;
  return [
    ['M', Math.cos(startAngle) * rs + cx, Math.sin(startAngle) * rs + cy],
    ['L', Math.cos(startAngle) * re + cx, Math.sin(startAngle) * re + cy],
    ['A', re, re, 0, 0, flag1, Math.cos(endAngle) * re + cx, Math.sin(endAngle) * re + cy],
    ['L', Math.cos(endAngle) * rs + cx, Math.sin(endAngle) * rs + cy],
    ['A', rs, rs, 0, 0, flag2, Math.cos(startAngle) * rs + cx, Math.sin(startAngle) * rs + cy],
    ['Z'],
  ];
};
G6.registerNode('circleBar', {
  draw(cfg, group) {
    /*
      G：
      Fan
      x: 扇形圆心的 x 坐标
      y: 扇形圆心的 y 坐标
      rs: 内圈半径
      re: 外圈半径
      startAngle: 起点弧度
      endAngle: 终点弧度
      clockwise: 为true时顺时针渲染，为false时逆时针渲染
    */
    const baseR = 30;
    let nowAngle = 0;
    const everyIncAngle = (2 * Math.PI * (360 / 5 / 5)) / 360;
    cfg.details.forEach(cat => {
      cat.values.forEach(item => {
        const re = item + baseR;
        const path0 = getPath(
          0,
          0,
          baseR,
          item + baseR,
          nowAngle,
          (nowAngle += everyIncAngle),
          false,
        );
        const fan = group.addShape('path', {
          attrs: {
            path: path0,
            stroke: 'darkgray',
            fill: cat.color,
          },
          name: 'path-shape',
        });
        // 加上交互动画
        fan.on('mouseenter', () => {
          fan.animate(
            {
              re: re + 8,
            },
            {
              repeat: false,
              duration: 300,
            },
          );
        });
        fan.on('mouseleave', () => {
          fan.animate(
            {
              re,
            },
            {
              repeat: false,
              duration: 300,
            },
          );
        });
        // 设置class
        fan.set('className', 'littleCircle');
      });
    });
    group.addShape('circle', {
      attrs: {
        x: 0, // 居中
        y: 0,
        r: baseR,
        fill: cfg.centerColor,
        stroke: 'darkgray',
      },
      name: 'circle-shape',
    });
    if (cfg.label) {
      group.addShape('text', {
        attrs: {
          x: 0, // 居中
          y: 0,
          textAlign: 'center',
          textBaseline: 'middle',
          text: cfg.label,
          fill: 'white',
          fontStyle: 'bold',
        },
        name: 'text-shape',
      });
    }
    return group;
  },
});

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
});

const data = {
  nodes: [
    {
      id: 'nodeA',
      x: 150,
      y: 150,
      label: 'Bar1',
      type: 'circleBar',
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
      details: [
        { cat: 'pv', values: [20, 30, 40, 30, 30], color: '#5B8FF9' },
        { cat: 'dal', values: [40, 30, 20, 30, 50], color: '#5AD8A6' },
        { cat: 'uv', values: [40, 30, 30, 40, 40], color: '#5D7092' },
        { cat: 'sal', values: [20, 30, 50, 20, 20], color: '#F6BD16' },
        { cat: 'cal', values: [10, 10, 20, 20, 20], color: '#E8684A' },
      ],
      centerColor: '#5b8ff9',
    },
    {
      id: 'nodeA2',
      x: 500,
      y: 150,
      label: 'Bar2',
      type: 'circleBar',
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
      details: [
        { cat: 'pv', values: [10, 10, 80, 20, 10], color: '#5ad8a6' },
        { cat: 'dal', values: [20, 30, 10, 50, 40], color: '#ff99c3' },
        { cat: 'uv', values: [10, 50, 30, 20, 30], color: '#6dc8ec' },
        { cat: 'sal', values: [70, 30, 20, 20, 20], color: '#269a99' },
        { cat: 'cal', values: [50, 10, 20, 70, 30], color: '#9270CA' },
      ],
      centerColor: '#5b8ff9',
    },
  ],
  edges: [
    {
      source: 'nodeA',
      target: 'nodeA2',
    },
  ],
};

graph.data(data);
graph.render();
