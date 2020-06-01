import G6 from '@antv/g6';

/**
 * Custom stacked bar chart node
 * by Jingxi
 *
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

// Custom stacked bar chart node
G6.registerNode('stacked-bar-node', {
  draw(cfg, group) {
    /*
      G:
      Fan
      x: the circle center of the fan
      y: the circle center of the fan
      rs: inner radius
      re: outer radius
      startAngle: start angle
      endAngle: end angle
      clockwise: render clockwisely if it is true
    */
    const baseR = 30;
    let nowAngle = 0;
    const everyIncAngle = (2 * Math.PI * (360 / 5 / 5)) / 360;
    cfg.details.forEach(cat => {
      cat.values.forEach(item => {
        const baseNbr = Math.ceil(item / 10);
        const baseIncR = 7;
        let nowStartR = baseR;
        const last = item % 10;
        const endAngle = nowAngle + everyIncAngle;
        for (let i = 0; i < baseNbr; i++) {
          const path0 = getPath(0, 0, nowStartR, nowStartR + baseIncR, nowAngle, endAngle, false);
          group.addShape('path', {
            attrs: {
              path: path0,
              stroke: 'darkgray',
              fill: cat.color,
            },
            name: 'path-shape1',
          });
          nowStartR = nowStartR + baseIncR + 2;
          if (i === baseNbr - 1 && last !== 0) {
            const path1 = getPath(
              0,
              0,
              nowStartR,
              nowStartR + (baseIncR * last) / 10,
              nowAngle,
              endAngle,
              false,
            );
            group.addShape('path', {
              attrs: {
                path: path1,
                stroke: 'darkgray',
                fill: cat.color,
              },
              name: 'path-shape2',
            });
          }
        }
        nowAngle = endAngle;
      });
    });

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
          x: 0,
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
      id: 'nodeF',
      x: 150,
      y: 150,
      label: 'StackedBar1',
      type: 'stacked-bar-node',
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
      id: 'nodeF2',
      x: 500,
      y: 150,
      label: 'StackedBar2',
      type: 'stacked-bar-node',
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
      source: 'nodeF',
      target: 'nodeF2',
    },
  ],
};

graph.data(data);
graph.render();
