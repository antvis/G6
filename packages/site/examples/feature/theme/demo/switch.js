import { Graph } from '@antv/g6';

const themes = {
  '🌞 Light': {
    background: '#fff',
    theme: 'light',
    node: {
      palette: {
        type: 'group',
        field: 'cluster',
      },
    },
  },
  '🌚 Dark': {
    background: '#000',
    theme: 'dark',
    node: {
      palette: {
        type: 'group',
        field: 'cluster',
      },
    },
  },
  '🌎 Blue': {
    background: '#f3faff',
    theme: 'light',
    node: {
      palette: {
        type: 'group',
        field: 'cluster',
        color: 'blues',
        invert: true,
      },
    },
  },
  '🌕 Yellow': {
    background: '#fcf9f1',
    theme: 'light',
    node: {
      palette: {
        type: 'group',
        field: 'cluster',
        color: ['#ffe7ba', '#ffd591', '#ffc069', '#ffa940', '#fa8c16', '#d46b08', '#ad4e00', '#873800', '#612500'],
      },
    },
  },
};

fetch('https://assets.antv.antgroup.com/g6/cluster.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      padding: 20,
      autoFit: 'view',
      theme: 'light',
      data,
      node: {
        palette: {
          type: 'group',
          field: 'cluster',
        },
      },
      layout: {
        type: 'circular',
      },
    });

    graph.render();

    window.addPanel((gui) => {
      gui.add({ theme: '🌞 Light' }, 'theme', Object.keys(themes)).onChange((theme) => {
        graph.setOptions(themes[theme]);
        graph.render();
      });
    });
  });
