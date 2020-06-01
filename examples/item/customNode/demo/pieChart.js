import G6 from '@antv/g6';

/**
 * Custom a pie chart node
 * by Shiwu
 *
 */
const lightBlue = '#5b8ff9';
const lightOrange = '#5ad8a6';

// register a pie chart node
G6.registerNode('pie-node', {
  draw: (cfg, group) => {
    const radius = cfg.size / 2; // node radius
    const inPercentage = cfg.inDegree / cfg.degree; // the ratio of indegree to outdegree
    const inAngle = inPercentage * Math.PI * 2; // the anble for the indegree fan
    const inArcEnd = [radius * Math.cos(inAngle), radius * Math.sin(inAngle)]; // the end position for the in-degree fan
    let isInBigArc = 1,
      isOutBigArc = 0;
    if (inAngle > Math.PI) {
      isInBigArc = 0;
      isOutBigArc = 1;
    }
    // fan shape for the in degree
    const fanIn = group.addShape('path', {
      attrs: {
        path: [
          ['M', radius, 0],
          ['A', radius, radius, 0, isInBigArc, 0, inArcEnd[0], inArcEnd[1]],
          ['L', 0, 0],
          ['Z'],
        ],
        lineWidth: 0,
        fill: lightOrange,
      },
      name: 'in-fan-shape',
    });
    // draw the fan shape
    group.addShape('path', {
      attrs: {
        path: [
          ['M', inArcEnd[0], inArcEnd[1]],
          ['A', radius, radius, 0, isOutBigArc, 0, radius, 0],
          ['L', 0, 0],
          ['Z'],
        ],
        lineWidth: 0,
        fill: lightBlue,
      },
      name: 'out-fan-shape',
    });
    // 返回 keyshape
    return fanIn;
  },
});

const data = {
  nodes: [
    {
      id: 'pie1',
      size: 80,
      inDegree: 80,
      degree: 360,
      x: 150,
      y: 150,
    },
    {
      id: 'pie2',
      size: 80,
      inDegree: 280,
      degree: 360,
      x: 350,
      y: 150,
    },
  ],
  edges: [
    {
      source: 'pie1',
      target: 'pie2',
    },
  ],
};
const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  // translate the graph to align the canvas's center, support by v3.5.1
  fitCenter: true,
  linkCenter: true,
  defaultNode: {
    type: 'pie-node',
  },
});

graph.data(data);
graph.render();
