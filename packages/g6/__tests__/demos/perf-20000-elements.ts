import type { GraphOptions } from '@antv/g6';
import { Graph } from '@antv/g6';

export const perf20000Elements: TestCase = async (context) => {
  const data = await fetch('https://assets.antv.antgroup.com/g6/20000.json').then((res) => res.json());

  const graph = new Graph({
    ...context,
    animation: false,
    data,
    node: {
      style: {
        size: 8,
        fill: 'gray',
      },
    },
    theme: false,
    behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
    autoFit: 'view',
    plugins: [{ type: 'background', background: '#fff' }],
  });

  console.time('time');
  await graph.render();
  console.timeEnd('time');

  perf20000Elements.form = (gui) => {
    const themes: Record<string, GraphOptions> = {
      '🌞 Light': {
        theme: 'light',
        node: {
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
          palette: {
            type: 'group',
            field: 'cluster',
            color: ['#ffe7ba', '#ffd591', '#ffc069', '#ffa940', '#fa8c16', '#d46b08', '#ad4e00', '#873800', '#612500'],
          },
        },
        plugins: [{ type: 'background', background: '#fcf9f1' }],
      },
    };

    return [
      gui.add({ theme: '🌞 Light' }, 'theme', Object.keys(themes)).onChange((theme: string) => {
        graph.setOptions(themes[theme]);
        graph.draw();
      }),
    ];
  };

  return graph;
};
