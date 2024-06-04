import { Graph } from '@/src';
import type { ClickSelectOptions } from '@/src/behaviors';
import data from '@@/dataset/cluster.json';

export const behaviorClickSelect: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    layout: { type: 'd3-force' },
    behaviors: [{ type: 'click-select', key: 'click-select' }, 'drag-element'],
  });

  await graph.render();

  const config = {
    multiple: false,
    trigger: ['shift'],
    degree: 0,
    state: 'selected',
    unselectedState: undefined,
  };

  const updateClickSelectOption = (options: Partial<ClickSelectOptions>) => {
    graph.updateBehavior({ key: 'click-select', ...options });
  };

  behaviorClickSelect.form = (panel) => [
    panel
      .add(config, 'multiple')
      .name('Multiple')
      .onChange((multiple: boolean) => updateClickSelectOption({ multiple })),
    panel
      .add(config, 'trigger', ['shift', 'ctrl', 'alt', 'meta'])
      .name('Trigger')
      .onChange((trigger: string) => updateClickSelectOption({ trigger: [trigger] })),
    panel
      .add(config, 'degree', [0, 1, 2, 3])
      .name('Degree')
      .onChange((degree: number) => updateClickSelectOption({ degree })),
  ];

  return graph;
};
