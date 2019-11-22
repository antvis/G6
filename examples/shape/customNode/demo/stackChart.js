import G6 from '@antv/g6';

 /**
 * 该案例演示如何自定义一个堆叠柱状图节点
 * by 镜曦
 *
*/

// 自定义标注点节点
G6.registerNode('stacked-bar-node', {
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
    const everyIncAngle = 2 * Math.PI * (360 / 5 / 5) / 360;
    cfg.details.forEach(cat => {
      cat.values.forEach(item => {
        const baseNbr = Math.ceil(item / 10);
        const baseIncR = 7;
        let nowStartR = baseR;
        const last = item % 10;
        const endAngle = nowAngle + everyIncAngle;
        for (let i = 0; i < baseNbr; i++) {
          group.addShape('fan', {
            attrs: {
              x: 0,
              y: 0,
              rs: nowStartR,
              re: nowStartR + baseIncR,
              startAngle: nowAngle,
              endAngle,
              clockwise: false,
              stroke: 'darkgray',
              fill: cat.color
            }
          });
          nowStartR = nowStartR + baseIncR + 2;
          if (i === baseNbr - 1 && last !== 0) {
            group.addShape('fan', {
              attrs: {
                x: 0,
                y: 0,
                rs: nowStartR,
                re: nowStartR + baseIncR * last / 10,
                startAngle: nowAngle,
                endAngle,
                clockwise: false,
                stroke: 'darkgray',
                fill: cat.color
              }
            });
          }
        }
        nowAngle = endAngle;
      });
    });

    group.addShape('circle', {
          // attrs: style
      attrs: {
        x: 0, // 居中
        y: 0,
        r: baseR,
        fill: cfg.centerColor,
        stroke: 'darkgray'
      }
    });
    if (cfg.label) {
      group.addShape('text', {
            // attrs: style
        attrs: {
          x: 0, // 居中
          y: 0,
          textAlign: 'center',
          textBaseline: 'middle',
          text: cfg.label,
          fill: 'white',
          fontStyle: 'bold'
        }
      });
    }
    return group;
  }
});

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height
});

const data = {
  nodes: [
    {
      id: 'nodeF',
      x: 250,
      y: 150,
      label: 'StackedBar',
      shape: 'stacked-bar-node',
      anchorPoints: [
          [ 0, 0.5 ], [ 1, 0.5 ]
      ],
      details: [
        { cat: 'pv', values: [ 20, 30, 40, 30, 30 ], color: '#5B8FF9' },
        { cat: 'dal', values: [ 40, 30, 20, 30, 50 ], color: '#5AD8A6' },
        { cat: 'uv', values: [ 40, 30, 30, 40, 40 ], color: '#5D7092' },
        { cat: 'sal', values: [ 20, 30, 50, 20, 20 ], color: '#F6BD16' },
        { cat: 'cal', values: [ 10, 10, 20, 20, 20 ], color: '#E8684A' }
      ],
      centerColor: '#5b8ff9'
    }]
};

graph.data(data);
graph.render();
