import { Graph, Extensions, extend } from '@antv/g6';

const ExtGraph = extend(Graph, {
  layouts: {
    fruchterman: Extensions.FruchtermanLayout,
  },
});

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new ExtGraph({
      container: 'container',
      width,
      height,
      transform: ['transform-v4-data'],
      node: {
        labelShape: {
          text: {
            fields: ['id'],
            formatter: (node) => node.id,
          },
        },
        labelBackgroundShape: {},
        animates: {
          update: [
            {
              fields: ['opacity'],
              shapeId: 'haloShape',
            },
            {
              fields: ['lineWidth'],
              shapeId: 'keyShape',
            },
          ],
        },
      },
      layout: {
        type: 'fruchterman',
        speed: 20,
        gravity: 1,
        animated: true,
        maxIteration: 500,
      },
      theme: {
        type: 'spec',
        specification: {
          node: {
            dataTypeField: 'cluster',
          },
          edge: {
            dataTypeField: 'cluster',
          },
        },
      },
      autoFit: 'view',
      modes: {
        default: ['zoom-canvas', 'drag-canvas', 'drag-node', 'click-select'],
      },
      data,
    });

    /******** 拖拽固定节点的逻辑 *********/
    graph.on('node:dragstart', function (e) {
      graph.stopLayout();
    });
    graph.on('node:drag', function (e) {
      refreshDragedNodePosition(e);
    });
    graph.on('node:dragend', (e) => {
      graph.layout();
    });
    function refreshDragedNodePosition(e) {
      const { x, y } = e.canvas;
      graph.updateData('node', {
        id: e.itemId,
        data: {
          fx: x,
          fy: y,
          x,
          y,
        },
      });
    }
    /*********************************/

    if (typeof window !== 'undefined')
      window.onresize = () => {
        if (!graph || graph.destroyed) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.setSize([container.scrollWidth, container.scrollHeight]);
      };
  });
