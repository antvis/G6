import data from '@@/dataset/cluster.json';
import { Graph } from '@antv/g6';

export const theme: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoFit: 'view',
    data,
    node: {
      palette: {
        field: 'cluster',
      },
    },
    layout: {
      type: 'radial',
      unitRadius: 80,
    },
  });

  await graph.render();

  theme.form = (panel) => {
    const config = {
      theme: 'light',
    };
    const options = { Light: 'light', Dark: 'dark', Blue: 'blue' };

    const themeOptions: { [key: string]: any } = {
      light: {
        background: '#fff',
        theme: 'light',
        node: {
          palette: {
            field: 'cluster',
          },
        },
      },
      dark: {
        background: '#000',
        theme: 'dark',
        node: {
          palette: {
            field: 'cluster',
          },
        },
      },
      blue: {
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
      yellow: {
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

    const changeTheme = (theme: string) => {
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
