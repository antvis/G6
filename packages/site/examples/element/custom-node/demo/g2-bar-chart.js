import { Rect as RectGeometry } from '@antv/g';
import { renderToMountedElement, stdlib } from '@antv/g2';
import { ExtensionCategory, Graph, Rect, register } from '@antv/g6';

class BarChart extends Rect {
  onCreate() {
    const [width, height] = this.getSize();
    const group = this.upsert(
      'chart-container',
      RectGeometry,
      {
        transform: `translate(${-width / 2}, ${-height / 2})`,
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
      this.shapeMap.key,
    );

    const { name, value } = this.attributes;
    renderToMountedElement(
      // @antv/g2 Specification
      // https://g2.antv.antgroup.com/examples/general/interval/#column
      {
        width,
        height,
        data: { value },
        title: name,
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
        library: stdlib(),
      },
    );
  }
}

register(ExtensionCategory.NODE, 'bar-chart', BarChart);

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      {
        id: 'Jack',
        data: {
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
  },
  node: {
    type: 'bar-chart',
    style: {
      size: 250,
      fillOpacity: 0,
      name: (d) => d.id,
      value: (d) => d.data.value,
    },
  },
  layout: {
    type: 'grid',
  },
  behaviors: ['drag-element'],
});

graph.render();
