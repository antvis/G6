import { Graph } from '@/src';
import type { ClickElementOptions } from '@/src/behaviors';
import data from '@@/dataset/cluster.json';

export const behaviorClickElement: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: data,
    layout: {
      type: 'd3force',
      linkDistance: 150,
    },
    node: {
      style: {
        size: 20,
      },
    },
    zoomRange: [0.5, 5],
    behaviors: [{ type: 'click-element' }],
  });

  await graph.render();

  const config = {
    multiple: true,
    trigger: ['shift'],
    degree: 0,
  };

  const updateClickElementOption = (options: Partial<ClickElementOptions>) => {
    graph.setBehaviors((prev) => [{ ...(prev[0] as ClickElementOptions), ...options }]);
    console.log(graph.getBehaviors());
  };

  behaviorClickElement.form = (panel) => [
    panel
      .add(config, 'multiple')
      .name('Multiple')
      .onChange((multiple: boolean) => updateClickElementOption({ multiple })),
    panel
      .add(config, 'trigger', ['shift', 'ctrl', 'alt', 'meta'])
      .name('Trigger')
      .onChange((trigger: string) => updateClickElementOption({ trigger: [trigger] })),
    panel
      .add(config, 'degree', [0, 1, 2, 3])
      .name('Degree')
      .onChange((degree: number) => updateClickElementOption({ degree })),
  ];

  return graph;
};
