/**
 * Custom Bar chart with @antv/g2
 */
import { Graph, Extensions, extend } from '@antv/g6';
import { stdlib, renderToMountedElement } from '@antv/g2';

const G2Library = { ...stdlib() };
const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

class G2BarChartNode extends Extensions.RectNode {
  drawOtherShapes(model, shapeMap, diffData, diffState) {
    const { id, data } = model;
    const {
      size: [width, height],
      value,
    } = data;

    const group = this.upsertShape(
      'rect',
      'g2-bar-chart-group',
      {
        x: -width / 2,
        y: -height / 2,
        width,
        height,
        fill: '#fff',
        stroke: '#697b8c',
        radius: 10,
        shadowColor: '#697b8c',
        shadowBlur: 10,
        shadowOffsetX: 5,
        shadowOffsetY: 5,
      },
      {
        model,
        shapeMap,
        diffData,
        diffState,
      },
    );

    // to make group trigger DOMNodeInsertedIntoDocument event
    group.isMutationObserved = true;
    group.addEventListener('DOMNodeInsertedIntoDocument', () => {
      renderToMountedElement(
        // @antv/g2 Specification
        // https://g2.antv.antgroup.com/examples/general/interval/#column
        {
          width,
          height,
          data: { value },
          title: id,
          type: 'interval',
          axis: {
            x: { title: false },
            y: { title: false },
          },
          scale: {
            y: { domain: [0, 100] },
          },
          encode: {
            x: 'subject',
            y: 'score',
            color: 'subject',
          },
          legend: { color: false },
        },
        {
          group,
          library: G2Library,
        },
      );
    });

    return {
      'g2-bar-chart-group': group,
    };
  }
}

const ExtGraph = extend(Graph, {
  nodes: {
    'g2-bar-chart': G2BarChartNode,
  },
});

const graph = new ExtGraph({
  container: 'container',
  width,
  height,
  autoFit: 'center',
  modes: {
    default: [
      {
        type: 'drag-node',
        // prevent hide the node when dragging
        enableTransient: false,
      },
    ],
  },
  data: {
    nodes: [
      {
        id: 'Jack',
        data: {
          size: [250, 250],
          value: [
            { subject: 'Math', score: 95 },
            { subject: 'Chinese', score: 70 },
            { subject: 'English', score: 75 },
            { subject: 'Geography', score: 80 },
            { subject: 'Physics', score: 90 },
            { subject: 'Chemistry', score: 85 },
            { subject: 'Biology', score: 70 },
          ],
        },
      },
      {
        id: 'Aaron',
        data: {
          size: [250, 250],
          value: [
            { subject: 'Math', score: 70 },
            { subject: 'Chinese', score: 90 },
            { subject: 'English', score: 90 },
            { subject: 'Geography', score: 60 },
            { subject: 'Physics', score: 70 },
            { subject: 'Chemistry', score: 65 },
            { subject: 'Biology', score: 80 },
          ],
        },
      },
      {
        id: 'Rebecca',
        data: {
          size: [250, 250],
          value: [
            { subject: 'Math', score: 60 },
            { subject: 'Chinese', score: 95 },
            { subject: 'English', score: 100 },
            { subject: 'Geography', score: 80 },
            { subject: 'Physics', score: 60 },
            { subject: 'Chemistry', score: 90 },
            { subject: 'Biology', score: 85 },
          ],
        },
      },
    ],
    edges: [],
  },
  node: {
    type: 'g2-bar-chart',
    otherShapes: {},
    keyShape: {
      width: {
        fields: ['size'],
        formatter: (model) => model.data.size[0],
      },
      height: {
        fields: ['size'],
        formatter: (model) => model.data.size[1],
      },
      opacity: 0,
    },
  },
});

window.graph = graph;
const btnContainer = document.createElement('div');
btnContainer.style.position = 'absolute';
container.appendChild(btnContainer);
const tip = document.createElement('span');
tip.innerHTML = '👉 Try to:';
btnContainer.appendChild(tip);

const students = ['Emily', 'Liam', 'Olivia', 'Ethan', 'Sophia', 'Mason'];

['Add Student'].forEach((name, i) => {
  const btn = document.createElement('a');
  btn.innerHTML = name;
  btn.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
  btn.style.padding = '4px';
  btn.style.marginLeft = i > 0 ? '24px' : '8px';
  btnContainer.appendChild(btn);
  btn.addEventListener('click', () => {
    const student = students.shift();
    if (!student) return;
    const randomScore = () => 60 + Math.floor(Math.random() * 40);
    graph.addData('node', {
      id: student,
      data: {
        size: [250, 250],
        value: [
          { subject: 'Math', score: randomScore() },
          { subject: 'Chinese', score: randomScore() },
          { subject: 'English', score: randomScore() },
          { subject: 'Geography', score: randomScore() },
          { subject: 'Physics', score: randomScore() },
          { subject: 'Chemistry', score: randomScore() },
          { subject: 'Biology', score: randomScore() },
        ],
      },
    });
    graph.layout();
  });
});
