/**
 * Custom a pie chart node
 */
import { Graph, Extensions, extend, stdLib } from '@antv/g6';

class PointChartNode extends Extensions.CircleNode {
  drawOtherShapes(model, shapeMap) {
    const { data: cfg } = model;
    const baseR = 30;
    let nowAngle = 0;

    const otherShapes = {};

    // Ref line
    let refR = baseR;
    const refInc = 10;
    for (let i = 0; i < 5; i++) {
      otherShapes[`circle-shape-${i}`] = this.upsertShape(
        'circle',
        `circle-shape-${i}`,
        {
          x: 0,
          y: 0,
          r: (refR += refInc),
          stroke: '#5ad8a6',
          lineDash: [4, 4],
        },
        shapeMap,
        model,
      );
    }
    const everyIncAngle = (2 * Math.PI * (360 / 5 / 5)) / 360;
    nowAngle = nowAngle + everyIncAngle / 2;
    cfg.details.forEach((cat, dIndex) => {
      // Calculate the positions for vertexes
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

      console.log('postions', postions);

      // add marks
      postions.forEach((pos, i) => {
        if (i !== 5) {
          otherShapes[`circle-marker-shape-${dIndex}-${i}`] = this.upsertShape(
            'circle',
            `circle-marker-shape-${dIndex}-${i}`,
            { x: 20 * i, y: 30 * i, r: 3, lineWidth: 2, stroke: cat.color, zIndex: 20, fill: 'red' },
            shapeMap,
            model,
          );
        }
      });
    });

    let nowAngle2 = 0;
    const everyIncAngleCat = (2 * Math.PI * (360 / 5)) / 360;
    for (let i = 0; i < 5; i++) {
      const r = 30 + 50;
      const xPos = r * Math.cos(nowAngle2);
      const yPos = r * Math.sin(nowAngle2);

      otherShapes[`path-shape-${i}`] = this.upsertShape(
        'path',
        `path-shape-${i}`,
        {
          path: [
            ['M', 0, 0],
            ['L', xPos, yPos],
          ],
          lineDash: [4, 4],
          stroke: '#5ad8a6',
        },
        shapeMap,
        model,
      );
      nowAngle2 += everyIncAngleCat;
    }
    // add a circle with the same color with the background color
    otherShapes['circle-shape'] = this.upsertShape(
      'circle',
      'circle-shape',
      { x: 0, y: 0, r: baseR, fill: cfg.centerColor, stroke: 'darkgray' },
      shapeMap,
      model,
    );

    if (cfg.label) {
      otherShapes['text-shape'] = this.upsertShape(
        'circle',
        'text-shape',
        { x: 0, y: 0, textAlign: 'center', textBaseline: 'middle', text: cfg.label, fill: '#fff', fontStyle: 'bold' },
        shapeMap,
        model,
      );
    }
    console.log('otherShapes', otherShapes);
    return otherShapes;
  }
}

const ExtGraph = extend(Graph, {
  nodes: {
    'point-chart-node': PointChartNode,
  },
});

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const graph = new ExtGraph({
  container: 'container',
  width,
  height,
  autoFit: 'center',
  modes: {
    default: ['drag-node'],
  },
  data: {
    nodes: [
      {
        id: 'point1',
        data: {
          x: 150,
          y: 150,
          details: [
            { cat: 'pv', values: [20, 30, 40, 30, 30], color: '#5B8FF9' },
            { cat: 'dal', values: [40, 30, 20, 30, 50], color: '#5AD8A6' },
            { cat: 'uv', values: [40, 30, 30, 40, 40], color: '#5D7092' },
            { cat: 'sal', values: [20, 30, 50, 20, 20], color: '#F6BD16' },
            { cat: 'cal', values: [10, 10, 20, 20, 20], color: '#E8684A' },
          ],
          centerColor: '#5b8ff9',
        },
      },
      {
        id: 'point2',
        data: {
          x: 500,
          y: 150,
          details: [
            { cat: 'pv', values: [10, 10, 50, 20, 10], color: '#5ad8a6' },
            { cat: 'dal', values: [20, 30, 10, 50, 40], color: '#ff99c3' },
            { cat: 'uv', values: [10, 50, 30, 20, 30], color: '#6dc8ec' },
            { cat: 'sal', values: [50, 30, 20, 20, 20], color: '#269a99' },
            { cat: 'cal', values: [50, 10, 20, 50, 30], color: '#9270CA' },
          ],
          centerColor: '#5b8ff9',
        },
      },
    ],
    edges: [{ id: 'edge1', source: 'point1', target: 'point2' }],
  },

  node: {
    type: 'point-chart-node',
    iconShape: {
      text: {
        fields: ['id'],
        formatter: (model) => model.id,
      },
    },
    otherShapes: {},
  },
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
