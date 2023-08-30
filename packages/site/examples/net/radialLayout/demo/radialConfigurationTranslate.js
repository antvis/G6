import { Graph, Extensions, extend } from '@antv/g6';

const ExtGraph = extend(Graph, {
  layouts: {
    radial: Extensions.RadialLayout,
  },
});

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
      id: 'edge-841',
      source: '0',
      target: '1',
    },
    {
      id: 'edge-655',
      source: '0',
      target: '2',
    },
    {
      id: 'edge-404',
      source: '0',
      target: '3',
    },
    {
      id: 'edge-601',
      source: '0',
      target: '4',
    },
    {
      id: 'edge-554',
      source: '0',
      target: '5',
    },
    {
      id: 'edge-50',
      source: '0',
      target: '7',
    },
    {
      id: 'edge-369',
      source: '0',
      target: '8',
    },
    {
      id: 'edge-239',
      source: '0',
      target: '9',
    },
    {
      id: 'edge-475',
      source: '0',
      target: '10',
    },
    {
      id: 'edge-342',
      source: '0',
      target: '11',
    },
    {
      id: 'edge-63',
      source: '0',
      target: '13',
    },
    {
      id: 'edge-26',
      source: '0',
      target: '14',
    },
    {
      id: 'edge-33',
      source: '0',
      target: '15',
    },
    {
      id: 'edge-867',
      source: '0',
      target: '16',
    },
    {
      id: 'edge-620',
      source: '2',
      target: '3',
    },
    {
      id: 'edge-843',
      source: '4',
      target: '5',
    },
    {
      id: 'edge-832',
      source: '4',
      target: '6',
    },
    {
      id: 'edge-157',
      source: '5',
      target: '6',
    },
    {
      id: 'edge-48',
      source: '7',
      target: '13',
    },
    {
      id: 'edge-114',
      source: '8',
      target: '14',
    },
    {
      id: 'edge-912',
      source: '9',
      target: '10',
    },
    {
      id: 'edge-494',
      source: '10',
      target: '22',
    },
    {
      id: 'edge-960',
      source: '10',
      target: '14',
    },
    {
      id: 'edge-384',
      source: '10',
      target: '12',
    },
    {
      id: 'edge-94',
      source: '10',
      target: '24',
    },
    {
      id: 'edge-361',
      source: '10',
      target: '21',
    },
    {
      id: 'edge-299',
      source: '10',
      target: '20',
    },
    {
      id: 'edge-645',
      source: '11',
      target: '24',
    },
    {
      id: 'edge-487',
      source: '11',
      target: '22',
    },
    {
      id: 'edge-622',
      source: '11',
      target: '14',
    },
    {
      id: 'edge-21',
      source: '12',
      target: '13',
    },
    {
      id: 'edge-286',
      source: '16',
      target: '17',
    },
    {
      id: 'edge-643',
      source: '16',
      target: '18',
    },
    {
      id: 'edge-306',
      source: '16',
      target: '21',
    },
    {
      id: 'edge-45',
      source: '16',
      target: '22',
    },
    {
      id: 'edge-912',
      source: '17',
      target: '18',
    },
    {
      id: 'edge-820',
      source: '17',
      target: '20',
    },
    {
      id: 'edge-399',
      source: '18',
      target: '19',
    },
    {
      id: 'edge-186',
      source: '19',
      target: '20',
    },
    {
      id: 'edge-220',
      source: '19',
      target: '33',
    },
    {
      id: 'edge-577',
      source: '19',
      target: '22',
    },
    {
      id: 'edge-191',
      source: '19',
      target: '23',
    },
    {
      id: 'edge-390',
      source: '20',
      target: '21',
    },
    {
      id: 'edge-304',
      source: '21',
      target: '22',
    },
    {
      id: 'edge-888',
      source: '22',
      target: '24',
    },
    {
      id: 'edge-795',
      source: '22',
      target: '25',
    },
    {
      id: 'edge-716',
      source: '22',
      target: '26',
    },
    {
      id: 'edge-100',
      source: '22',
      target: '23',
    },
    {
      id: 'edge-933',
      source: '22',
      target: '28',
    },
    {
      id: 'edge-193',
      source: '22',
      target: '30',
    },
    {
      id: 'edge-748',
      source: '22',
      target: '31',
    },
    {
      id: 'edge-176',
      source: '22',
      target: '32',
    },
    {
      id: 'edge-525',
      source: '22',
      target: '33',
    },
    {
      id: 'edge-795',
      source: '23',
      target: '28',
    },
    {
      id: 'edge-311',
      source: '23',
      target: '27',
    },
    {
      id: 'edge-499',
      source: '23',
      target: '29',
    },
    {
      id: 'edge-418',
      source: '23',
      target: '30',
    },
    {
      id: 'edge-409',
      source: '23',
      target: '31',
    },
    {
      id: 'edge-426',
      source: '23',
      target: '33',
    },
    {
      id: 'edge-876',
      source: '32',
      target: '33',
    },
  ],
};

const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML = 'Radial layout, focusNode =  = 0, unitRadius = 50, preventOverlap: false';
const container = document.getElementById('container');
container.appendChild(descriptionDiv);

const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 20;

const graph = new ExtGraph({
  container: 'container',
  width,
  height,
  modes: {
    default: ['drag-canvas', 'drag-node'],
  },
  layout: {
    type: 'radial',
    unitRadius: 50,
  },
  animate: true,
  defaultNode: {
    size: 20,
  },
  edge: {
    keyShape: {
      endArrow: true,
    },
  },
  node: {
    animates: {
      update: [
        {
          fields: ['x', 'y'],
        },
      ],
    },
  },
  data,
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };

layoutConfigTranslation();

setInterval(function () {
  layoutConfigTranslation();
}, 7000);

function layoutConfigTranslation() {
  setTimeout(function () {
    descriptionDiv.innerHTML = 'Radial layout, focusNode =  = 0, unitRadius = 50, preventOverlap: true';
    graph.layout({
      type: 'radial',
      preventOverlap: true,
      nodeSize: 20,
    });
  }, 1000);

  setTimeout(function () {
    descriptionDiv.innerHTML = 'Radial layout, focusNode =  = 0, unitRadius = 80, preventOverlap: true';
    graph.layout({
      type: 'radial',
      unitRadius: 80,
    });
  }, 2500);

  setTimeout(function () {
    descriptionDiv.innerHTML = 'Radial layout, focusNode =  = 10, unitRadius = 80, preventOverlap: true';
    graph.layout({
      type: 'radial',
      focusNode: '10',
    });
  }, 4000);

  setTimeout(function () {
    descriptionDiv.innerHTML = 'Radial layout, focusNode =  = 20, unitRadius = 80, preventOverlap: true';
    graph.layout({
      type: 'radial',
      focusNode: '20',
    });
  }, 5500);

  setTimeout(function () {
    descriptionDiv.innerHTML = 'Radial layout, focusNode =  = 0, unitRadius = 50, preventOverlap: false';
    graph.layout({
      type: 'radial',
      focusNode: '0',
      preventOverlap: false,
      unitRadius: 50,
    });
  }, 5500);
}
