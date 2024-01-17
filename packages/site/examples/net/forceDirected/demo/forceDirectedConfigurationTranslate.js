import { Graph } from '@antv/g6';

const data = {
  nodes: [
    {
      id: '0',
      data: {
        label: '0',
      },
    },
    {
      id: '1',
      data: {
        label: '1',
      },
    },
    {
      id: '2',
      data: {
        label: '2',
      },
    },
    {
      id: '3',
      data: {
        label: '3',
      },
    },
    {
      id: '4',
      data: {
        label: '4',
      },
    },
    {
      id: '5',
      data: {
        label: '5',
      },
    },
    {
      id: '6',
      data: {
        label: '6',
      },
    },
    {
      id: '7',
      data: {
        label: '7',
      },
    },
    {
      id: '8',
      data: {
        label: '8',
      },
    },
    {
      id: '9',
      data: {
        label: '9',
      },
    },
    {
      id: '10',
      data: {
        label: '10',
      },
    },
    {
      id: '11',
      data: {
        label: '11',
      },
    },
    {
      id: '12',
      data: {
        label: '12',
      },
    },
    {
      id: '13',
      data: {
        label: '13',
      },
    },
    {
      id: '14',
      data: {
        label: '14',
      },
    },
    {
      id: '15',
      data: {
        label: '15',
      },
    },
    {
      id: '16',
      data: {
        label: '16',
      },
    },
    {
      id: '17',
      data: {
        label: '17',
      },
    },
    {
      id: '18',
      data: {
        label: '18',
      },
    },
    {
      id: '19',
      data: {
        label: '19',
      },
    },
    {
      id: '20',
      data: {
        label: '20',
      },
    },
    {
      id: '21',
      data: {
        label: '21',
      },
    },
    {
      id: '22',
      data: {
        label: '22',
      },
    },
    {
      id: '23',
      data: {
        label: '23',
      },
    },
    {
      id: '24',
      data: {
        label: '24',
      },
    },
    {
      id: '25',
      data: {
        label: '25',
      },
    },
    {
      id: '26',
      data: {
        label: '26',
      },
    },
    {
      id: '27',
      data: {
        label: '27',
      },
    },
    {
      id: '28',
      data: {
        label: '28',
      },
    },
    {
      id: '29',
      data: {
        label: '29',
      },
    },
    {
      id: '30',
      data: {
        label: '30',
      },
    },
    {
      id: '31',
      data: {
        label: '31',
      },
    },
    {
      id: '32',
      data: {
        label: '32',
      },
    },
    {
      id: '33',
      data: {
        label: '33',
      },
    },
  ],
  edges: [
    {
      id: 'edge-442',
      source: '0',
      target: '1',
    },
    {
      id: 'edge-825',
      source: '0',
      target: '2',
    },
    {
      id: 'edge-100',
      source: '0',
      target: '3',
    },
    {
      id: 'edge-378',
      source: '0',
      target: '4',
    },
    {
      id: 'edge-691',
      source: '0',
      target: '5',
    },
    {
      id: 'edge-983',
      source: '0',
      target: '7',
    },
    {
      id: 'edge-491',
      source: '0',
      target: '8',
    },
    {
      id: 'edge-38',
      source: '0',
      target: '9',
    },
    {
      id: 'edge-547',
      source: '0',
      target: '10',
    },
    {
      id: 'edge-126',
      source: '0',
      target: '11',
    },
    {
      id: 'edge-905',
      source: '0',
      target: '13',
    },
    {
      id: 'edge-931',
      source: '0',
      target: '14',
    },
    {
      id: 'edge-329',
      source: '0',
      target: '15',
    },
    {
      id: 'edge-798',
      source: '0',
      target: '16',
    },
    {
      id: 'edge-130',
      source: '2',
      target: '3',
    },
    {
      id: 'edge-132',
      source: '4',
      target: '5',
    },
    {
      id: 'edge-587',
      source: '4',
      target: '6',
    },
    {
      id: 'edge-772',
      source: '5',
      target: '6',
    },
    {
      id: 'edge-582',
      source: '7',
      target: '13',
    },
    {
      id: 'edge-922',
      source: '8',
      target: '14',
    },
    {
      id: 'edge-559',
      source: '9',
      target: '10',
    },
    {
      id: 'edge-915',
      source: '10',
      target: '22',
    },
    {
      id: 'edge-304',
      source: '10',
      target: '14',
    },
    {
      id: 'edge-88',
      source: '10',
      target: '12',
    },
    {
      id: 'edge-343',
      source: '10',
      target: '24',
    },
    {
      id: 'edge-692',
      source: '10',
      target: '21',
    },
    {
      id: 'edge-29',
      source: '10',
      target: '20',
    },
    {
      id: 'edge-390',
      source: '11',
      target: '24',
    },
    {
      id: 'edge-46',
      source: '11',
      target: '22',
    },
    {
      id: 'edge-170',
      source: '11',
      target: '14',
    },
    {
      id: 'edge-51',
      source: '12',
      target: '13',
    },
    {
      id: 'edge-387',
      source: '16',
      target: '17',
    },
    {
      id: 'edge-598',
      source: '16',
      target: '18',
    },
    {
      id: 'edge-894',
      source: '16',
      target: '21',
    },
    {
      id: 'edge-448',
      source: '16',
      target: '22',
    },
    {
      id: 'edge-921',
      source: '17',
      target: '18',
    },
    {
      id: 'edge-374',
      source: '17',
      target: '20',
    },
    {
      id: 'edge-11',
      source: '18',
      target: '19',
    },
    {
      id: 'edge-899',
      source: '19',
      target: '20',
    },
    {
      id: 'edge-790',
      source: '19',
      target: '33',
    },
    {
      id: 'edge-294',
      source: '19',
      target: '22',
    },
    {
      id: 'edge-353',
      source: '19',
      target: '23',
    },
    {
      id: 'edge-546',
      source: '20',
      target: '21',
    },
    {
      id: 'edge-105',
      source: '21',
      target: '22',
    },
    {
      id: 'edge-261',
      source: '22',
      target: '24',
    },
    {
      id: 'edge-393',
      source: '22',
      target: '25',
    },
    {
      id: 'edge-779',
      source: '22',
      target: '26',
    },
    {
      id: 'edge-149',
      source: '22',
      target: '23',
    },
    {
      id: 'edge-313',
      source: '22',
      target: '28',
    },
    {
      id: 'edge-805',
      source: '22',
      target: '30',
    },
    {
      id: 'edge-538',
      source: '22',
      target: '31',
    },
    {
      id: 'edge-884',
      source: '22',
      target: '32',
    },
    {
      id: 'edge-824',
      source: '22',
      target: '33',
    },
    {
      id: 'edge-519',
      source: '23',
      target: '28',
    },
    {
      id: 'edge-496',
      source: '23',
      target: '27',
    },
    {
      id: 'edge-402',
      source: '23',
      target: '29',
    },
    {
      id: 'edge-736',
      source: '23',
      target: '30',
    },
    {
      id: 'edge-782',
      source: '23',
      target: '31',
    },
    {
      id: 'edge-87',
      source: '23',
      target: '33',
    },
    {
      id: 'edge-27',
      source: '32',
      target: '33',
    },
  ],
};

