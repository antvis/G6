import G6 from '@antv/g6';

/**
 * Custom a line chart node
 * by Jingxi
 *
 */

// Custom a line chart node
G6.registerNode('circleLine', {
  draw(cfg, group) {
    const baseR = 30;
    let nowAngle = 0;

    // Ref line
    let refR = baseR;
    const refInc = 10;
    for (let i = 0; i < 5; i++) {
      group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0,
          r: (refR += refInc),
          stroke: '#bae7ff',
          lineDash: [4, 4],
        },
        name: 'circle-shape',
      });
    }

    const everyIncAngle = (2 * Math.PI * (360 / 5 / 5)) / 360;
    cfg.details.forEach(cat => {
      // 计算一系列点的位置
      const postions = [];
      cat.values.forEach((item, index) => {
        const r = baseR + item;
        const xPos = r * Math.cos(nowAngle);
        const yPos = r * Math.sin(nowAngle);
        nowAngle += everyIncAngle;
        postions.push([xPos, yPos]);
        if (index === 4) {
          const r = baseR + item;
          const xPos = r * Math.cos(nowAngle);
          const yPos = r * Math.sin(nowAngle);
          postions.push([xPos, yPos]);
        }
      });
      const pathArrayL = postions.map(item => ['L', ...item]);
      // add the connecting line
      group.addShape('path', {
        attrs: {
          path: [
            ['M', 0, 0], // the top vertex
            ...pathArrayL,
            ['Z'], // close the path
          ],
          stroke: cat.color,
        },
        name: 'path-shape',
      });

      postions.forEach((pos, index) => {
        if (index !== 5) {
          const littleCircle = group.addShape('circle', {
            // attrs: style
            attrs: {
              x: pos[0],
              y: pos[1],
              r: 2,
              fill: 'black',
              stroke: cat.color,
              cursor: 'pointer',
            },
            name: 'circle-shape',
          });
          // 加上交互动画
          littleCircle.on('mouseenter', function () {
            littleCircle.animate(
              {
                r: 5,
              },
              {
                repeat: false,
                duration: 200,
              },
            );
          });
          littleCircle.on('mouseleave', function () {
            littleCircle.animate(
              {
                r: 2,
              },
              {
                repeat: false,
                duration: 200,
              },
            );
          });
          // set the name
          littleCircle.set('name', 'littleCircle');
        }
      });
    });

    // add a circle with the same color with the background color
    group.addShape('circle', {
      attrs: {
        x: 0,
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
  // translate the graph to align the canvas's center, support by v3.5.1
  fitCenter: true,
});

const data = {
  nodes: [
    {
      id: 'nodeB',
      x: 150,
      y: 150,
      label: 'Line1',
      type: 'circleLine',
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
      id: 'nodeB2',
      x: 500,
      y: 150,
      label: 'Line2',
      type: 'circleLine',
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
      details: [
        { cat: 'pv', values: [10, 10, 50, 20, 10], color: '#5ad8a6' },
        { cat: 'dal', values: [20, 30, 10, 50, 40], color: '#ff99c3' },
        { cat: 'uv', values: [10, 50, 30, 20, 30], color: '#6dc8ec' },
        { cat: 'sal', values: [50, 30, 20, 20, 20], color: '#269a99' },
        { cat: 'cal', values: [50, 10, 20, 50, 30], color: '#9270CA' },
      ],
      centerColor: '#5b8ff9',
    },
  ],
  edges: [
    {
      source: 'nodeB',
      target: 'nodeB2',
    },
  ],
};

// graph.get('container').style.background = '#5d7092';

graph.data(data);
graph.render();
