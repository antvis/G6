import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: '0',
      label: '0',
    },
    {
      id: '1',
      label: '1',
    },
    {
      id: '2',
      label: '2',
    },
    {
      id: '3',
      label: '3',
    },
    {
      id: '4',
      label: '4',
    },
    {
      id: '5',
      label: '5',
    },
    {
      id: '6',
      label: '6',
    },
    {
      id: '7',
      label: '7',
    },
    {
      id: '8',
      label: '8',
    },
    {
      id: '9',
      label: '9',
    },
    {
      id: '10',
      label: '10',
    },
    {
      id: '11',
      label: '11',
    },
    {
      id: '12',
      label: '12',
    },
    {
      id: '13',
      label: '13',
    },
    {
      id: '14',
      label: '14',
    },
    {
      id: '15',
      label: '15',
    },
    {
      id: '16',
      label: '16',
    },
    {
      id: '17',
      label: '17',
    },
    {
      id: '18',
      label: '18',
    },
    {
      id: '19',
      label: '19',
    },
    {
      id: '20',
      label: '20',
    },
    {
      id: '21',
      label: '21',
    },
    {
      id: '22',
      label: '22',
    },
    {
      id: '23',
      label: '23',
    },
    {
      id: '24',
      label: '24',
    },
    {
      id: '25',
      label: '25',
    },
    {
      id: '26',
      label: '26',
    },
    {
      id: '27',
      label: '27',
    },
    {
      id: '28',
      label: '28',
    },
    {
      id: '29',
      label: '29',
    },
    {
      id: '30',
      label: '30',
    },
    {
      id: '31',
      label: '31',
    },
    {
      id: '32',
      label: '32',
    },
    {
      id: '33',
      label: '33',
    },
  ],
  edges: [
    {
      source: '0',
      target: '1',
    },
    {
      source: '0',
      target: '2',
    },
    {
      source: '0',
      target: '3',
    },
    {
      source: '0',
      target: '4',
    },
    {
      source: '0',
      target: '5',
    },
    {
      source: '0',
      target: '7',
    },
    {
      source: '0',
      target: '8',
    },
    {
      source: '0',
      target: '9',
    },
    {
      source: '0',
      target: '10',
    },
    {
      source: '0',
      target: '11',
    },
    {
      source: '0',
      target: '13',
    },
    {
      source: '0',
      target: '14',
    },
    {
      source: '0',
      target: '15',
    },
    {
      source: '0',
      target: '16',
    },
    {
      source: '2',
      target: '3',
    },
    {
      source: '4',
      target: '5',
    },
    {
      source: '4',
      target: '6',
    },
    {
      source: '5',
      target: '6',
    },
    {
      source: '7',
      target: '13',
    },
    {
      source: '8',
      target: '14',
    },
    {
      source: '9',
      target: '10',
    },
    {
      source: '10',
      target: '22',
    },
    {
      source: '10',
      target: '14',
    },
    {
      source: '10',
      target: '12',
    },
    {
      source: '10',
      target: '24',
    },
    {
      source: '10',
      target: '21',
    },
    {
      source: '10',
      target: '20',
    },
    {
      source: '11',
      target: '24',
    },
    {
      source: '11',
      target: '22',
    },
    {
      source: '11',
      target: '14',
    },
    {
      source: '12',
      target: '13',
    },
    {
      source: '16',
      target: '17',
    },
    {
      source: '16',
      target: '18',
    },
    {
      source: '16',
      target: '21',
    },
    {
      source: '16',
      target: '22',
    },
    {
      source: '17',
      target: '18',
    },
    {
      source: '17',
      target: '20',
    },
    {
      source: '18',
      target: '19',
    },
    {
      source: '19',
      target: '20',
    },
    {
      source: '19',
      target: '33',
    },
    {
      source: '19',
      target: '22',
    },
    {
      source: '19',
      target: '23',
    },
    {
      source: '20',
      target: '21',
    },
    {
      source: '21',
      target: '22',
    },
    {
      source: '22',
      target: '24',
    },
    {
      source: '22',
      target: '25',
    },
    {
      source: '22',
      target: '26',
    },
    {
      source: '22',
      target: '23',
    },
    {
      source: '22',
      target: '28',
    },
    {
      source: '22',
      target: '30',
    },
    {
      source: '22',
      target: '31',
    },
    {
      source: '22',
      target: '32',
    },
    {
      source: '22',
      target: '33',
    },
    {
      source: '23',
      target: '28',
    },
    {
      source: '23',
      target: '27',
    },
    {
      source: '23',
      target: '29',
    },
    {
      source: '23',
      target: '30',
    },
    {
      source: '23',
      target: '31',
    },
    {
      source: '23',
      target: '33',
    },
    {
      source: '32',
      target: '33',
    },
  ],
};

