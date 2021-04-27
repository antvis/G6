import G6 from '@antv/g6';

G6.registerNode(
  'tree-node',
  {
    drawShape: function drawShape(cfg, group) {
      const rect = group.addShape('rect', {
        attrs: {
          fill: '#fff',
          stroke: '#666',
          x: 0,
          y: 0,
          width:1,
          height: 1
        },
        name: 'rect-shape',
      });
      const content = cfg.name.replace(/(.{19})/g, '$1\n');
      const text = group.addShape('text', {
        attrs: {
          text: content,
          x: 0,
          y: 0,
          textAlign: 'left',
          textBaseline: 'middle',
          fill: '#666',
        },
        name: 'text-shape',
      });
      const bbox = text.getBBox();
      const hasChildren = cfg.children && cfg.children.length > 0;
      rect.attr({
        x: -bbox.width / 2 - 4,
        y: -bbox.height / 2 - 6,
        width: bbox.width + (hasChildren ? 26 : 12),
        height: bbox.height + 12,
      });
      text.attr({
        x: -bbox.width / 2,
        y: 0
      })
      if (hasChildren) {
        group.addShape('marker', {
          attrs: {
            x: bbox.width / 2 + 12,
            y: 0,
            r: 6,
            symbol: cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse,
            stroke: '#666',
            lineWidth: 2,
          },
          name: 'collapse-icon',
        });
      }
      return rect;
    },
    update: (cfg, item) => {
      const group = item.getContainer();
      const icon = group.find((e) => e.get('name') === 'collapse-icon');
      icon.attr('symbol', cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse);
    },
  },
  'single-node',
);

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new G6.TreeGraph({
  container: 'container',
  width,
  height,
  modes: {
    default: [
      {
        type: 'collapse-expand',
        onChange: function onChange(item, collapsed) {
          const data = item.get('model');
          graph.updateItem(item, {
            collapsed,
          });
          data.collapsed = collapsed;
          return true;
        },
      },
      'drag-canvas',
      'zoom-canvas',
    ],
  },
  defaultNode: {
    type: 'tree-node',
    anchorPoints: [
      [0, 0.5],
      [1, 0.5],
    ],
  },
  defaultEdge: {
    type: 'cubic-horizontal',
    style: {
      stroke: '#A3B1BF',
    },
  },
  layout: {
    type: 'compactBox',
    direction: 'LR',
    getId: function getId(d) {
      return d.id;
    },
    getHeight: function getHeight() {
      return 16;
    },
    getWidth: function getWidth() {
      return 16;
    },
    getVGap: function getVGap() {
      return 20;
    },
    getHGap: function getHGap() {
      return 80;
    },
  },
});
fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/modeling-methods.json')
  .then((res) => res.json())
  .then((data) => {
    G6.Util.traverseTree(data, function (item) {
      item.id = item.name;
    });
    graph.data(data);
    graph.render();
    graph.fitView();
  });

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };
