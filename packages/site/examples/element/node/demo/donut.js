import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

const data = {
  nodes: [
    { id: 'default', index: 0 },
    { id: 'halo', index: 1 },
    { id: 'badges', index: 2 },
    { id: 'ports', index: 3 },
    {
      id: 'active',
      states: ['active'],
      index: 4,
    },
    {
      id: 'selected',
      states: ['selected'],
      index: 5,
    },
    {
      id: 'highlight',
      states: ['highlight'],
      index: 6,
    },
    {
      id: 'inactive',
      states: ['inactive'],
      index: 7,
    },
    {
      id: 'disabled',
      states: ['disabled'],
      index: 8,
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
      innerR: 20,
      donuts: (item) => {
        const { index } = item;
        if (index === 0) return [1, 2, 3]; // donuts数据类型为number[]时，根据值的大小决定环的占比

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
