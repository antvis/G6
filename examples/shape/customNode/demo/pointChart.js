import G6 from '@antv/g6';
/**
     * 该案例演示如何自定义一个标注点节点
     * by 镜曦
     *
    */

    // 自定义标注点节点
G6.registerNode('justPoints', {
  draw(cfg, group) {

    const baseR = 30;
    let nowAngle = 0;

    // Ref line
    let refR = baseR;
    const refInc = 10;
    for (let i = 0; i < 5; i++) {
      group.addShape('circle', {
        // attrs: style
        attrs: {
          x: 0, // 居中
          y: 0,
          r: refR += refInc,
          stroke: '#5ad8a6',
          lineDash: [ 4, 4 ]

        }
      });
    }
    const everyIncAngle = 2 * Math.PI * (360 / 5 / 5) / 360;
    nowAngle = nowAngle + everyIncAngle / 2;
    cfg.details.forEach(cat => {
      // 计算一系列点的位置
      const postions = [];
      cat.values.forEach((item, index) => {
        const r = baseR + item;
        const xPos = r * Math.cos(nowAngle);
        const yPos = r * Math.sin(nowAngle);
        nowAngle += everyIncAngle;
        postions.push([ xPos, yPos ]);
        if (index === 4) {
          const r = baseR + item;
          const xPos = r * Math.cos(nowAngle);
          const yPos = r * Math.sin(nowAngle);
          postions.push([ xPos, yPos ]);
        }
      });

      // 添加标注点
      postions.forEach((pos, index) => {
        if (index !== 5) {
          group.addShape('circle', {
                // attrs: style
            attrs: {
              x: pos[0], // 居中
              y: pos[1],
              r: 3,
              // fill: 'black',
              lineWidth: 2,
              stroke: cat.color
            }
          });
        }
      });
    });

    let nowAngle2 = 0;
    const everyIncAngleCat = 2 * Math.PI * (360 / 5) / 360;
    for (let i = 0; i < 5; i++) {
      const r = 30 + 50;
      const xPos = r * Math.cos(nowAngle2);
      const yPos = r * Math.sin(nowAngle2);

      group.addShape('path', {
        attrs: {
          path: [
                [ 'M', 0, 0 ],
                [ 'L', xPos, yPos ]
          ],
          lineDash: [ 4, 4 ],

          stroke: '#5ad8a6' // 颜色应用到边上，如果应用到填充，则使用 fill: cfg.color
        }
      });
      nowAngle2 += everyIncAngleCat;
    }
    // 添加一个和背景色相同的圆形
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
          fill: '#fff',
          fontStyle: 'bold'
        }
      });
    }
    return group;
  }
});

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight;
const graph = new G6.Graph({
  container: 'container',
  width,
  height
});

const data = {
  nodes: [
    {
      id: 'nodeC',
      x: 250,
      y: 150,
      label: 'Point',
      shape: 'justPoints',
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
    }
  ]
};

graph.data(data);
graph.render();
