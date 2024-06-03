import { Graph } from '@/src';
import type { ClickElementOptions } from '@/src/behaviors';
import data from '@@/dataset/cluster.json';

export const behaviorClickElement: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    layout: {
      type: 'd3-force',
    },
    node: {
      style: {
        size: 20,
      },
    },
    zoomRange: [0.5, 5],
    behaviors: [{ type: 'click-element', key: 'click-element' }, 'drag-element'],
  });

  await graph.render();

  const config = {
    multiple: false,
    trigger: ['shift'],
    degree: 0,
    selectedState: 'selected',
    unselectedState: undefined,
  };

  const updateClickElementOption = (options: Partial<ClickElementOptions>) => {
    graph.updateBehavior({ key: 'click-element', ...options });
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
