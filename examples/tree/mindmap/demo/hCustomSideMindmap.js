import G6 from '@antv/g6';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then(res => res.json())
  .then(data => {
    const width = document.getElementById('container').scrollWidth;
    const height = document.getElementById('container').scrollHeight;
    const graph = new G6.TreeGraph({
      container: 'container',
      width,
      height,
      pixelRatio: 2,
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
        size: 16,
        anchorPoints: [[ 0, 0.5 ], [ 1, 0.5 ]],
        style: {
          fill: '#40a9ff',
          stroke: '#096dd9'
        }
      },
      defaultEdge: {
        shape: 'cubic-horizontal',
        style: {
          stroke: '#A3B1BF'
        }
      },
      layout: {
        type: 'mindmap',
        direction: 'H',
        getHeight: () => {
          return 16;
        },
        getWidth: () => {
          return 16;
        },
        getVGap: () => {
          return 10;
        },
        getHGap: () => {
          return 50;
        },
        getSide: d => {
          if (d.id === 'Classification') {
            return 'left';
          }
          return 'right';
        }
      }
    });

    let centerX = 0;
    graph.node(function(node) {
      if (node.id === 'Modeling Methods') {
        centerX = node.x;
      }

      return {
        size: 26,
        style: {
          fill: '#40a9ff',
          stroke: '#096dd9'
        },
        label: node.id,
        labelCfg: {
          position: node.children && node.children.length > 0 ? 'left' : node.x > centerX ? 'right' : 'left',
          offset: 5
        }
      };
    });

    graph.data(data);
    graph.render();
    graph.fitView();
  });
