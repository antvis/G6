import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

const data = {
  nodes: [
    {
      id: 'default',
    },
    {
      id: 'halo',
      style: {
        halo: true,
      },
    },
    {
      id: 'badges',
      style: {
        badges: [
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
        ],
        badgeFontSize: 8,
        badgePadding: [1, 4],
      },
    },
    {
      id: 'ports',
      style: {
        portR: 3,
        ports: [
          {
            placement: 'left',
          },
          {
            placement: 'right',
          },
          {
            placement: 'top',
          },
          {
            placement: 'bottom',
          },
        ],
      },
    },
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
  data,
  node: {
    type: 'image',
    style: {
      size: 40,
      labelText: (d) => d.id,
      src: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
      haloStroke: '#227eff',
    },
    state: {
      inactive: {
        fillOpacity: 0.5,
      },
      disabled: {
        fillOpacity: 0.2,
      },
    },
  },
  layout: {
    type: 'grid',
  },
});

graph.render();
