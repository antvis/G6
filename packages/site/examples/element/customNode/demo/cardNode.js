import { Graph, Extensions, extend, stdLib } from '@antv/g6';

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const ICON_MAP = {
  a: 'https://gw.alipayobjects.com/mdn/rms_8fd2eb/afts/img/A*0HC-SawWYUoAAAAAAAAAAABkARQnAQ',
  b: 'https://gw.alipayobjects.com/mdn/rms_8fd2eb/afts/img/A*sxK0RJ1UhNkAAAAAAAAAAABkARQnAQ',
};

class CardNode extends Extensions.RectNode {
  drawOtherShapes(model, shapeMap, diffData, diffState) {
    const keyShapeBBox = shapeMap.keyShape.getLocalBounds();
    const x = -keyShapeBBox.halfExtents[0],
      y = -keyShapeBBox.halfExtents[1];
    const { data } = model;

    const color = data.error ? '#F4664A' : '#30BF78';
    const r = 2;

    const otherShapes = {
      // title box
      titleBox: this.upsertShape(
        'rect',
        'titleBox',
        { x: 0, y: 0, width: 200, height: 20, fill: color, radius: [r, r, 0, 0] },
        {
          model,
          shapeMap,
          diffData,
          diffState,
        },
      ),
      // left icon
      nodeIcon: this.upsertShape(
        'image',
        'nodeIcon',
        {
          x: 4,
          y: 2,
          height: 16,
          width: 16,
          cursor: 'pointer',
          img: ICON_MAP[data.nodeType],
        },
        {
          model,
          shapeMap,
          diffData,
          diffState,
        },
      ),
      // title text
      title: this.upsertShape(
        'text',
        'title',
        {
          textBaseline: 'top',
          y: 2,
          x: 24,
          lineHeight: 20,
          text: data.title,
          fill: '#fff',
          fontSize: 12,
        },
        {
          model,
          shapeMap,
          diffData,
          diffState,
        },
      ),
    };

    if (data.nodeLevel > 0) {
      otherShapes.markerShape = this.upsertShape(
        'path',
        'markerShape',
        {
          cursor: 'pointer',
          stroke: '#666',
          lineWidth: 1,
          fill: '#fff',
          path: data.collapsed
            ? stdLib.markers.expand(keyShapeBBox.max[0], keyShapeBBox.center[1], 6)
            : stdLib.markers.collapse(keyShapeBBox.max[0], keyShapeBBox.center[1], 6),
        },
        {
          model,
          shapeMap,
          diffData,
          diffState,
        },
      );
    }

    // content list
    data.panels.forEach((panel, index) => {
      otherShapes[`panel-title-${index}`] = this.upsertShape(
        'text',
        `panel-title-${index}`,
        {
          textBaseline: 'top',
          y: 25,
          x: 24 + index * 60,
          lineHeight: 20,
          text: panel.title,
          fill: 'rgba(0,0,0,0.4)',
          fontSize: 12,
        },
        {
          model,
          shapeMap,
          diffData,
          diffState,
        },
      );
      otherShapes[`panel-value-${index}`] = this.upsertShape(
        'text',
        `panel-value-${index}`,
        {
          textBaseline: 'top',
          y: 42,
          x: 24 + index * 60,
          lineHeight: 20,
          text: panel.value,
          fill: '#595959',
          fontSize: 12,
        },
        {
          model,
          shapeMap,
          diffData,
          diffState,
        },
      );
    });

    return otherShapes;
  }
}

const ExtGraph = extend(Graph, {
  nodes: {
    'card-node': CardNode,
  },
});

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
        id: 'node1',
        data: {
          x: 100,
          y: 100,
          nodeType: 'a',
          title: 'node1',
          error: true,
          nodeLevel: 2,
          panels: [
            { title: '成功率', value: '11%' },
            { title: '耗时', value: '111' },
            { title: '错误数', value: '111' },
          ],
        },
      },
      {
        id: 'node2',
        data: {
          x: 100,
          y: 200,
          nodeType: 'b',
          title: 'node2',
          error: false,
          nodeLevel: 0,
          panels: [
            { title: '成功率', value: '11%' },
            { title: '耗时', value: '111' },
            { title: '错误数', value: '111' },
          ],
        },
      },
      {
        id: 'node3',
        data: {
          x: 100,
          y: 300,
          title: 'node3',
          error: false,
          nodeType: 'a',
          nodeLevel: 3,
          panels: [
            { title: '成功率', value: '11%' },
            { title: '耗时', value: '111' },
            { title: '错误数', value: '111' },
          ],
          collapse: true,
        },
      },
    ],
  },
  node: (nodeInnerModel) => {
    const { id, data } = nodeInnerModel;
    const color = data.error ? '#F4664A' : '#30BF78';
    const r = 2;
    return {
      id,
      data: {
        ...data,
        type: 'card-node',
        keyShape: {
          x: 100,
          y: 30,
          width: 200,
          height: 60,
          fill: '#fff',
          lineWidth: 1,
          stroke: color,
          radius: r,
        },
        otherShapes: {},
      },
    };
  },
});

window.graph = graph;