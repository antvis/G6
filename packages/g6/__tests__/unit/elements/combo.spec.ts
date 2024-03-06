import type { Graph } from '@/src';
import { comboCircle } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('combo', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(comboCircle, { animation: false });
  });

  it('default status', async () => {
    await expect(graph.getCanvas()).toMatchSnapshot(__filename);
  });

  it('collapse combo', async () => {
    const expandCombo = () => {
      graph.updateComboData((data) => [
        ...data,
        {
          id: 'combo-2',
          style: {
            collapsed: false,
          },
        },
      ]);
      graph.render();
    };
    const collapseCombo = (collapsedOrigin: string) => {
      graph.updateComboData((data) => [
        ...data,
        {
          id: 'combo-2',
          style: {
            collapsed: true,
            collapsedOrigin,
            collapsedMarker: false,
          },
        },
      ]);
      graph.render();
    };
    collapseCombo('top');
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__collapse_top');
    expandCombo();
    collapseCombo('right');
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__collapse_right');
    collapseCombo('left');
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__collapse_left');
    expandCombo();
    collapseCombo('bottom');
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__collapse_bottom');
    expandCombo();
  });

  it('collapse combo with collapsed marker', async () => {
    const expandCombo = () => {
      graph.updateComboData((data) => [
        ...data,
        {
          id: 'combo-2',
          style: {
            collapsed: false,
          },
        },
      ]);
      graph.render();
    };
    const collapseCombo = (type: string) => {
      graph.updateComboData((data) => [
        ...data,
        {
          id: 'combo-2',
          style: {
            collapsed: true,
            collapsedOrigin: 'top',
            collapsedMarker: true,
            collapsedMarkerType: type,
          },
        },
      ]);
      graph.render();
    };
    collapseCombo('child-count');
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__marker_childCount');
    expandCombo();
    collapseCombo('descendant-count');
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__marker_descendantCount');
    expandCombo();
    collapseCombo('node-count');
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}__marker_nodeCount');
  });
});
