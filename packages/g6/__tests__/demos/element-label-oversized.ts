import { Graph } from '@antv/g6';

export const elementLabelOversized: TestCase = async (context) => {
  const data = {
    nodes: [
      {
        id: 'node1',
        data: {
          x: 100,
          y: 150,
          label: `This label with padding is too  long to be displayed`,
          size: 100,
        },
      },
      {
        id: 'node2',
        data: {
          x: 400,
          y: 150,
          label: 'This label with padding is too long to be displayed',
          size: 150,
        },
      },
    ],
    edges: [
      {
        id: 'edge1',
        source: 'node1',
        target: 'node2',
        data: {
          label: 'This label is too long to be displayed',
        },
      },
    ],
  };

  const graph = new Graph({
    ...context,
    data,
    node: {
      type: 'rect',
      style: {
        x: (d) => d.data!.x as number,
        y: (d) => d.data!.y as number,
        size: (d) => d.data!.size as number,
        labelPlacement: 'bottom',
        labelText: (d) => d.data!.label as string,
        labelMaxWidth: '90%',
        labelBackground: true,
        labelBackgroundFill: '#eee',
        labelBackgroundFillOpacity: 0.5,
        labelBackgroundRadius: 4,
        labelPadding: [0, 10, 0, 10],
        labelWordWrap: true,
        labelMaxLines: 4,
      },
    },
    edge: {
      style: {
        labelOffsetY: -4,
        labelTextBaseline: 'bottom',
        labelText: (d) => d.data!.label as string,
        labelMaxWidth: '80%',
        labelBackground: true,
        labelBackgroundFill: 'red',
        labelBackgroundFillOpacity: 0.5,
        labelBackgroundRadius: 4,
        labelWordWrap: true,
        labelMaxLines: 4,
      },
    },
    behaviors: ['drag-element'],
  });

  await graph.render();

  return graph;
};
