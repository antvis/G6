import { Graph } from '@antv/g6';

const themes = {
  '🌞 Light': {
    theme: 'light',
    node: {
      style: { size: 4 },
      palette: {
        type: 'group',
        field: 'cluster',
      },
    },
    plugins: [{ type: 'background', background: '#fff' }],
  },
  '🌚 Dark': {
    theme: 'dark',
    node: {
      style: { size: 4 },
      palette: {
        type: 'group',
        field: 'cluster',
      },
    },
    plugins: [{ type: 'background', background: '#000' }],
  },
  '🌎 Blue': {
    theme: 'light',
    node: {
      style: { size: 4 },
      palette: {
        type: 'group',
        field: 'cluster',
        color: 'blues',
        invert: true,
      },
    },
    plugins: [{ type: 'background', background: '#f3faff' }],
  },
  '🌕 Yellow': {
    background: '#fcf9f1',
    theme: 'light',
    node: {
      style: { size: 4 },
      palette: {
        type: 'group',
        field: 'cluster',
        color: ['#ffe7ba', '#ffd591', '#ffc069', '#ffa940', '#fa8c16', '#d46b08', '#ad4e00', '#873800', '#612500'],
      },
    },
    plugins: [{ type: 'background', background: '#fcf9f1' }],
  },
};

fetch('https://assets.antv.antgroup.com/g6/20000.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      animation: false,
      padding: 20,
      autoFit: 'view',
      theme: 'light',
      data,
      node: {
        style: { size: 4 },
        palette: {
          type: 'group',
          field: 'cluster',
        },
      },
      behaviors: ['drag-canvas', 'zoom-canvas'],
      plugins: [{ type: 'background', background: '#fff' }],
    });

    graph.render();

    window.addPanel((gui) => {
      gui.add({ theme: '🌞 Light' }, 'theme', Object.keys(themes)).onChange((theme) => {
        graph.setOptions(themes[theme]);
        graph.draw();
      });
    });
  });
