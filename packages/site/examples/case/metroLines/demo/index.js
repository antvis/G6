import G6 from '@antv/g6';
/**
 * 该示例演示自定义节点和边实现动态地铁图效果
 * by 十吾
 */
const colors = [
  'rgb(64, 174, 247)',
  'rgb(108, 207, 169)',
  'rgb(157, 223, 125)',
  'rgb(240, 198, 74)',
  'rgb(221, 158, 97)',
  'rgb(141, 163, 112)',
  'rgb(115, 136, 220)',
  'rgb(133, 88, 219)',
  'rgb(203, 135, 226)',
  'rgb(227, 137, 163)',
];
// custom the node
G6.registerNode(
  'breath-node',
  {
    afterDraw(cfg, group) {
      const r = cfg.size / 2;
      const back1 = group.addShape('circle', {
        zIndex: -3,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: cfg.color || (cfg.style && cfg.style.fill),
          opacity: 0.6,
        },
        name: 'back1-shape',
      });
      const back2 = group.addShape('circle', {
        zIndex: -2,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: cfg.color,
          // 为了显示清晰，随意设置了颜色
          opacity: 0.6,
        },
        name: 'back2-shape',
      });
      const back3 = group.addShape('circle', {
        zIndex: -1,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: cfg.color,
          opacity: 0.6,
        },
        name: 'back3-shape',
      });
      group.sort(); // 排序，根据zIndex 排序
      const delayBase = Math.random() * 2000;
      back1.animate(
        {
          // 逐渐放大，并消失
          r: r + 10,
          opacity: 0.0,
        },
        {
          repeat: true, // 循环
          duration: 3000,
          easing: 'easeCubic',
          delay: delayBase, // 无延迟
        },
      );
      back2.animate(
        {
          // 逐渐放大，并消失
          r: r + 10,
          opacity: 0.0,
        },
        {
          repeat: true, // 循环
          duration: 3000,
          easing: 'easeCubic',
          delay: delayBase + 1000, // 1 秒延迟
        },
      );
      back3.animate(
        {
          // 逐渐放大，并消失
          r: r + 10,
          opacity: 0.0,
        },
        {
          repeat: true, // 循环
          duration: 3000,
          easing: 'easeCubic',
          delay: delayBase + 2000, // 2 秒延迟
        },
      );
    },
  },
  'circle',
);

// custom the edge
G6.registerEdge(
  'running-polyline',
  {
    afterDraw(cfg, group) {
      const shape = group.get('children')[0];
      const length = shape.getTotalLength();
      let circleCount = Math.ceil(length / 20);
      circleCount = circleCount === 0 ? 1 : circleCount;

      const _loop = function _loop(i) {
        const delay = Math.random() * 1000;
        const start = shape.getPoint(i / circleCount);
        const circle = group.addShape('circle', {
          attrs: {
            x: start.x,
            y: start.y,
            r: 0.8,
            fill: '#A0F3AF',
            shadowColor: '#fff',
            shadowBlur: 30,
          },
          name: 'circle-shape',
        });
        circle.animate(
          (ratio) => {
            ratio += i / circleCount;
            if (ratio > 1) {
              ratio %= 1;
            }
            const tmpPoint = shape.getPoint(ratio);
            return {
              x: tmpPoint.x,
              y: tmpPoint.y,
            };
          },
          {
            repeat: true,
            duration: 10 * length,
            easing: 'easeCubic',
            delay,
          },
        );
      };

      for (let i = 0; i < circleCount; i++) {
        _loop(i);
      }
    },
  },
  'polyline',
);

const graph = new G6.Graph({
  container: 'container',
  width: 500,
  height: 500,
  modes: {
    default: [
      {
        type: 'edge-tooltip',
        formatText: function formatText(model) {
          const text = model.class;
          return text;
        },
      },
    ],
  },
  defaultNode: {
    type: 'breath-node',
    size: 3,
    style: {
      lineWidth: 0,
      fill: 'rgb(240, 223, 83)',
    },
  },
  defaultEdge: {
    type: 'running-polyline',
    size: 1,
    color: 'rgb(14,142,63)',
    style: {
      opacity: 0.4,
      lineAppendWidth: 3,
    },
  },
});

const graphSize = [500, 500];
fetch('https://gw.alipayobjects.com/os/basement_prod/8c2353b0-99a9-4a93-a5e1-3e7df1eac64f.json')
  .then((res) => res.json())
  .then((data) => {
    const nodes = data.nodes;
    const edges = data.edges;
    const classMap = new Map();
    let classId = 0;
    nodes.forEach(function (node) {
      node.y = -node.y;
    });
    edges.forEach(function (edge) {
      edge.id = `edge-${edge.id}`;
      // edge cluster
      if (edge.class && classMap.get(edge.class) === undefined) {
        classMap.set(edge.class, classId);
        classId++;
      }
      const cid = classMap.get(edge.class);
      edge.color = colors[cid % colors.length];
      const controlPoints = edge.controlPoints;

      controlPoints.forEach(function (cp) {
        cp.y = -cp.y;
      });
    });
    scaleNodesPoints(nodes, edges, graphSize);
    graph.data(data);
    graph.render();
  });

graph.get('container').style.background = '#000';
graph.get('container').style.backgroundImage =
  'url("https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*G23iRqkiibIAAAAAAAAAAABkARQnAQ")';
graph.get('container').style.backgroundSize = '500px 500px';
graph.get('container').style.backgroundRepeat = 'no-repeat';

function scaleNodesPoints(nodes, edges, graphSize) {
  const size = graphSize[0] < graphSize[1] ? graphSize[0] : graphSize[1];
  let minX = 99999999999999999;
  let maxX = -99999999999999999;
  let minY = 99999999999999999;
  let maxY = -99999999999999999;
  nodes.forEach(function (node) {
    if (node.x > maxX) maxX = node.x;
    if (node.x < minX) minX = node.x;
    if (node.y > maxY) maxY = node.y;
    if (node.y < minY) minY = node.y;
  });

  edges.forEach(function (edge) {
    const controlPoints = edge.controlPoints;
    controlPoints.forEach(function (cp) {
      if (cp.x > maxX) maxX = cp.x;
      if (cp.x < minX) minX = cp.x;
      if (cp.y > maxY) maxY = cp.y;
      if (cp.y < minY) minY = cp.y;
    });
  });

  const xScale = maxX - minX;
  const yScale = maxY - minY;
  nodes.forEach(function (node) {
    node.orix = node.x;
    node.oriy = node.y;
    node.x = ((node.x - minX) / xScale) * size;
    node.y = ((node.y - minY) / yScale) * size;
  });
  edges.forEach(function (edge) {
    const controlPoints = edge.controlPoints;
    controlPoints.forEach(function (cp) {
      cp.x = ((cp.x - minX) / xScale) * size;
      cp.y = ((cp.y - minY) / yScale) * size;
    });
  });
}
