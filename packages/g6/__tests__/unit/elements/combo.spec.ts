import { type Graph } from '@/src';
import { combo } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('combo', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(combo, { animation: false });
  });

  it('default status', async () => {
    await expect(graph.getCanvas()).toMatchSnapshot(__filename);
  });

  it('collapse circle combo', async () => {
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
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}_circle__collapse_top');
    expandCombo();
    collapseCombo('right');
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}_circle__collapse_right');
    collapseCombo('left');
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}_circle__collapse_left');
    expandCombo();
    collapseCombo('bottom');
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}_circle__collapse_bottom');
    expandCombo();
    collapseCombo('center');
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}_circle__collapse_center');
    expandCombo();
    collapseCombo('top-left');
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}_circle__collapse_topLeft');
    expandCombo();
    collapseCombo('top-right');
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}_circle__collapse_topRight');
    expandCombo();
    collapseCombo('bottom-left');
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}_circle__collapse_bottomLeft');
    expandCombo();
    collapseCombo('bottom-right');
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}_circle__collapse_bottomRight');
    expandCombo();
  });

  it('collapse rect combo', async () => {
    const expandCombo = () => {
      graph.updateComboData((data) => [
        ...data,
        {
          id: 'combo-1',
          style: {
            type: 'rect',
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
          id: 'combo-1',
          style: {
            type: 'rect',
            collapsed: true,
            collapsedOrigin,
            collapsedMarker: false,
          },
        },
      ]);
      graph.render();
    };
    collapseCombo('top');
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}_rect__collapse_top');
    expandCombo();
    collapseCombo('right');
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}_rect__collapse_right');
    collapseCombo('left');
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}_rect__collapse_left');
    expandCombo();
    collapseCombo('bottom');
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}_rect__collapse_bottom');
    expandCombo();
    collapseCombo('center');
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}_rect__collapse_center');
    expandCombo();
    collapseCombo('top-left');
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}_rect__collapse_topLeft');
    expandCombo();
    collapseCombo('top-right');
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}_rect__collapse_topRight');
    expandCombo();
    collapseCombo('bottom-left');
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}_rect__collapse_bottomLeft');
    expandCombo();
    collapseCombo('bottom-right');
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}_rect__collapse_bottomRight');
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
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}_circle__marker_childCount');
    expandCombo();
    collapseCombo('descendant-count');
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}_circle__marker_descendantCount');
    expandCombo();
    collapseCombo('node-count');
    await expect(graph.getCanvas()).toMatchSnapshot(__filename, '{name}_circle__marker_nodeCount');
  });
});