const container = document.getElementById('container');
const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML = 'Force layout, linkDistance = 50, preventOverlap: false';
container.appendChild(descriptionDiv);

const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 30;
const graph = new Graph({
  container: 'container',
  width,
  height,
  modes: {
    default: ['zoom-canvas', 'drag-canvas', 'drag-node', 'click-select'],
  },
  layout: {
    type: 'force',
    linkDistance: 50,
  },
  node: (model) => {
    return {
      id: model.id,
      data: {
        ...model.data,
        labelShape: {
          text: model.data.label,
        },
        labelBackgroundShape: {},
        animates: {
          update: [
            {
              fields: ['x', 'y'],
              shapeId: 'group',
            },
          ],
        },
      },
    };
  },
  data,
});

layoutConfigTranslation();

setInterval(() => {
  layoutConfigTranslation();
}, 5000);

function layoutConfigTranslation() {
  setTimeout(() => {
    descriptionDiv.innerHTML = 'Force layout, linkDistance = 100, preventOverlap: true';
    graph.layout({
      type: 'force',
      linkDistance: 100,
      preventOverlap: true,
      nodeSize: 20,
    });
  }, 2500);
  setTimeout(() => {
    descriptionDiv.innerHTML = 'Force layout, linkDistance = 50, preventOverlap: false';
    graph.layout({
      type: 'force',
      linkDistance: 50,
      preventOverlap: false,
    });
  }, 5000);
}

window.graph = graph;
