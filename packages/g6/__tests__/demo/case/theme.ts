import { Graph } from '@/src';
import data from '../../dataset/cluster.json';
import type { STDTestCase } from '../types';

export const theme: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    node: {
      palette: {
        type: 'group',
        field: 'cluster',
        color: 'antv',
      },
    },
    layout: {
      type: 'radial',
      unitRadius: 80,
    },
    autoFit: 'center',
  });

  await graph.render();

  theme.form = (panel) => {
    const config = {
      theme: 'light',
    };
    const options = { Light: 'light', Dark: 'dark', Blue: 'blue' };

    const themeOptions = {
      light: {
        theme: 'light',
        background: '#fff',
        node: {
          palette: {
            type: 'group',
            field: 'cluster',
            color: 'antv',
          },
        },
      },
      dark: {
        theme: 'dark',
        background: '#000',
        node: {
          palette: {
            type: 'group',
            field: 'cluster',
            color: 'spectral',
          },
        },
      },
      blue: {
        theme: 'light',
        background: '#f3faff',
        node: {
          palette: {
            type: 'group',
            field: 'cluster',
            color: 'blues',
            invert: true,
          },
        },
      },
    };

    const changeTheme = (theme: 'light' | 'dark' | 'blue') => {
      graph.setOptions(themeOptions[theme]);
      graph.render();
    };

    return [
      panel.add(config, 'theme', options).onChange((value: string) => {
        changeTheme(value);
      }),
    ];
  };

  return graph;
};
