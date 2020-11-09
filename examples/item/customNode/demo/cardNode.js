import G6 from '@antv/g6';

const ICON_MAP = {
  a: 'https://gw.alipayobjects.com/mdn/rms_8fd2eb/afts/img/A*0HC-SawWYUoAAAAAAAAAAABkARQnAQ',
  b: 'https://gw.alipayobjects.com/mdn/rms_8fd2eb/afts/img/A*sxK0RJ1UhNkAAAAAAAAAAABkARQnAQ',
};

G6.registerNode(
  'card-node',
  {
    drawShape: function drawShape(cfg, group) {
      const color = cfg.error ? '#F4664A' : '#30BF78';
      const r = 2;
      const shape = group.addShape('rect', {
        attrs: {
          x: 0,
          y: 0,
          width: 200,
          height: 60,
          stroke: color,
          radius: r,
        },
        name: 'main-box',
        draggable: true,
      });

      group.addShape('rect', {
        attrs: {
          x: 0,
          y: 0,
          width: 200,
          height: 20,
          fill: color,
          radius: [r, r, 0, 0],
        },
        name: 'title-box',
        draggable: true,
      });

      // left icon
      group.addShape('image', {
        attrs: {
          x: 4,
          y: 2,
          height: 16,
          width: 16,
          cursor: 'pointer',
          img: ICON_MAP[cfg.nodeType || 'app'],
        },
        name: 'node-icon',
      });

      // title text
      group.addShape('text', {
        attrs: {
          textBaseline: 'top',
          y: 2,
          x: 24,
          lineHeight: 20,
          text: cfg.title,
          fill: '#fff',
        },
        name: 'title',
      });

      if (cfg.nodeLevel > 0) {
        group.addShape('marker', {
          attrs: {
            x: 184,
            y: 30,
            r: 6,
            cursor: 'pointer',
            symbol: cfg.collapse ? G6.Marker.expand : G6.Marker.collapse,
            stroke: '#666',
            lineWidth: 1,
          },
          name: 'collapse-icon',
        });
      }

      // The content list
      cfg.panels.forEach((item, index) => {
        // name text
        group.addShape('text', {
          attrs: {
            textBaseline: 'top',
            y: 25,
            x: 24 + index * 60,
            lineHeight: 20,
            text: item.title,
            fill: 'rgba(0,0,0, 0.4)',
          },
          name: `index-title-${index}`,
        });

        // value text
        group.addShape('text', {
          attrs: {
            textBaseline: 'top',
            y: 42,
            x: 24 + index * 60,
            lineHeight: 20,
            text: item.value,
            fill: '#595959',
          },
          name: `index-title-${index}`,
        });
      });
      return shape;
    },
  },
  'single-node',
);

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  // translate the graph to align the canvas's center, support by v3.5.1
  fitCenter: true,
  modes: {
    default: ['drag-canvas', 'drag-node'],
  },
  defaultNode: {
    type: 'card-node',
  },
  fitView: true,
});

const data = {
  nodes: [
    {
      title: 'node1',
      error: true,
      nodeType: 'a',
      id: 'node1',
      nodeLevel: 2,
      panels: [
        { title: '成功率', value: '11%' },
        { title: '耗时', value: '111' },
        { title: '错误数', value: '111' },
      ],
      x: 100,
      y: 100,
    },
    {
      title: 'node2',
      error: false,
      nodeType: 'b',
      id: 'node2',
      nodeLevel: 0,
      panels: [
        { title: '成功率', value: '11%' },
        { title: '耗时', value: '111' },
        { title: '错误数', value: '111' },
      ],
      x: 100,
      y: 200,
    },
    {
      title: 'node3',
      error: false,
      nodeType: 'a',
      id: 'node3',
      nodeLevel: 3,
      panels: [
        { title: '成功率', value: '11%' },
        { title: '耗时', value: '111' },
        { title: '错误数', value: '111' },
      ],
      collapse: true,
      x: 100,
      y: 300,
    },
  ],
};

graph.data(data);
graph.render();
