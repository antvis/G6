import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

const data = {
  nodes: [
    { id: 'default' },
    { id: 'halo' },
    { id: 'badges' },
    { id: 'ports' },
    {
      id: 'active',
      states: ['active'],
    },
    {
      id: 'selected',
      states: ['selected'],
    },
    {
      id: 'highlight',
      states: ['highlight'],
    },
    {
      id: 'inactive',
      states: ['inactive'],
    },
    {
      id: 'disabled',
      states: ['disabled'],
    },
  ],
};

const graph = new Graph({
  container: 'container',
  animation: false,
  data,
  node: {
    type: 'donut',
    style: {
      size: 80,
      fill: '#DB9D0D',
      innerR: 0.5,
      donuts: (_, index) => {
        if (index === 0) return [1, 2, 3];

        if (index === 1) {
          return [
            { value: 50, color: 'red' },
            { value: 150, color: 'green' },
            { value: 100, color: 'blue' },
          ];
        }

        if (index === 4) {
          return [
            { value: 150, fill: 'pink', stroke: '#fff', lineWidth: 1 },
            { value: 250, stroke: '#fff', lineWidth: 1 },
            { value: 200, stroke: '#fff', lineWidth: 1 },
          ];
        }

        return [100, 200, 100, 200];
      },
      labelText: (d) => d.id,
      iconFontFamily: 'iconfont',
      iconText: '\ue602',
      halo: (d) => (d.id === 'halo' ? true : false),
      badges: (d) =>
        d.id === 'badges'
          ? [
              {
                text: 'A',
                placement: 'right-top',
              },
              {
                text: 'Important',
                placement: 'right',
              },
              {
                text: 'Notice',
                placement: 'right-bottom',
              },
            ]
          : [],
      badgeFontSize: 8,
      badgePadding: [1, 4],
      portR: 3,
      ports: (d) =>
        d.id === 'ports'
          ? [{ placement: 'left' }, { placement: 'right' }, { placement: 'top' }, { placement: 'bottom' }]
          : [],
    },
  },
  layout: {
    type: 'grid',
  },
});

graph.render();
