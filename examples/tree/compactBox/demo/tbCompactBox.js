import G6 from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then(res => res.json())
  .then(data => {
    const width = document.getElementById('container').scrollWidth;
    const height = document.getElementById('container').scrollHeight || 500;
    const graph = new G6.TreeGraph({
      container: 'container',
      width,
      height,
      linkCenter: true,
      modes: {
        default: [{
          type: 'collapse-expand',
          onChange: function onChange(item, collapsed) {
            const data = item.get('model').data;
            data.collapsed = collapsed;
            return true;
          }
        }, 'drag-canvas', 'zoom-canvas' ]
      },
      defaultNode: {
        size: 26,
        anchorPoints: [[ 0, 0.5 ], [ 1, 0.5 ]],
        style: {
          fill: '#C6E5FF',
          stroke: '#5B8FF9'
        }
      },
      defaultEdge: {
        shape: 'cubic-vertical',
        style: {
          stroke: '#A3B1BF'
        }
      },
      layout: {
        type: 'compactBox',
        direction: 'TB',
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
          return 80;
        },
        getHGap: function getHGap() {
          return 20;
        }
      }
    });

    graph.node(function(node) {
      let position = 'right';
      let rotate = 0;
      if (!node.children) {
        position = 'bottom';
        rotate = Math.PI / 2;
      }
      return {
        label: node.id,
        labelCfg: {
          position,
          offset: 5,
          style: {
            rotate,
            textAlign: 'start'
          }
        }
      };
    });

    graph.data(data);
    graph.render();
    graph.fitView();
  });
