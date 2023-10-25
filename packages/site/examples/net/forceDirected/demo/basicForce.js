import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: '0',
      data: {
        cluster: 'a',
      },
    },
    {
      id: '1',
      data: {
        cluster: 'a',
      },
    },
    {
      id: '2',
      data: {
        cluster: 'a',
      },
    },
    {
      id: '3',
      data: {
        cluster: 'a',
      },
    },
    {
      id: '4',
      data: {
        cluster: 'a',
      },
    },
    {
      id: '5',
      data: {
        cluster: 'a',
      },
    },
    {
      id: '6',
      data: {
        cluster: 'a',
      },
    },
    {
      id: '7',
      data: {
        cluster: 'a',
      },
    },
    {
      id: '8',
      data: {
        cluster: 'a',
      },
    },
    {
      id: '9',
      data: {
        cluster: 'a',
      },
    },
    {
      id: '10',
      data: {
        cluster: 'a',
      },
    },
    {
      id: '11',
      data: {
        cluster: 'a',
      },
    },
    {
      id: '12',
      data: {
        cluster: 'a',
      },
    },
    {
      id: '13',
      data: {
        cluster: 'b',
      },
    },
    {
      id: '14',
      data: {
        cluster: 'b',
      },
    },
    {
      id: '15',
      data: {
        cluster: 'b',
      },
    },
    {
      id: '16',
      data: {
        cluster: 'b',
      },
    },
    {
      id: '17',
      data: {
        cluster: 'b',
      },
    },
    {
      id: '18',
      data: {
        cluster: 'c',
      },
    },
    {
      id: '19',
      data: {
        cluster: 'c',
      },
    },
    {
      id: '20',
      data: {
        cluster: 'c',
      },
    },
    {
      id: '21',
      data: {
        cluster: 'c',
      },
    },
    {
      id: '22',
      data: {
        cluster: 'c',
      },
    },
    {
      id: '23',
      data: {
        cluster: 'c',
      },
    },
    {
      id: '24',
      data: {
        cluster: 'c',
      },
    },
    {
      id: '25',
      data: {
        cluster: 'c',
      },
    },
    {
      id: '26',
      data: {
        cluster: 'c',
      },
    },
    {
      id: '27',
      data: {
        cluster: 'c',
      },
    },
    {
      id: '28',
      data: {
        cluster: 'c',
      },
    },
    {
      id: '29',
      data: {
        cluster: 'c',
      },
    },
    {
      id: '30',
      data: {
        cluster: 'c',
      },
    },
    {
      id: '31',
      data: {
        cluster: 'd',
      },
    },
    {
      id: '32',
      data: {
        cluster: 'd',
      },
    },
    {
      id: '33',
      data: {
        cluster: 'd',
      },
    },
  ],
  edges: [
    {
      id: 'edge-583',
      source: '0',
      target: '1',
    },
    {
      id: 'edge-0',
      source: '0',
      target: '2',
    },
    {
      id: 'edge-888',
      source: '0',
      target: '3',
    },
    {
      id: 'edge-560',
      source: '0',
      target: '4',
    },
    {
      id: 'edge-34',
      source: '0',
      target: '5',
    },
    {
      id: 'edge-654',
      source: '0',
      target: '7',
    },
    {
      id: 'edge-317',
      source: '0',
      target: '8',
    },
    {
      id: 'edge-962',
      source: '0',
      target: '9',
    },
    {
      id: 'edge-746',
      source: '0',
      target: '10',
    },
    {
      id: 'edge-75',
      source: '0',
      target: '11',
    },
    {
      id: 'edge-80',
      source: '0',
      target: '13',
    },
    {
      id: 'edge-674',
      source: '0',
      target: '14',
    },
    {
      id: 'edge-795',
      source: '0',
      target: '15',
    },
    {
      id: 'edge-886',
      source: '0',
      target: '16',
    },
    {
      id: 'edge-630',
      source: '2',
      target: '3',
    },
    {
      id: 'edge-710',
      source: '4',
      target: '5',
    },
    {
      id: 'edge-284',
      source: '4',
      target: '6',
    },
    {
      id: 'edge-758',
      source: '5',
      target: '6',
    },
    {
      id: 'edge-288',
      source: '7',
      target: '13',
    },
    {
      id: 'edge-103',
      source: '8',
      target: '14',
    },
    {
      id: 'edge-873',
      source: '9',
      target: '10',
    },
    {
      id: 'edge-108',
      source: '10',
      target: '22',
    },
    {
      id: 'edge-214',
      source: '10',
      target: '14',
    },
    {
      id: 'edge-928',
      source: '10',
      target: '12',
    },
    {
      id: 'edge-717',
      source: '10',
      target: '24',
    },
    {
      id: 'edge-752',
      source: '10',
      target: '21',
    },
    {
      id: 'edge-424',
      source: '10',
      target: '20',
    },
    {
      id: 'edge-755',
      source: '11',
      target: '24',
    },
    {
      id: 'edge-822',
      source: '11',
      target: '22',
    },
    {
      id: 'edge-366',
      source: '11',
      target: '14',
    },
    {
      id: 'edge-411',
      source: '12',
      target: '13',
    },
    {
      id: 'edge-781',
      source: '16',
      target: '17',
    },
    {
      id: 'edge-742',
      source: '16',
      target: '18',
    },
    {
      id: 'edge-762',
      source: '16',
      target: '21',
    },
    {
      id: 'edge-519',
      source: '16',
      target: '22',
    },
    {
      id: 'edge-187',
      source: '17',
      target: '18',
    },
    {
      id: 'edge-919',
      source: '17',
      target: '20',
    },
    {
      id: 'edge-854',
      source: '18',
      target: '19',
    },
    {
      id: 'edge-199',
      source: '19',
      target: '20',
    },
    {
      id: 'edge-475',
      source: '19',
      target: '33',
    },
    {
      id: 'edge-55',
      source: '19',
      target: '22',
    },
    {
      id: 'edge-528',
      source: '19',
      target: '23',
    },
    {
      id: 'edge-741',
      source: '20',
      target: '21',
    },
    {
      id: 'edge-920',
      source: '21',
      target: '22',
    },
    {
      id: 'edge-457',
      source: '22',
      target: '24',
    },
    {
      id: 'edge-524',
      source: '22',
      target: '25',
    },
    {
      id: 'edge-814',
      source: '22',
      target: '26',
    },
    {
      id: 'edge-258',
      source: '22',
      target: '23',
    },
    {
      id: 'edge-222',
      source: '22',
      target: '28',
    },
    {
      id: 'edge-803',
      source: '22',
      target: '30',
    },
    {
      id: 'edge-693',
      source: '22',
      target: '31',
    },
    {
      id: 'edge-491',
      source: '22',
      target: '32',
    },
    {
      id: 'edge-46',
      source: '22',
      target: '33',
    },
    {
      id: 'edge-145',
      source: '23',
      target: '28',
    },
    {
      id: 'edge-45',
      source: '23',
      target: '27',
    },
    {
      id: 'edge-98',
      source: '23',
      target: '29',
    },
    {
      id: 'edge-993',
      source: '23',
      target: '30',
    },
    {
      id: 'edge-514',
      source: '23',
      target: '31',
    },
    {
      id: 'edge-361',
      source: '23',
      target: '33',
    },
    {
      id: 'edge-154',
      source: '32',
      target: '33',
    },
  ],
};

data.nodes.forEach((node) => (node.data.size = Math.random() * 30 + 5));
const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  node: {
    lodLevels: {},
    keyShape: {
      r: {
        fields: ['size'],
        formatter: (model) => model.data.size / 2,
      },
    },
    labelShape: {
      text: {
        fields: ['id'],
        formatter: (node) => node.id,
      },
    },
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
    type: 'force',
    linkDistance: 50,
    maxSpeed: 100,
    animated: true,
    clustering: true,
    nodeClusterBy: 'cluster',
    clusterNodeStrength: 70,
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
  modes: {
    default: ['zoom-canvas', 'drag-canvas', 'click-select'],
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