const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML =
  'Circular layout with radius: take full use of the canvas, ordering: topology';
const graphDiv = document.getElementById('container');
graphDiv.appendChild(descriptionDiv)

const width = document.getElementById('container').scrollWidth;
const height = (document.getElementById('container').scrollHeight || 500) - 20;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  modes: {
    default: ['drag-canvas', 'drag-node'],
  },
  layout: {
    type: 'circular',
  },
  animate: true,
  defaultNode: {
    size: 20,
    style: {
      lineWidth: 2,
      fill: '#C6E5FF',
      stroke: '#5B8FF9',
    },
  },
  defaultEdge: {
    size: 1,
    color: '#e2e2e2',
    style: {
      endArrow: {
        path: 'M 0,0 L 8,4 L 8,-4 Z',
        fill: '#e2e2e2'
      },
    },
  },
});
graph.data(data);
graph.render();

layoutConfigTranslation();

setInterval(function () {
  layoutConfigTranslation();
}, 11500);

function layoutConfigTranslation() {
  setTimeout(function () {
    descriptionDiv.innerHTML = 'Circular layout, radius = 200, divisions = 5, ordering: degree';
    graph.updateLayout({
      radius: 200,
      startAngle: Math.PI / 4,
      endAngle: Math.PI,
      divisions: 5,
      ordering: 'degree',
    });
  }, 1000);

  setTimeout(function () {
    descriptionDiv.innerHTML = 'Circular layout, radius = 200, divisions = 3, ordering: degree';
    graph.updateLayout({
      startAngle: Math.PI / 4,
      endAngle: Math.PI,
      divisions: 3,
    });
  }, 2500);

  setTimeout(function () {
    descriptionDiv.innerHTML = 'Circular layout, radius = 200, divisions = 8, ordering: degree';
    graph.updateLayout({
      radius: 200,
      startAngle: 0,
      endAngle: Math.PI / 2,
      divisions: 8,
    });
  }, 4000);

  setTimeout(function () {
    descriptionDiv.innerHTML =
      'Circular layout, radius = 10～300(spiral), endAngle: PI, divisions = 1, ordering: degree';
    graph.updateLayout({
      radius: null,
      startRadius: 10,
      endRadius: 300,
      divisions: 1,
      startAngle: 0,
      endAngle: Math.PI,
    });
  }, 5500);

  setTimeout(function () {
    descriptionDiv.innerHTML =
      'Circular layout, radius = 10～300(spiral),endAngle: 2 * PI, divisions= 1, ordering: degree';
    graph.updateLayout({
      endAngle: 2 * Math.PI,
    });
  }, 7000);

  setTimeout(function () {
    descriptionDiv.innerHTML = 'Circular layout, radius = 200, ordering: degree';
    graph.updateLayout({
      radius: 200,
    });
  }, 8500);

  setTimeout(function () {
    descriptionDiv.innerHTML = 'Circular layout, radius = 200, ordering: topology';
    graph.updateLayout({
      radius: 200,
      ordering: 'topology',
    });
  }, 10000);
}
