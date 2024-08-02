import type { GraphData, Timebar } from '@antv/g6';
import { Graph } from '@antv/g6';

const formatId = (index: number) => `0${index}`.slice(-2);
const formatTime = (time: number) => {
  const year = new Date(time).getFullYear();
  const month = new Date(time).getMonth() + 1;
  const date = new Date(time).getDate();
  return `${year}-${month}-${date}`;
};

export const pluginTimebar: TestCase = async (context) => {
  const startTime = new Date('2023-08-01 00:00:00').getTime();
  const diff = 3600 * 24 * 1000;
  const timebarData = [10, 2, 3, 4, 15, 10, 6].map((value, index) => ({
    time: new Date(startTime + index * diff),
    value,
  }));

  const [rows, cols] = [7, 7];

  const data: GraphData = {
    nodes: new Array(rows * cols).fill(0).map((_, index) => ({
      id: `${formatId(index)}`,
      data: {
        timestamp: startTime + (index % cols) * diff,
        value: index % 20,
        label: formatTime(startTime + (index % cols) * diff),
      },
    })),
    edges: [],
  };

  for (let i = 0; i < rows * cols; i++) {
    if (i % cols < cols - 1) {
      data.edges!.push({
        source: `${formatId(i)}`,
        target: `${formatId(i + 1)}`,
      });
    }

    if (i / rows < rows - 1) {
      data.edges!.push({
        source: `${formatId(i)}`,
        target: `${formatId(i + rows)}`,
      });
    }
  }

  const graph = new Graph({
    ...context,
    data,
    node: {
      style: {
        labelText: (d) => `${d.data!.label}`,
      },
    },
    layout: {
      type: 'grid',
      sortBy: 'id',
      cols,
      rows,
    },
    autoFit: 'view',
    padding: [10, 0, 90, 0],
    behaviors: ['drag-element'],
    plugins: [
      {
        type: 'timebar',
        key: 'timebar',
        data: timebarData,
        mode: 'modify',
        padding: 40,
      },
    ],
  });

  pluginTimebar.form = (panel) => {
    const config = { position: 'bottom', mode: 'modify', timebarType: 'time' };
    const timebar = graph.getPluginInstance<Timebar>('timebar');
    const operation = {
      play: () => timebar.play(),
      pause: () => timebar.pause(),
      reset: () => timebar.reset(),
      backward: () => timebar.backward(),
      forward: () => timebar.forward(),
    };

    const handleChange = () => {
      graph.updatePlugin({
        key: 'timebar',
        ...config,
      });
    };

    return [
      panel.add(config, 'position', ['top', 'bottom']).onChange((position: 'top' | 'bottom') => {
        graph.setOptions({
          padding: position === 'top' ? [100, 0, 10, 0] : [10, 0, 65, 0],
        });
        graph.updatePlugin({
          key: 'timebar',
          position,
        });
        graph.fitView();
      }),
      panel.add(config, 'mode', ['modify', 'visibility']).onChange(handleChange),
      panel.add(config, 'timebarType', ['time', 'chart']).onChange(() => {
        graph.setOptions({
          padding: config.position === 'top' ? [100, 0, 10, 0] : [10, 0, 100, 0],
        });
        graph.updatePlugin({
          key: 'timebar',
          ...config,
          height: 100,
        });
        graph.fitView();
      }),
      ...Object.keys(operation).map((key) => panel.add(operation, key)),
    ];
  };

  await graph.render();

  return graph;
};
